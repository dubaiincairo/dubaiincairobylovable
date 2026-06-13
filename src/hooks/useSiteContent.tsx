import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sanity } from "@/integrations/sanity/client";
import { SECTION_TYPES } from "@/integrations/sanity/sections";

// Content is sourced from two places:
//   1. Supabase `site_content` table — edited via /admin (PRIMARY).
//   2. Sanity Studio at dubaiincairo.sanity.studio — fallback for any key
//      /admin hasn't touched yet.
// Admin/Supabase wins on overlap. Clearing a field in /admin (saving "")
// collapses to the code-level fallback in `get()` so the default reappears.

type ContentMap = Record<string, string>;

interface SiteContentContextType {
  content: ContentMap;
  loading: boolean;
  get: (key: string, fallback?: string) => string;
}

const SiteContentContext = createContext<SiteContentContextType>({
  content: {},
  loading: true,
  get: () => "",
});

// Bumped to v4 after adding contact_trust_3 — old caches lacked the key and
// the registry default wouldn't surface until the cache expired naturally.
const CACHE_KEY = "site_content_cache_v4";

const SANITY_SYSTEM_FIELDS = new Set([
  "_id",
  "_type",
  "_rev",
  "_createdAt",
  "_updatedAt",
  "_originalId",
]);

const flattenSanityDoc = (doc: Record<string, unknown>): ContentMap => {
  const out: ContentMap = {};
  for (const [k, v] of Object.entries(doc)) {
    if (SANITY_SYSTEM_FIELDS.has(k)) continue;
    // Only keep non-empty string values — empty Sanity fields must never
    // shadow a Supabase value.
    if (typeof v === "string" && v !== "") out[k] = v;
    else if (typeof v === "number" || typeof v === "boolean") out[k] = String(v);
  }
  return out;
};

const readCache = (): ContentMap => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const writeCache = (map: ContentMap) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(map));
  } catch {
    // Storage quota or privacy mode — non-fatal
  }
};

const SANITY_QUERY = `*[_type in $types]`;

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [supabaseMap, setSupabaseMap] = useState<ContentMap>({});
  const [sanityMap, setSanityMap] = useState<ContentMap>({});
  const [content, setContent] = useState<ContentMap>(() => readCache());
  const [loading, setLoading] = useState<boolean>(() => Object.keys(readCache()).length === 0);

  // Recompute merged map whenever either source changes. Supabase (/admin)
  // wins on overlap — Sanity only fills in keys /admin hasn't set.
  useEffect(() => {
    const merged: ContentMap = { ...sanityMap, ...supabaseMap };
    setContent(merged);
    writeCache(merged);
  }, [supabaseMap, sanityMap]);

  // ── Supabase: initial fetch + realtime ──────────────────────────────────
  useEffect(() => {
    supabase
      .from("site_content")
      .select("key, value")
      .then(({ data }) => {
        if (data) {
          const map: ContentMap = {};
          data.forEach((row) => (map[row.key] = row.value));
          setSupabaseMap(map);
        }
        setLoading(false);
      });

    const channel = supabase
      .channel("site_content_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_content" },
        (payload) => {
          if (payload.eventType === "DELETE") {
            const old = payload.old as { key?: string };
            if (old.key) {
              setSupabaseMap((prev) => {
                const next = { ...prev };
                delete next[old.key!];
                return next;
              });
            }
          } else {
            const row = payload.new as { key: string; value: string };
            if (row.key) {
              setSupabaseMap((prev) => ({ ...prev, [row.key]: row.value }));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ── Sanity: initial fetch + realtime listen ─────────────────────────────
  useEffect(() => {
    let cancelled = false;
    sanity
      .fetch<Array<Record<string, unknown>>>(SANITY_QUERY, { types: SECTION_TYPES })
      .then((docs) => {
        if (cancelled || !docs) return;
        const map: ContentMap = {};
        for (const doc of docs) Object.assign(map, flattenSanityDoc(doc));
        setSanityMap(map);
        setLoading(false);
      })
      .catch(() => {
        // Network failure or CORS — fall back silently to Supabase + defaults.
      });

    const subscription = sanity
      .listen<Record<string, unknown>>(SANITY_QUERY, { types: SECTION_TYPES }, {
        includeResult: true,
        visibility: "query",
      })
      .subscribe({
        next: (update) => {
          // Only mutation events carry a `result` — welcome/disconnect events don't.
          const result = "result" in update ? update.result : undefined;
          if (!result) return;
          setSanityMap((prev) => ({ ...prev, ...flattenSanityDoc(result as Record<string, unknown>) }));
        },
        error: () => {
          // Realtime can drop on flaky networks — we already have the initial snapshot.
        },
      });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  // Treat empty strings the same as missing entries so clearing a field in
  // either CMS surfaces the code-level fallback again.
  const get = useCallback(
    (key: string, fallback = "") => {
      const v = content[key];
      if (v === undefined || v === null || v === "") return fallback;
      return v;
    },
    [content],
  );

  return (
    <SiteContentContext.Provider value={{ content, loading, get }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

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

const CACHE_KEY = "site_content_cache_v1";

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

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  // Hydrate from localStorage synchronously so returning visitors render real
  // content on first paint instead of flashing hardcoded defaults.
  const [content, setContent] = useState<ContentMap>(() => readCache());
  const [loading, setLoading] = useState<boolean>(() => Object.keys(readCache()).length === 0);

  useEffect(() => {
    // Initial fetch
    supabase
      .from("site_content")
      .select("key, value")
      .then(({ data }) => {
        if (data) {
          const map: ContentMap = {};
          data.forEach((row) => (map[row.key] = row.value));
          setContent(map);
          writeCache(map);
        }
        setLoading(false);
      });

    // Realtime subscription — instant updates
    const channel = supabase
      .channel("site_content_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_content" },
        (payload) => {
          if (payload.eventType === "DELETE") {
            const old = payload.old as { key?: string };
            if (old.key) {
              setContent((prev) => {
                const next = { ...prev };
                delete next[old.key!];
                writeCache(next);
                return next;
              });
            }
          } else {
            const row = payload.new as { key: string; value: string };
            if (row.key) {
              setContent((prev) => {
                const next = { ...prev, [row.key]: row.value };
                writeCache(next);
                return next;
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const get = useCallback(
    (key: string, fallback = "") => content[key] ?? fallback,
    [content]
  );

  return (
    <SiteContentContext.Provider value={{ content, loading, get }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);

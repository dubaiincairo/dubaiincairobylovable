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

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

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
                return next;
              });
            }
          } else {
            const row = payload.new as { key: string; value: string };
            if (row.key) {
              setContent((prev) => ({ ...prev, [row.key]: row.value }));
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

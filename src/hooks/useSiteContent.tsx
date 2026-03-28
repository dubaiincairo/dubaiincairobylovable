import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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
  }, []);

  const get = (key: string, fallback = "") => content[key] ?? fallback;

  return (
    <SiteContentContext.Provider value={{ content, loading, get }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);

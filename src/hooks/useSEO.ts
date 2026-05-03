import { useEffect } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

interface SEOKeyProps {
  titleKey: string;
  descriptionKey: string;
  canonical: string;
  ogImageKey?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

interface SEORawProps {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

type SEOProps = SEOKeyProps | SEORawProps;

const BASE_URL = "https://www.dubaiincairo.com";
const SCRIPT_ID = "dynamic-jsonld";

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useSEO(props: SEOProps) {
  const { get } = useSiteContent();

  const isKeyBased = "titleKey" in props;

  const title       = isKeyBased ? get(props.titleKey, "Dubai in Cairo") : props.title;
  const description = isKeyBased ? get(props.descriptionKey, "") : props.description;
  const globalOg    = get("seo_global_og_image", `${BASE_URL}/og-image.jpg`);
  const pageOg      = isKeyBased && props.ogImageKey ? get(props.ogImageKey, "") : "";
  const image       = pageOg || globalOg || `${BASE_URL}/og-image.jpg`;
  const canonicalUrl = `${BASE_URL}${props.canonical}`;
  const noindex     = props.noindex ?? false;
  const jsonLd      = props.jsonLd;

  useEffect(() => {
    document.title = title;

    setMeta("description", description);
    setMeta("robots", noindex
      ? "noindex, nofollow"
      : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    setMeta("og:title",       title,        true);
    setMeta("og:description", description,  true);
    setMeta("og:url",         canonicalUrl, true);
    setMeta("og:image",       image,        true);

    setMeta("twitter:title",       title);
    setMeta("twitter:description", description);
    setMeta("twitter:image",       image);

    setLink("canonical", canonicalUrl);

    let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = SCRIPT_ID;
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonicalUrl, image, noindex, jsonLd]);
}

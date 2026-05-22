import { next } from "@vercel/edge";

const SUPABASE_URL = "https://tblfnxaedhmwydjqngnb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibGZueGFlZGhtd3lkanFuZ25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMTYzNjMsImV4cCI6MjA5MjY5MjM2M30.MjXLYqzgqCmZqOrT4_Per3-P9tGjGIqfVM2zFtjJMYA";
const FALLBACK_OG = "https://dubaiincairo.com/og-image.jpg";

// In-memory cache: edge workers are reused across requests
let cache: { url: string; expires: number } | null = null;

async function getOgImageUrl(): Promise<string> {
  if (cache && Date.now() < cache.expires) return cache.url;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/site_content?key=eq.seo_global_og_image&select=value`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    if (!res.ok) throw new Error("Supabase error");
    const data = (await res.json()) as { value: string }[];
    const url = data[0]?.value?.trim() || FALLBACK_OG;
    cache = { url, expires: Date.now() + 60_000 }; // cache 60 s
    return url;
  } catch {
    return cache?.url || FALLBACK_OG;
  }
}

// Match all HTML routes (not API, not static assets)
export const config = {
  matcher: ["/((?!api/|assets/|.*\\..*).*)"],
};

export default async function middleware(request: Request) {
  if (request.method !== "GET") return next();

  const response = await next();

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  let html: string;
  try {
    html = await response.text();
  } catch {
    return response;
  }

  try {
    const ogImage = await getOgImageUrl();
    // Escape for safe insertion into HTML attribute
    const safe = ogImage.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

    const modified = html
      .replace(
        /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/gi,
        `<meta property="og:image" content="${safe}" />`
      )
      .replace(
        /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/gi,
        `<meta name="twitter:image" content="${safe}" />`
      );

    const headers = new Headers(response.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    // Allow CDN to cache for 60 s; individual responses vary by OG content
    headers.set("cache-control", "public, max-age=0, s-maxage=60");

    return new Response(modified, { status: response.status, headers });
  } catch {
    // Fallback: serve original on any modification error
    return new Response(html, { status: response.status, headers: response.headers });
  }
}

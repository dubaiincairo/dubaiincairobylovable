/**
 * Normalises rich-text HTML that may be double-encoded in the database.
 *
 * When a field that was previously rendered as plain text gets edited in
 * TipTap, the editor may have treated the raw "<p>..." string as literal
 * text content and re-encoded it as "&lt;p&gt;...".  This function decodes
 * any HTML entities so dangerouslySetInnerHTML always receives real HTML.
 *
 * Safe to call on already-clean HTML — if there are no entities, the
 * string is returned unchanged.
 */
export function richText(html: string): string {
  if (!html) return "";
  // Fast-path: no entities present, nothing to do
  if (!html.includes("&")) return html;
  return html
    .replace(/&amp;/g, "&")   // must come first to avoid double-decoding
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

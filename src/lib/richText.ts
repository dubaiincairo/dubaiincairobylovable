/**
 * Decode rich-text content stored by the TipTap admin editor for safe rendering
 * via dangerouslySetInnerHTML.
 *
 * Handles two scenarios:
 *  1. Properly stored HTML ("<p>text</p>"): returned as-is after entity decode.
 *  2. Double-encoded entities ("&lt;p&gt;text&lt;/p&gt;"): a previous rendering
 *     bug saved raw markup as text; entities are decoded back to live HTML.
 *  3. Plain text with newlines (legacy default values): newlines become <br>
 *     so existing line breaks survive when injected into innerHTML.
 */
export const richText = (raw: string | null | undefined): string => {
  if (!raw) return "";

  const decoded = raw
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

  if (!/<[a-zA-Z\/]/.test(decoded)) {
    return decoded.replace(/\n/g, "<br>");
  }
  return decoded;
};

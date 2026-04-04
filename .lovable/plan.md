
Goal

Make the website truly CMS-driven so every visible homepage text is editable, line breaks are supported, and saved changes appear on the live site immediately without refresh/redeploy.

What I found

- The two horizontal lines around the stats strip come from `border-y` in `StatsSection`.
- The missing full stop is not a display/font issue. The stored `about_headline` value currently has no period, and the site content is fetched only once on app load, so updates are not reliably reflected live.
- The admin editor only uses multiline inputs for long text. Short fields use single-line inputs, so pressing Enter cannot create a new line.
- The current CMS shows only rows that already exist in the database. Several visible texts are still hardcoded in components, so they never appear in the admin panel.
- Important hardcoded gaps include:
  - Navbar labels and CTA
  - Legal card labels like “Commercial Registration”
  - Contact form labels/placeholders and “Send Another Message”
  - Brand wordmark text in navbar/footer
- `clients_list` exists, but it is managed as one comma-separated field, which is not ideal for editing brand names cleanly.
- Save flow has no proper error handling, so a failed update can look like success.

Implementation plan

1. Remove the stats borders
- Update `StatsSection` to remove the top and bottom borders around the percentages section.

2. Make the CMS schema-driven instead of row-driven
- Create a single content registry in code that lists every editable homepage text:
  - section
  - key
  - label
  - default value
  - whether it should support multiline/list input
- Use this registry as the source of truth for the admin panel so fields appear even if a row is missing in the database.

3. Backfill all missing homepage text into the content table
- Add missing keys for all hardcoded website strings, especially:
  - navigation labels + nav CTA
  - legal labels
  - contact form labels/placeholders/success button text
  - brand text reused in header/footer
- Keep existing keys like `founder_attribution`, `clients_list`, and legal values, but make sure they are surfaced clearly in the admin.

4. Upgrade the admin editor into a real multiline content manager
- Replace the mixed `Input`/`Textarea` logic with textarea-based editing for content fields so Enter always creates a new line.
- Add auto-resizing behavior so short fields still feel tidy.
- For list fields like clients (and tool lists if needed), allow one item per line while still accepting commas for backward compatibility.
- Improve save handling to show real success/error feedback per save operation.

5. Make live updates truly instant
- Extend `useSiteContent` so it no longer fetches once and goes stale.
- Add live database subscription for `site_content` so saved edits are pushed to the website immediately.
- Also update local content state right after save so the admin/public app reflects changes instantly in the current session.

6. Preserve punctuation and line breaks exactly as entered
- Render CMS-managed text with line-break support where appropriate (`whitespace-pre-line` / equivalent).
- Apply this to headings, paragraphs, founder attribution, legal/address text, footer text, and other text blocks that may contain manual line breaks.
- For list-based fields, parse newline/comma-separated content safely so brand names and tools render as intended.

7. Update components so 100% of homepage text is editable
- Review and connect remaining hardcoded homepage text in:
  - `Navbar.tsx`
  - `HeroSection.tsx`
  - `StatsSection.tsx`
  - `AboutSection.tsx`
  - `WhyDifferentSection.tsx`
  - `ValuesSection.tsx`
  - `ServicesSection.tsx`
  - `FounderSection.tsx`
  - `ClientsSection.tsx`
  - `TechStackSection.tsx`
  - `ContactSection.tsx`
  - `LegalSection.tsx`
  - `Footer.tsx`

Technical details

- Best robustness path:
  - add a unique constraint on `site_content.key`
  - allow admin insert on `site_content`
  - use upsert for missing keys
  - enable realtime for `site_content`
- This avoids future “text exists on the page but not in admin” regressions.
- `clients_list` should support both commas and new lines, so you can manage brands one per line without breaking existing data.
- The period after “A Digital Agency Built on Science, Not Guesswork.” will display correctly once the save flow and live sync are fixed, because the component already renders the stored string verbatim.

Acceptance checks

- The stats strip has no horizontal lines above/below it.
- Adding a period to the About headline appears on the live site after save.
- Pressing Enter in admin creates a new line and that line break appears on the website where relevant.
- `Abdullah Al-Fawali, CEO & Founder` is editable in admin and updates live.
- Client names are editable in admin in a practical format and render correctly on the site.
- All legal section text, including labels and values, is editable in admin.
- No homepage text remains hardcoded outside the CMS.

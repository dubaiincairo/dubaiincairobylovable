# Repository conventions for Claude Code sessions

## Branch model

This repo uses **two long-lived branches** — no feature branches:

- **`main`** — what's live on production (`dubaiincairo.com`). Vercel auto-deploys every push.
- **`staging`** — the integration branch. All work-in-progress lands here first. Vercel auto-generates a stable preview URL from it.

## Rules for any Claude Code session

**Always work on `staging`.** Never create a new feature branch like `claude/something-XYZ`.
Concretely, at the start of every session run:

```bash
git checkout staging
git pull origin staging
```

…then make changes, commit, and push to `staging`. Stop there. **Do not open a PR or merge to `main`** — the owner does that step manually after reviewing the staging preview URL.

If multiple Claude Code sessions run in parallel and the push fails because the
remote moved, `git pull --rebase origin staging` then push again. Resolve any
conflicts locally before pushing.

## Ship to production

1. Owner reviews the staging preview URL.
2. When happy, owner clicks **"Sync branch"** or opens a PR from `staging` → `main` on GitHub and merges it.
3. Vercel rebuilds `main` → production updates in ~1–2 min.

## CMS / Sanity + Supabase

`useSiteContent` merges two sources into one flat key-value map:

1. **Sanity** (primary, going forward) — Studio source in `/studio`, hosted at
   `dubaiincairo.sanity.studio`. One singleton document per page-section
   (`hero`, `about`, `services`, `founder`, `odoo`, `yanolja`, `zoho`, …).
   Field names in the schema are the **exact snake_case keys** from
   `src/lib/contentRegistry.ts`. Real-time listen surfaces edits in ~2 seconds
   without a refresh.
2. **Supabase `site_content`** (fallback) — legacy, still edited via `/admin`.
   Read-only fallback for any key Sanity doesn't yet have.

Sanity wins on overlap. Empty strings in either source still collapse to the
code-level fallback in `get(key, fallback)`.

### Adding a new editable key

1. Add the entry to `src/lib/contentRegistry.ts` (single source of truth — used
   both at runtime for fallbacks and by the Studio to render form fields).
2. From `studio/`: `npx sanity schema deploy && npx sanity deploy`.
3. Editors fill it in via Sanity Studio.

### Things to know about the Sanity setup

- The Sanity Studio lives in `/studio` with its own `package.json`. Do **not**
  install `sanity` or `@sanity/vision` in the root — that would bloat the SPA
  bundle by ~5MB.
- Section singletons currently have **random UUIDs** for `_id` (an MCP
  bootstrap artefact). The desk structure resolves them by `_type` via
  `S.documentTypeListItem`, so this is transparent to editors and to the
  runtime hook.
- Re-seeding from Supabase is a one-shot via `npm run migrate:cms`
  (needs `SANITY_WRITE_TOKEN`). It deduplicates by `_type`, so re-runs replace
  rather than multiply.
- Future content edits via Studio → Publish are picked up live by the SPA
  through `sanity.listen()` — no rebuild required.
- Schema changes require `npx sanity schema deploy && npx sanity deploy` from
  `/studio`. Don't use Sanity MCP's `deploy_schema` once the local Studio is
  the source of truth.

## Stack quick reference

- React 18 + Vite + TypeScript + Tailwind + shadcn/ui
- Framer Motion for animation (respect `prefers-reduced-motion` via `useMotionPref()` in `src/lib/animations.ts`)
- React Router v6 with `AnimatePresence` page transitions and the `PageTransition` wrapper
- Rich-text content rendered via `<RichText html={...} />` from `src/components/ui/rich-text.tsx` (handles HTML entities + plain-text newlines)

## Things to avoid

- Don't push to `main` directly — always go through `staging`.
- Don't create new long-lived branches.
- Don't introduce magic-number durations/easings in motion code — use the `MOTION` tokens in `src/lib/animations.ts`.
- Don't commit `package-lock.json` changes unless dependencies were intentionally added/removed in the same commit.

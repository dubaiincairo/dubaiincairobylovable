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

## CMS / Supabase

The site reads editable content from the `site_content` table in Supabase via the
`useSiteContent` hook. Defaults live in `src/lib/contentRegistry.ts` and in the
component-level `get(key, fallback)` calls.

Editors change content through `/admin`. Saving an empty value falls back to the
code default automatically (`get()` treats `""` as missing). No SQL is normally
needed.

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

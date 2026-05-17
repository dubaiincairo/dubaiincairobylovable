# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Content management

The site reads editable text from two sources, merged in this order (Sanity wins):

1. **Sanity CMS** (primary) — Studio at https://dubaiincairo.sanity.studio.
   The Studio is the codebase in `/studio` (its own `package.json`, no impact
   on the SPA bundle). One singleton document per page-section (Hero, About,
   Services, Founder, Footer, Careers, Odoo, Yanolja, Zoho, …). Edits land
   live within a couple of seconds via Sanity's live listen.
2. **Supabase `site_content`** (fallback) — the legacy table, still editable
   via `/admin`. Used when a key isn't set in Sanity yet, or when Sanity is
   unreachable. Will be retired once Sanity coverage is complete.

Empty strings in either source collapse to the code-level fallback in
`get(key, fallback)`, so clearing a field reveals the default.

### Studio: deploy + edit

```bash
cd studio
npm install
npx sanity dev          # local Studio at http://localhost:3333
npx sanity deploy       # one-off — publishes to dubaiincairo.sanity.studio
```

### Adding a new editable field

1. Add the entry to `src/lib/contentRegistry.ts` (single source of truth).
2. From `studio/`: `npx sanity schema deploy && npx sanity deploy`.
3. The field appears in Sanity Studio under its section.

### Re-seeding from Supabase (rarely needed)

The initial migration has already run. To re-run later (e.g. after a registry
expansion), from the repo root:

```bash
SANITY_WRITE_TOKEN=<editor-token> npm run migrate:cms
```

Generate the token at https://www.sanity.io/manage → API → Tokens (Editor
scope). The script is idempotent — it locates each section's existing
document by `_type` and replaces it in place rather than creating duplicates.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

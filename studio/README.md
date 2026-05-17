# Dubai in Cairo — Sanity Studio

Editorial CMS for the website. Edit any text on the site here, hit "Publish",
and the change appears live within a couple of seconds (no rebuild needed).

## Local development

```bash
cd studio
npm install
npx sanity dev
```

Open http://localhost:3333. Log in with the Sanity account that owns the project.

## Deploy the hosted Studio

One-off action, done by the project owner:

```bash
cd studio
npx sanity deploy
```

Studio goes live at https://dubaiincairo.sanity.studio.

## Schema source of truth

Field names come from `src/lib/contentRegistry.ts` (one level up). That file is
the single source for what's editable. Adding a new key there will surface it
in the Studio automatically the next time you redeploy.

After editing the registry:

```bash
cd studio
npx sanity schema deploy   # update the dataset's schema manifest
npx sanity deploy          # update the hosted Studio
```

## Content model

Each "section" of the site (Hero, About, Services, Founder, Footer, …) is a
single document (a "singleton") whose `_id` matches its `_type`. The desk
structure shows them as a flat list; you cannot create new ones or delete
them by design.

## Initial content migration

To seed the documents from the existing Supabase `site_content` table, run
from the repo root:

```bash
SANITY_WRITE_TOKEN=<your-editor-token> npm run migrate:cms
```

Generate the token in https://www.sanity.io/manage → API → Tokens → "Editor".

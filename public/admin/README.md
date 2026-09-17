# Content Manager (`/admin`)

A web UI for writing blog posts without touching the IDE. It runs [Decap CMS](https://decapcms.org)
(the maintained successor to Netlify CMS) entirely in the browser and commits Markdown to this repo
via the GitHub API.

**Live URL:** https://veeck.de/admin/

## How posting works (PR-based)

This CMS uses Decap's **editorial workflow** — it never commits straight to `main`:

1. Open `/admin`, log in with GitHub, and create a **New Blog** post.
2. On **Save**, Decap creates a branch `cms/blog/<slug>` and opens a **pull request** to `main`.
   The post starts as a **Draft** on the Workflow board.
3. You can come back and edit anytime — each Save pushes another commit to the **same PR**.
4. Netlify posts a **Deploy Preview** on the PR, so you can preview the rendered post before it goes live.
5. When ready, move the entry to **Ready** and click **Publish** → Decap merges the PR (squashed)
   and deletes the branch. The push to `main` triggers the normal Netlify production build.

The generated file is `src/content/blog/YYYY-MM-DD-<slug>.mdx`, with frontmatter that matches the
`blog` schema in `src/content.config.ts`. Uploaded images go to `public/uploads/blog/` and are
referenced as `/uploads/blog/<file>` (served as static assets; not run through Astro's image
optimizer — that's fine for the blog route, which renders inline images with plain Markdown).

## One-time setup: GitHub authentication

Login uses **Netlify's built-in GitHub OAuth provider** — no serverless function to maintain.

1. **Create a GitHub OAuth App** — GitHub → Settings → Developer settings → OAuth Apps → New:
   - Homepage URL: `https://veeck.de`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. **Register it with Netlify** — Netlify site → Site configuration → Access control → OAuth →
   Install provider → **GitHub**, and paste the OAuth App's **Client ID** and **Client Secret**.

That's it. `config.yml`'s `backend.base_url: https://veeck.de` routes the login handshake through
Netlify's provider.

> If Netlify's built-in provider is ever unavailable, run a small GitHub OAuth relay (a Netlify
> Function or a Cloudflare Worker) and point `backend.base_url` / `auth_endpoint` at it instead.

## Local testing (no OAuth needed)

Decap's local backend writes directly to your working tree, so you can try the editor offline:

1. In `config.yml`, uncomment `local_backend: true`.
2. Terminal 1: `pnpm dlx decap-server`
3. Terminal 2: `pnpm dev`
4. Open http://localhost:4321/admin/ and create a test post.
5. Confirm a new `src/content/blog/YYYY-MM-DD-<slug>.mdx` appears with valid frontmatter, then
   `pnpm check` (0 errors) and `pnpm build`.
6. Re-comment `local_backend` and delete the test post before committing.

> **Slug note:** the filename is `<date>-<title-slug>.mdx` — the title becomes the slug and
> `first_published` supplies the `{{year}}-{{month}}-{{day}}` date prefix (matching existing posts,
> e.g. `2023-06-23-more-goodbyes.mdx` → `/blog/2023-06-23-more-goodbyes`). Set `first_published`
> before the first Save so the date prefix is correct. Do **not** add a `slug` field to the config:
> Astro's glob loader treats a frontmatter `slug` as a routing-id override and would strip the date
> prefix from the URL.

## Updating the CMS bundle

`decap-cms.js` is a **pinned, self-hosted** copy of Decap CMS (required by the site CSP, which only
allows scripts from `'self'`). Current version: **decap-cms 3.14.1**.

To update, re-download the same version tag you want and bump this note:

```sh
curl -fsSL "https://unpkg.com/decap-cms@<version>/dist/decap-cms.js" -o public/admin/decap-cms.js
```

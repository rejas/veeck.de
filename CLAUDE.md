# veeck.de

Personal homepage built with Astro v7 (static output, no SSR pages), deployed on Netlify. Package manager is pnpm.

## Commands

- `pnpm dev` — dev server at localhost:4321
- `pnpm dev:bg` / `pnpm dev:stop` / `pnpm dev:status` / `pnpm dev:logs` — run the dev server as a background process
  (Astro v7)
- `pnpm build` — production build to `./dist/`
- `pnpm check` — `astro check` (TypeScript/content types)
- `pnpm lint` — eslint
- `pnpm format` / `pnpm format:check` — prettier

## Structure

- `src/content/{blog,projects,travels,galleries}` — content collections (MDX for blog/projects/travels, YAML for
  galleries), schemas in `src/content.config.ts`
- `src/content/outdated` — legacy content, not registered in any collection; not built
- `src/pages` — one listing page + `[...slug].astro` detail route per collection
- `src/components/previews` — one card component per collection, rendered in `Grid`
- `src/components/mdx` — components importable from MDX content (e.g. `Audio.astro`, `SpecsTabs.jsx`)
- `src/styles/global.css` — design tokens, incl. per-section accent palettes selected via `data-accent` on `<html>` (see
  `BaseLayout.astro`)

React (`@astrojs/react`) is installed for a single hydrated component (`SpecsTabs` on one projects page via
`client:load`); everything else renders statically. Prefer `.astro` components over React unless client-side
interactivity is actually needed.

## Workflow

- Never commit or push directly to `main`. Always work on a feature branch and open a PR.
- After finishing work on a branch, stay on it — don't switch back to `main` automatically; the user checks out branches
  themselves.
- Respond in German.

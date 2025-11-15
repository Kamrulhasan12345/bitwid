# AGENT.md

A concise guide for contributors and automation agents working on this repository. It covers how the project runs, its structure, conventions, and recommended extension points.

## Overview

- Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- Purpose: Simple scaffold with a top-level page that renders a navigation bar, an editor area, an output panel, and a footer.
- Entrypoints: `app/layout.tsx` (HTML shell) and `app/page.tsx` (home route `/`).

## Quick Start

- Prereqs: Use Node 18.18+ or 20+ (recommended for Next.js 16).
- Install deps:
  ```bash
  npm install
  ```
- Run dev server:
  ```bash
  npm run dev
  # Visit http://localhost:3000
  ```
- Build and start:
  ```bash
  npm run build
  npm start
  ```
- Lint:
  ```bash
  npm run lint
  ```

## Scripts (from package.json)

- `dev`: run Next.js in development.
- `build`: production build.
- `start`: run the built server.
- `lint`: run ESLint with Next.js rules.

## Project Structure

```
app/
  global.css          # Tailwind v4 imported; custom vars commented
  layout.tsx          # Root HTML template and <body>
  page.tsx            # Home page composing NavBar, Editor, Output, Footer
  lib/                # (Empty) Utilities/modules go here
  ui/
    nav-bar.tsx       # Top nav brand/title
    footer.tsx        # Simple footer
    editor/
      editor.tsx      # Placeholder editor component
      output.tsx      # Placeholder output panel component
public/               # Static assets served at /
```

## Runtime Model

- Next.js App Router uses Server Components by default. All current components are server components (no `"use client"`).
- Add `"use client"` at the top of a file when you need interactivity (state, effects, event handlers, refs, browser APIs).
- Page routing: Files under `app/` map to routes. `app/page.tsx` serves `/`.
- Assets from `public/` are available at the root path (e.g., `/logo.png`).

## Styling

- Tailwind v4 is enabled via PostCSS: `postcss.config.mjs` uses `@tailwindcss/postcss`.
- `app/global.css` imports Tailwind and includes commented example CSS variables and base styles. You may:
  - Keep everything in utility classes; or
  - Re-enable the CSS variables block to standardize theme tokens.

## Tooling

- TypeScript: `strict: true`, `noEmit: true`, `moduleResolution: bundler`, JSX: `react-jsx`.
- Path alias: `@/*` maps to the repo root (configure your imports accordingly).
- ESLint: `eslint-config-next` (Core Web Vitals + TS). Ignored paths include `.next/**`, `out/**`, `build/**`, `next-env.d.ts`.

## Component Map (current)

- `NavBar` (`app/ui/nav-bar.tsx`): Renders the brand text `bitwid` with spacing/typography classes.
- `Editor` (`app/ui/editor/editor.tsx`): Placeholder paragraph; intended to become the main input area.
- `Output` (`app/ui/editor/output.tsx`): Placeholder paragraph; intended to render results from the editor.
- `Footer` (`app/ui/footer.tsx`): Simple footer text.
- `Home` (`app/page.tsx`): Composes the above in order.

## Extension Points

- `app/lib/`: Place shared utilities (parsers, formatters, API clients). Export named functions and keep modules cohesive.
- Editor ↔ Output data flow:
  - For simple use cases, lift state to `app/page.tsx` and pass props down.
  - For broader sharing, create a small context provider in `app/ui/editor/` and wrap `Editor`/`Output` with it.
  - Any component using state/effects must start with `"use client"`.
- Styling:
  - Prefer Tailwind utility-first styles.
  - Consider adding minimal design tokens (CSS variables) in `global.css` if theming is needed.
- Routing:
  - Add new routes via folders under `app/` (e.g., `app/settings/page.tsx` becomes `/settings`).
- Data Fetching:
  - Use Server Components for async data fetching where possible; convert to Client Components only when interactivity is required.

## Conventions

- File naming: `kebab-case` filenames for components under `app/ui/`.
- Components: Export a default React component per file; collocate component-specific helpers next to the component or in `app/lib/` if shared.
- Imports: Use `@/...` path alias instead of deep relative chains when importing across top-level folders.
- Types: Define stable component prop types and utility function types; avoid `any`.

## Common Tasks

- Add an interactive component:
  1. Create a file and add `"use client"` at the top.
  2. Use React state/effects as needed.
  3. Import it into a page or another component.
- Share state between `Editor` and `Output`:
  1. Move `Home` to a Client Component by adding `"use client"` at the top of `app/page.tsx`, or create a small client wrapper (e.g., `app/ui/editor/shell.tsx`).
  2. Lift state into that wrapper and pass values/handlers to `Editor` and `Output`.
  3. Alternatively, introduce a lightweight context provider under `app/ui/editor/`.
- Add a new page:
  1. Create `app/<route>/page.tsx`.
  2. Export a default component; use Server Components by default.

## Known Gaps / TODOs

- `Editor` and `Output` are placeholders; no shared state or functionality yet.
- `app/lib/` is empty; move shared logic here as features grow.
- No tests configured; consider adding Playwright (e2e) and/or Vitest/Jest for unit tests.
- No CI configured; consider GitHub Actions for lint/typecheck/build.
- Global theme tokens in `global.css` are commented; enable if you want consistent theming.

## Troubleshooting

- Dev server default port is 3000 (`http://localhost:3000`).
- If Tailwind styles don’t apply:
  - Ensure `app/global.css` is imported in `app/layout.tsx` (already done).
  - Ensure `postcss.config.mjs` uses `@tailwindcss/postcss` (already done).
- If a component needs interactivity but doesn’t respond, ensure it’s marked with `"use client"`.
- Type issues with React 19/Next 16: keep `@types/react*` up-to-date (already present) and run `npm run lint` for quick feedback.

## Repository Notes

- Default branch: `main`.
- No environment variables required at this time.
- Deployment: Not configured; you can deploy with Vercel or any Node host after `npm run build`.

---

If you want me (the agent) to scaffold the editor/output state flow, tests, or CI next, say the word and I’ll implement it.

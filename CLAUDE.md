# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Professional website for Marie-Eve Musy, a journalist and actress based in Geneva. It showcases her TV-presenting work in Switzerland: demos, parcours (career path), prestations (services), and contact information.

Audience: media producers/directors, casting directors, event organisers looking for presenters, Swiss media industry contacts, and the general public.

Content priority order: professional demos (video showcases) → biography/parcours → portfolio/work samples → contact information.

## Commands

- `yarn dev` — dev server (Turbopack, Next 16 default)
- `yarn build` — production build (Turbopack)
- `yarn start` — run production build
- `yarn lint` / `yarn lint:fix` — ESLint (flat config)
- `yarn format` / `yarn format:check` — Prettier
- `yarn type-check` — `tsc --noEmit`

There is no test runner configured — don't suggest `yarn test`. Before finishing a change, run `yarn lint && yarn type-check`.

Requires Node 22+ (`.nvmrc` pins `22.14`) and Yarn 4.11.0 (`nodeLinker: node-modules`, not PnP).

## Stack & layout

- Next.js 16 App Router (`app/`), React 19 Server Components by default — add `"use client"` only where interactivity is actually needed.
- Tailwind CSS 4 via PostCSS, with **no `tailwind.config.*` file**: `app/globals.css` is just `@import "tailwindcss"`. Theme customization goes in that CSS file (Tailwind 4's CSS-first config), not a JS config.
- `@/*` path alias resolves to the repo root (there is no `src/` directory).

## Conventions enforced by tooling

These fail `yarn lint`, not just review, so treat them as hard requirements:

- `prettier/prettier` is an ESLint error — formatting issues are lint failures. Style: double quotes, semicolons, `printWidth: 120`, trailing commas (`es5`), Tailwind classes auto-sorted by `prettier-plugin-tailwindcss`.
- `simple-import-sort/imports` and `unused-imports/no-unused-imports` are errors — imports are machine-ordered and unused imports are not allowed; don't hand-order them.
- `sonarjs/cognitive-complexity` capped at 15; `jsx-a11y/alt-text` is an error; `@typescript-eslint/no-explicit-any` is a warning.
- File naming: `kebab-case` for directories, `PascalCase` for component files, `camelCase` for utility files.

## Content & language

Site copy, metadata, and `<html lang="fr">` are French, for a Swiss French-speaking audience — write user-facing text in French with correct French typography. Code, comments, and commit messages stay in English.

## Media

Static assets live in `public/`. Use `next/image` for images with meaningful alt text. Demo videos are the site's centerpiece — weigh loading/delivery cost when touching media-related code.

## Known gotcha

`next.config.ts` configures a Turbopack rule loading `@svgr/webpack` for `*.svg` imports, but `@svgr/webpack` is **not** listed in `package.json` and is not installed. Importing an SVG as a React component will fail as-is — either add the dependency or serve SVGs from `public/` via `next/image`/`<img>` instead.

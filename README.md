# Next.js Monorepo Bootstrap

This repository contains a minimal Next.js monorepo (single app) configured with:

- PNPM workspaces
- TypeScript
- ESLint + Prettier
- Husky + lint-staged pre-commit hooks
- GitHub Actions CI (lint, test, build)

## Structure

- apps/
  - web/ — Next.js application

## Getting started

1. Install PNPM (recommended)
   - npm: `npm i -g pnpm`
2. Install dependencies
   - `pnpm install`
3. Run the development server
   - `pnpm dev` (runs the web app)
4. Build
   - `pnpm build`
5. Test
   - `pnpm test`
6. Lint
   - `pnpm lint`
7. Format
   - `pnpm format:fix`

## Environment variables

Copy `.env.example` to `.env.local` (or `.env`) and adjust values.

- Public vars must be prefixed with `NEXT_PUBLIC_`.

## Pre-commit hooks

Husky + lint-staged will run ESLint (with `--fix`) and Prettier on staged files.

- Ensure Git hooks are installed locally (done automatically via the `prepare` script on `pnpm install`).
- Hooks are stored in `.husky/`.

## CI

GitHub Actions workflow is defined in `.github/workflows/ci.yml` and runs on push/PR:

- Install deps with PNPM
- Lint
- Test
- Build

## Notes

- This is a starting point; extend as needed (tests, packages, etc.).
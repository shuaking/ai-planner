# Next.js Monorepo Bootstrap

This repository contains a minimal Next.js monorepo (single app) configured with:

- PNPM workspaces
- TypeScript
- ESLint + Prettier
- Husky + lint-staged pre-commit hooks
- GitHub Actions CI (lint, test, build)

## Deploy to Vercel

Deploy this repository to Vercel with a single click. The flow will prompt you for the required environment variables.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shuaking/ai-planner&root-directory=apps/web&env=OPENAI_API_KEY,NEXTAUTH_SECRET,NEXTAUTH_URL,SUPABASE_URL,SUPABASE_ANON_KEY,EMAIL_FROM&envDescription=Required%20environment%20variables%20for%20OpenAI%2C%20NextAuth%2C%20Supabase%2C%20and%20email%20sending.%20See%20README%20for%20details.&envLink=https://github.com/shuaking/ai-planner#environment-variables)

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

Copy `.env.example` to `.env.local` (or `.env`) and adjust the values.

Required

- OPENAI_API_KEY — Your OpenAI API key (e.g., `sk-...`).
- NEXTAUTH_SECRET — A random 32+ character string used to sign NextAuth JWTs. Generate with `openssl rand -base64 32`.
- NEXTAUTH_URL — The base URL of your app.
  - Local dev: `http://localhost:3000`
  - Vercel prod: `https://your-app.vercel.app`
- SUPABASE_URL — Your Supabase project URL (e.g., `https://<project-ref>.supabase.co`).
- SUPABASE_ANON_KEY — Your Supabase anon public key (JWT).
- EMAIL_FROM — The email address used as the "from" sender (e.g., `noreply@yourdomain.com`).

Optional

- SUPABASE_SERVICE_ROLE — Supabase service role key for server-side admin tasks only. Do not expose to the client.
- RESEND_API_KEY — If using Resend to send emails (e.g., `re_...`).

Region notes

- Choose a Supabase project region close to your Vercel deployment region to minimize latency.
- For local development, set `NEXTAUTH_URL` to `http://localhost:3000`. In production on Vercel, set it to your canonical `https://<your-app>.vercel.app` (or your custom domain) to avoid callback/domain mismatch issues.

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
# Project Charter / 项目书

This document outlines the vision, goals, scope, and execution plan for the project contained in this repository.

- Repo type: PNPM monorepo (single app)
- App: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui
- Auth: NextAuth (email magic link) with Prisma
- DB: SQLite (dev) / Postgres (prod) via Prisma; ready for Supabase
- CI/CD: GitHub Actions; deploy to Vercel


## 1) Overview / 项目简介

Build a production-ready Next.js application scaffold that supports authentication via email magic links, Prisma-based persistence, and a clean developer workflow (linting, formatting, hooks, CI). The project is optimized for rapid iteration and one-click deploy to Vercel.


## 2) Goals / 项目目标

- Provide a clean, opinionated Next.js starter with App Router and Tailwind
- Enable secure email magic link authentication via NextAuth
- Support both local development (SQLite/Postgres) and cloud Postgres (e.g., Supabase)
- Offer one-click deployment to Vercel with required environment prompts
- Include pre-commit hooks, linting, testing, and CI to maintain quality


## 3) Non-Goals / 非目标

- Not a full product; this is a foundation to build upon
- Not a UI component library; UI components are minimal examples only
- Not a turnkey multi-tenant SaaS; multi-tenant concerns are out of scope


## 4) Scope / 范围

- Monorepo with a single Next.js app located at apps/web
- Auth flows: email sign-in, session management, protected routes
- Basic dashboard and layout (Navbar + Sidebar) to validate structure
- Database schema and seed scripts to bootstrap initial state
- Admin setup endpoint to run initial migration/seed safely and idempotently


## 5) Architecture / 架构

- Next.js App Router in apps/web
- Prisma ORM for database access and schema migrations
- NextAuth for auth (Email provider), nodemailer-compatible SMTP
- Tailwind CSS + shadcn/ui for styling and UI primitives
- TypeScript across the codebase


## 6) One-click Deploy / 一键部署

Deploy to Vercel with a single click. The flow prompts for required environment variables.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shuaking/ai-planner&root-directory=apps/web&env=OPENAI_API_KEY,NEXTAUTH_SECRET,NEXTAUTH_URL,SUPABASE_URL,SUPABASE_ANON_KEY,EMAIL_FROM&envDescription=Required%20environment%20variables%20for%20OpenAI%2C%20NextAuth%2C%20Supabase%2C%20and%20email%20sending.%20See%20README%20for%20details.&envLink=https://github.com/shuaking/ai-planner#environment-variables)

Notes:
- The envLink in the button points to README#environment-variables for details
- After the first deploy, run the one-time setup endpoint (see section 8)


## 7) Environment variables / 环境变量

Copy .env.example to .env.local (or .env) and adjust values. The list below mirrors README.md to ensure consistency.

Required:
- OPENAI_API_KEY — Your OpenAI API key (e.g., `sk-...`).
- NEXTAUTH_SECRET — A random 32+ character string used to sign NextAuth JWTs. Generate with `openssl rand -base64 32`.
- NEXTAUTH_URL — The base URL of your app.
  - Local dev: `http://localhost:3000`
  - Vercel prod: `https://your-app.vercel.app`
- SUPABASE_URL — Your Supabase project URL (e.g., `https://<project-ref>.supabase.co`).
- SUPABASE_ANON_KEY — Your Supabase anon public key (JWT).
- EMAIL_FROM — The email address used as the "from" sender (e.g., `noreply@yourdomain.com`).

SMTP (for NextAuth Email provider):
- EMAIL_SERVER_HOST — SMTP host (e.g., Supabase SMTP host)
- EMAIL_SERVER_PORT — SMTP port (typically 587)
- EMAIL_SERVER_USER — SMTP username
- EMAIL_SERVER_PASSWORD — SMTP password

Optional:
- SUPABASE_SERVICE_ROLE — Supabase service role key for server-side admin tasks only. Do not expose to the client.
- RESEND_API_KEY — If using Resend to send emails (e.g., `re_...`).

Database/Setup:
- DATABASE_URL — Used by Prisma. Defaults to SQLite for local development (`file:./prisma/dev.db`).
- SETUP_TOKEN — One-time token to call the protected setup endpoint (see below).

Region notes:
- Choose a Supabase project region close to your Vercel deployment region to minimize latency.
- In production on Vercel, set NEXTAUTH_URL to your canonical domain to avoid callback mismatch issues.


## 8) One-time setup (migrations + seed) / 首次部署初始化（迁移与种子）

A protected setup endpoint applies the initial database schema and seeds default templates on the first deploy. It is idempotent and will no-op on subsequent calls.

1) Configure environment variables in Vercel:
- Set `DATABASE_URL` (SQLite for dev, Postgres in prod if you prefer)
- Set a strong `SETUP_TOKEN`

2) Trigger once after your first deploy (replace YOUR_URL and YOUR_TOKEN):
- curl: `curl -X POST "https://YOUR_URL/api/admin/setup" -H "x-setup-token: YOUR_TOKEN"`

Responses:
- Success: `{ status: "ok", migrated: true, seeded: true }`
- Already run: `{ status: "ok", alreadySetup: true }`

Implementation notes:
- Idempotency is ensured via a `Setting` table flag (e.g., `setup_complete`).
- For local development, Prisma defaults to SQLite. You can switch the datasource provider in `apps/web/prisma/schema.prisma` and update `DATABASE_URL` accordingly.


## 9) Local development / 本地开发

- Install PNPM, then run `pnpm install`
- Copy `.env.example` to `.env.local` and fill variables
- Generate Prisma Client if needed, run migrations as desired
- Start dev server with `pnpm dev`


## 10) Security / 安全

- Keep `NEXTAUTH_SECRET` and `SETUP_TOKEN` strong and private
- Do not expose server-only keys (`SUPABASE_SERVICE_ROLE`) to the client
- Use environment-specific URLs for `NEXTAUTH_URL`


## 11) Milestones / 里程碑

- M1: Base scaffold complete (routing, layout, Tailwind, shadcn/ui)
- M2: Auth via email magic link wired and tested
- M3: Database schema and seed
- M4: One-click deploy + first-time setup automation
- M5: CI passing (lint, test, build) and docs finalized


## 12) Risks & mitigations / 风险与应对

- SMTP delivery issues — Use verified sender; monitor logs and consider fallback provider
- Database migrations — Keep migrations small and test locally first
- Env misconfiguration — Provide clear `.env.example` and README guidance


## 13) References / 参考

- README.md (Deploy to Vercel and Environment variables sections)
- apps/web/prisma/schema.prisma (database provider and schema)
- NextAuth + Prisma adapter docs

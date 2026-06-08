# Business Card Scanner Monorepo

Monorepo containing the mobile scanning client, backend API, and shared contracts for the Business Card Scanner app.

## Workspaces

- `apps/mobile` – Expo Router React Native app with placeholder Scan, Confirm, Drafts, Profile, and Settings screens.
- `apps/api` – NestJS API with Prisma (PostgreSQL) and BullMQ (Redis) wiring plus mocked OCR and draft generation endpoints.
- `packages/shared` – Shared TypeScript types and Zod schemas (`Contact`, `Draft`, `DraftRequest`, `OfferProfile`, OCR contracts).

## Getting Started

1. **Install dependencies**
   ```sh
   pnpm install
   ```
2. **Environment variables**
   - Copy `apps/api/.env.example` to `apps/api/.env` (create one if it does not exist).
   - Set `DATABASE_URL` for PostgreSQL and `REDIS_HOST` / `REDIS_PORT` for Redis.
   - For Expo, set `EXPO_PUBLIC_API_URL` in `apps/mobile` `.env` to point at the API (e.g. `http://localhost:3000/api`).
3. **Database (optional for mocks)**
   ```sh
   pnpm --filter @business-card/api prisma:migrate:dev
   pnpm --filter @business-card/api prisma:generate
   ```
4. **Run apps**
   ```sh
   pnpm --filter @business-card/api dev
   pnpm --filter @business-card/mobile dev
   ```

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start all workspace dev servers in parallel. |
| `pnpm build` | Build every workspace (API, mobile, shared). |
| `pnpm typecheck` | Run TypeScript in `--noEmit` mode across workspaces. |
| `pnpm lint` | Lint all packages with the shared ESLint config. |
| `pnpm format` | Check formatting with Prettier in each workspace. |

Run `pnpm --filter <workspace> <script>` for per-package scripts.

## API Overview

- `GET /api/health` → `{ status: "ok" }`
- `POST /api/ocr/fallback` → accepts `{ imageUrl }`, returns mocked contact + field confidence.
- `POST /api/drafts` → accepts `{ contact, notes, offerProfile }`, enqueues a BullMQ job and returns mocked drafts using shared types.

## Tooling

- Shared ESLint/Prettier config, `.editorconfig`.
- Husky hooks with commitlint enforcing Conventional Commits.
- GitHub Actions workflow (`.github/workflows/ci.yml`) running `typecheck`, `lint`, and `build`.

## Notes

- Shared contracts live under `packages/shared/src`.
- Expo mobile app has Metro and Babel aliases for `@business-card/shared`.
- The API Prisma schema includes sample contact data in `apps/api/prisma/seed.ts` for local development.

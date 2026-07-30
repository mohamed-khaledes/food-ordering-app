import 'dotenv/config'
import { defineConfig } from 'prisma/config'

/**
 * The Prisma CLI (migrate, introspect) must not go through Neon's *pooled*
 * endpoint — the one with `-pooler` in the hostname.
 *
 * `prisma migrate` first takes a session-scoped advisory lock
 * (`SELECT pg_advisory_lock(...)`) to stop two deployments migrating at once.
 * The pooled endpoint is PgBouncer in transaction mode, which hands out a
 * different backend per transaction, so that lock is acquired on one connection
 * and looked for on another — it can never be observed. The command waits its
 * 10s and dies with `P1002: Timed out trying to acquire a postgres advisory
 * lock`, which is exactly what broke the Vercel build.
 *
 * So: `DIRECT_URL` (unpooled) for the CLI, `DATABASE_URL` (pooled) for the app
 * at runtime — pooling is what you want in serverless. Falls back to
 * `DATABASE_URL` so a local setup without `DIRECT_URL` still works.
 */
const migrationUrl = process.env.DIRECT_URL || process.env.DATABASE_URL

if (!migrationUrl) {
  throw new Error('Set DATABASE_URL (and ideally DIRECT_URL) before running Prisma commands.')
}

// Checks the resolved URL, so an empty or mistyped DIRECT_URL is caught too.
if (migrationUrl.includes('-pooler')) {
  console.warn(
    '⚠️  Prisma CLI is pointed at a pooled connection. Migrations will time out with ' +
      'P1002 — set DIRECT_URL to the same endpoint without "-pooler".'
  )
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npx tsx ./prisma/seed.ts'
  },
  datasource: {
    url: migrationUrl
  }
})

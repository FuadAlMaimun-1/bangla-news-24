<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Next.js 16.3.8 App Router news site (Bangla UI text), single package, deployed on Vercel. Source in `src/`; path alias `@/*` → `./src/*`.

- All news content is fetched server-side inside async server components from the external API `https://prothomalo-news-api.vercel.app` (base URL + shared response types in `src/lib/news-api.ts`) — there is no local news database, and no fetching happens client-side:
  - `/api/news/sections` — homepage groups (`stories`, not `articles`; title field is `section`, group key is `slug`).
  - `/api/news?limit=N` — ticker and most-read fallback (`data[]`).
  - `/api/category/:slug` (singular!) — category pages; also accepts a Bengali title or numeric id. The plural `/api/categories/:id` route does not exist.
  - `/api/article/:id` — article detail; exposes the original Prothom Alo URL as `link` (there is no `sourceUrl`), plus `text`, `body[]`, `tags`, `wordCount`.
  - `/api/categories` — returns `data[]` plus an `aliases` array of the 13 curated main nav sections; three alias slugs (economy, health, environment) are missing from `data` and use fallback titles in `src/components/NavLink.tsx`.
  - `/api/news/most-read` is documented but its upstream is intermittently broken (404) — `src/components/MostRead.tsx` falls back to `/api/news?limit=10`.
- `json-server`, `cheerio`, and `rss-parser` in dependencies are unused leftovers — don't start or import them.
- Auth is Better Auth: server config `src/lib/auth.ts`, client `src/lib/auth-client.ts` (`better-auth/react`), catch-all handler `src/app/api/auth/[...all]/route.ts`. MongoDB adapter, db name `bangla-news-24`; email/password + Google/GitHub/Facebook.
- Route protection is `src/proxy.ts` — Next 16 renamed `middleware.ts` to `proxy.ts` and the export to `proxy`. Matcher covers `/profile` and `/news/:path`; unauthenticated users get redirected to `/sign-in`.
- `CLAUDE.md` only imports this file — keep guidance here.

## Commands

- `npm run dev` — dev server. It re-writes the auto-generated block at the top of this file; don't delete it, commit it.
- `npm run lint` — ESLint flat config, takes no extra args.
- `npm run build` — production build; also typechecks. There is no `typecheck` script — use `npx tsc --noEmit` for a fast check.
- No tests or formatter exist. Verify changes with `npm run lint` + `npm run build`.

## Environment

Auth fails at runtime without env vars (`.env*` is gitignored; the repo owner's local `.env.local` carries them): `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_BETTER_AUTH_URL` (client falls back to `http://localhost:3000`), and `GOOGLE_*`/`GITHUB_*`/`FACEBOOK_*` `CLIENT_ID`/`CLIENT_SECRET` pairs for the three social providers.

## Toolchain quirks

- React Compiler is on (`reactCompiler: true` in `next.config.ts`) — don't add manual `memo`/`useMemo`/`useCallback` optimizations.
- Tailwind CSS v4 is configured in CSS, not JS: `src/app/globals.css` holds `@import "tailwindcss"`, `@plugin "daisyui"`, `@import "@heroui/styles"`. There is no `tailwind.config.*`. Main UI kit is HeroUI (`@heroui/react`).
- `next.config.ts` allows images from all `https` hosts (`remotePatterns` hostname `"**"`) — no need to add hostnames.
- Next 16 generated global types are in play: layouts use `LayoutProps<"/">`, and dynamic `params` are Promises (`const { id } = await params`).

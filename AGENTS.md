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
  - `/api/category/:slug` (singular!) — category pages; also accepts a Bengali title or numeric id, and slugs absent from `/api/categories` (cricket, fun, …) still resolve. The plural `/api/categories/:id` route does not exist.
  - `/api/article/:id` — article detail; exposes the original Prothom Alo URL as `link` (there is no `sourceUrl`), plus `text`, `body[]`, `tags`, `wordCount`.
  - `/api/categories` — returns `data[]` plus an `aliases` array of the 13 curated main nav sections; three alias slugs (economy, health, environment) are missing from `data` and use fallback titles in `src/components/NavLink.tsx`.
  - `/api/news/most-read` is documented but its upstream is intermittently broken (404) — `src/components/MostRead.tsx` falls back to `/api/news?limit=10`.
  - Always wrap `imageUrl` values with `resolveImageUrl(...)` from the same module — the API returns null/empty images for many stories. Bangla display helpers (numbers, relative time) live in `src/lib/format.ts`.
- `json-server`, `cheerio`, and `rss-parser` in dependencies are unused leftovers — don't start or import them. `src/components/NewsSection.tsx` is dead code; nothing imports it.
- Auth is Better Auth: server config `src/lib/auth.ts`, client `src/lib/auth-client.ts` (`better-auth/react`), catch-all handler `src/app/api/auth/[...all]/route.ts`. MongoDB adapter, db name `bangla-news-24`; email/password + Google/GitHub/Facebook. The full email flow (sign-up → sign-in → session → sign-out) is verified working end-to-end.
  - **Never point auth at a fixed localhost URL.** On this machine port 3000 runs a different project (`C:\Projects\user-client`), so `next dev` lands on 3001+. `BETTER_AUTH_URL`/`NEXT_PUBLIC_BETTER_AUTH_URL` are therefore intentionally commented out in `.env*`, and `auth-client.ts` passes no `baseURL` — Better Auth derives the origin from the request, which works on any port and in production. Re-adding `http://localhost:3000` breaks every auth call (404 from the wrong server, or 403 `INVALID_ORIGIN` on the right one).
  - `npm run build` prints Better Auth's "Base URL is not set" warning — expected and safe with this setup; ignore it (or set `BETTER_AUTH_URL` in the Vercel dashboard if production ever needs a pinned origin).
- Route protection is `src/proxy.ts` — Next 16 renamed `middleware.ts` to `proxy.ts` and the export to `proxy`. Matcher covers `/profile` and `/news/:path`; unauthenticated users are redirected to `/sign-in?callbackURL=<path>`, and the sign-in/sign-up pages send them back there after login (`resolveCallbackURL` helper, same-origin paths only — it guards against open redirects).
- `CLAUDE.md` only imports this file — keep guidance here.

## Commands

- `npm run dev` — dev server. A dev server for this project is often already running on this machine — check port **3001** (not 3000) and test against it instead of starting a second one. It also re-writes the auto-generated block at the top of this file; don't delete it, commit it.
- `npm run lint` — ESLint flat config, takes no extra args.
- `npm run build` — production build; also typechecks. There is no `typecheck` script — use `npx tsc --noEmit` for a fast check.
- No tests or formatter exist. Verify changes with `npx tsc --noEmit` → `npm run lint` → `npm run build`. On Windows the static-generation worker occasionally dies once with code `3221226505` — re-run the build before investigating.

## Environment

Auth fails at runtime without env vars (`.env*` is gitignored; the repo owner's local `.env*` carries them): `MONGODB_URL`, `BETTER_AUTH_SECRET`, and the `GOOGLE_*`/`GITHUB_*`/`FACEBOOK_*` `CLIENT_ID`/`CLIENT_SECRET` pairs. Keep `BETTER_AUTH_URL`/`NEXT_PUBLIC_BETTER_AUTH_URL` unset locally (see Auth above). For GitHub/Facebook OAuth the provider consoles must list the exact callback URL of the origin you test from (`…/api/auth/callback/github`), including the port — Google treats any `localhost` port as valid.

## Homepage & video news

- The homepage hero (`MainNews.tsx`) keeps the lead image with its description clamped to 2 lines below it. The video block (`VideoSection.tsx`) is tabbed — the "ভিডিও" tab toggles the panel — and plays videos in `VideoPlayerModal.tsx`; main-news cards deliberately carry no video treatment.
- Prothom Alo article pages are ~3.7 MB (Next's data cache refuses >2 MB responses) but their YouTube `embedUrl` sits in JSON-LD near the start of the HTML: `src/lib/video-embed.ts` streams the page, extracts it, cancels the download, and memoizes results (plus an SSRF allowlist: only `prothomalo.com` `/video/` links). `src/app/api/video/embed/route.ts` exposes it to the client on demand. `video-embed.ts` is Node-only — never import it from client components, and never resolve embeds at render time.

## Toolchain quirks

- React Compiler is on (`reactCompiler: true` in `next.config.ts`) — don't add manual `memo`/`useMemo`/`useCallback` optimizations.
- Tailwind CSS v4 is configured in CSS, not JS: `src/app/globals.css` holds `@import "tailwindcss"`, `@plugin "daisyui"`, `@import "@heroui/styles"`. There is no `tailwind.config.*`. Main UI kit is HeroUI (`@heroui/react`).
- `next.config.ts` allows images from all `https` hosts (`remotePatterns` hostname `"**"`) — no need to add hostnames. It also pins `turbopack.root` to the repo directory; without that Turbopack walks up to `C:\Projects`, finds a stray `package-lock.json` there and warns on every build.
- Next 16 generated global types are in play: layouts use `LayoutProps<"/">`, and dynamic `params` are Promises (`const { id } = await params`).

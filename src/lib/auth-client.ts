import { createAuthClient } from "better-auth/react";

/**
 * Never hardcode `http://localhost:3000` here: on this machine port 3000 runs
 * a different project (`user-client`), and this app's dev server picks 3001+ —
 * a hardcoded base URL sends every sign-in/sign-up/session call to the wrong
 * server (404) or triggers `INVALID_ORIGIN` (403) on the right one.
 *
 * With no explicit baseURL better-auth resolves to `window.location.origin`
 * here and to the request origin on the server, so auth works on any dev port
 * and on the deployed domain.
 *
 * Set `NEXT_PUBLIC_BETTER_AUTH_URL` (and `BETTER_AUTH_URL`) only when the app
 * must be reachable from a different origin than the page calling it.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || undefined,
});

export const { signIn, signUp, signOut, updateUser, useSession } = authClient;

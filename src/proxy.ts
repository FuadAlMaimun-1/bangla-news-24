import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    // Preserve the page the visitor wanted so sign-in can send them back
    // after a successful login (sign-in reads `callbackURL`).
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set(
      "callbackURL",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: ["/profile", "/news/:path"],
};

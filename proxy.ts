import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { affiliateCookieMaxAge, affiliateCookieName, normalizeAffiliateSlug } from "@/lib/affiliate";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/affiliates")) {
    const password = process.env.AFFILIATE_ADMIN_PASSWORD;
    const authorization = request.headers.get("authorization");

    if (!password || !authorization?.startsWith("Basic ")) {
      return new NextResponse("Authentication required.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Preventive Wealth Affiliates"'
        }
      });
    }

    const decoded = atob(authorization.slice("Basic ".length));
    const [, suppliedPassword] = decoded.split(":");

    if (suppliedPassword !== password) {
      return new NextResponse("Authentication required.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Preventive Wealth Affiliates"'
        }
      });
    }
  }

  const response = NextResponse.next();
  const referral = request.nextUrl.searchParams.get("ref") || request.nextUrl.searchParams.get("affiliate");

  if (referral) {
    const normalizedReferral = normalizeAffiliateSlug(referral);

    if (normalizedReferral) {
      response.cookies.set(affiliateCookieName, normalizedReferral, {
        maxAge: affiliateCookieMaxAge,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: false
      });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"]
};

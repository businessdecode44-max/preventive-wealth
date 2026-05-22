import { NextResponse } from "next/server";

export function isAdminAuthorized(request: Request) {
  const password = process.env.AFFILIATE_ADMIN_PASSWORD;

  if (!password) {
    return false;
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return false;
  }

  const encoded = authorization.slice("Basic ".length);
  const decoded = atob(encoded);
  const [, suppliedPassword] = decoded.split(":");

  return suppliedPassword === password;
}

export function adminUnauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Preventive Wealth Affiliates"'
    }
  });
}

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (req.nextUrl.pathname === "/") {
    if (token) {
      try {
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET!)
        );
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (error) {
        console.error("Error al verificar token:", error);
        const response = NextResponse.next();
        response.cookies.delete("auth_token");
        return response;
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    return NextResponse.next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.delete("auth_token");
    return response;
  }
}

export const config = {
  matcher: ["/projects", "/dashboard/:path*", "/dashboard", "/metrics/:path*"],
};

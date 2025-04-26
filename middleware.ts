import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas que no requieren autenticación
const publicRoutes = ["/login"];

export function middleware(request: NextRequest) {
  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(`${route}/`)
  );

  // Verificar si hay una cookie de sesión
  const isLoggedIn = request.cookies.has("auth");

  // Si es una ruta pública y el usuario está logueado, redirigir al dashboard
  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si no es una ruta pública y el usuario no está logueado, redirigir al login
  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. /api (rutas API)
     * 2. /_next (archivos internos de Next.js)
     * 3. /_static (si usas Vercel para servir archivos estáticos)
     * 4. /favicon.ico, /manifest.json, etc.
     */
    "/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

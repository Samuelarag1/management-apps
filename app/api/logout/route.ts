import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { handleRouteError, jsonResponse } from "@/lib/http";

export async function POST() {
  try {
    const response = jsonResponse({ message: "Sesión cerrada correctamente" });

    response.cookies.set(AUTH_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return handleRouteError(error, "Error al cerrar sesión");
  }
}

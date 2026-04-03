import bcrypt from "bcrypt";
import { createAuthToken } from "@/lib/auth";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_TTL_SECONDS } from "@/lib/constants";
import { errorResponse, handleRouteError, jsonResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { serializeUser } from "@/lib/serializers";
import { loginSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const payload = loginSchema.parse(await req.json());

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      return errorResponse("Credenciales inválidas", 401);
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordValid) {
      return errorResponse("Credenciales inválidas", 401);
    }

    const token = await createAuthToken({
      sub: String(user.id),
      email: user.email,
      role: user.role,
    });

    const response = jsonResponse(
      {
        message: "Login exitoso",
        user: serializeUser(user),
      },
      200
    );

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: AUTH_TOKEN_TTL_SECONDS,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    return handleRouteError(error, "Error al autenticar al usuario");
  }
}

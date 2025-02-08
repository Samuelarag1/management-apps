import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        roles: user.role, // Asegúrate de que "roles" existe en Prisma
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json(
      { message: "Login exitoso" },
      { status: 200 }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: "strict" as const,
    };

    response.cookies.set("auth_token", token, cookieOptions);

    return response;
  } catch (error) {
    console.error("Error en la autenticación:", error);

    return NextResponse.json(
      { message: "Error al autenticar al usuario", error: error },
      { status: 500 }
    );
  }
}

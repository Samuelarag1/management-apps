import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { UserModel } from "@/Models/User";

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {});
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `No se pudo conectar a la base de datos: ${error.message}`
      );
    } else {
      throw new Error(
        "No se pudo conectar a la base de datos: Error desconocido"
      );
    }
  }
};

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        sub: user._id,
        email: user.email,
        roles: user.roles,
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

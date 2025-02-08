import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { email, password, role } = await req.json();

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 400 }
      );
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        name: "Samuel",
      },
    });

    // Devolver una respuesta exitosa
    return NextResponse.json(
      { message: "Usuario registrado exitosamente", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json(
      { message: "Error al registrar el usuario", error },
      { status: 500 }
    );
  }
}

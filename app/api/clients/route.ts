import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;
    console.log(email);

    const client = await prisma.clients.findUnique({ where: { email } });

    if (!client) {
      await prisma.clients.create({ data: body });
      return NextResponse.json({ message: "Cliente creado" }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "El cliente ya existe" },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: "Error al crear usuario" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const clients = await prisma.clients.findMany();
    return NextResponse.json(clients, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Error al traer todos los proyectos" },
      { status: 500 }
    );
  }
}

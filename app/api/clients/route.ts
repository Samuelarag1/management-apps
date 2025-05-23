import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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
}

export async function GET() {
  const clients = await prisma.clients.findMany();

  return NextResponse.json(clients, { status: 200 });
}

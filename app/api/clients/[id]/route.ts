import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const prisma = new PrismaClient();
  const id = context.params;

  try {
    const clientId = Number(id);

    if (isNaN(clientId)) {
      return NextResponse.json(
        { message: "Error al eliminar usuario, isNaN" },
        { status: 400 }
      );
    }

    await prisma.clients.delete({ where: { id: clientId } });

    return NextResponse.json(
      { message: "Usuario eliminado correctamente!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const prisma = new PrismaClient();
  const { id } = await context.params;

  try {
    const user = await prisma.clients.findFirst({
      where: { id: Number(id) },
      include: { projects: true },
    });

    if (!user) throw new Error("No se ecn");

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { message: "Error al encontrar este usuario" },
      { status: 400 }
    );
  }
}

// export async function UPDATE(req: Request);

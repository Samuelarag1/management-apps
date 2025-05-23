import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const prisma = new PrismaClient();
  const { id } = context.params;

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
  } catch (error) {
    return NextResponse.json(
      { message: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}

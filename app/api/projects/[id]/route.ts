import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const prisma = new PrismaClient();
  const projectId = await context.params;

  try {
    if (!projectId || typeof projectId !== "string") {
      return NextResponse.json(
        { message: "ID de proyecto inválido" },
        { status: 400 }
      );
    }

    const deletedProject = await prisma.project.delete({
      where: { id: projectId }, // 👈 projectId es string UUID
    });

    return NextResponse.json(
      { message: "Proyecto eliminado correctamente", deletedProject },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Error al eliminar el proyecto" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const prisma = new PrismaClient();
  const projectId = (await context.params).id;
  try {
    if (!projectId) {
      return NextResponse.json(
        { message: "No se encontro este proyecto" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findFirst({
      where: { id: projectId },
      include: { client: true },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { message: "Error al buscar proyecto" },
      { status: 400 }
    );
  }
}

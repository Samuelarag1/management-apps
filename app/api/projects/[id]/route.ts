import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const projectId = params?.id;

  try {
    const deletedProject = await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json(
      { message: "Proyecto eliminado correctamente", deletedProject },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al eliminar el proyecto", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
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

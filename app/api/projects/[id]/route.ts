import { errorResponse, handleRouteError, jsonResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { serializeProject } from "@/lib/serializers";

function ensureProjectId(id: string) {
  if (!id.trim()) {
    throw new Error("ID de proyecto inválido");
  }

  return id;
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const projectId = ensureProjectId(id);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true },
    });

    if (!project) {
      return errorResponse("Proyecto no encontrado", 404);
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    return jsonResponse({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    return handleRouteError(error, "Error al eliminar el proyecto");
  }
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const projectId = ensureProjectId(id);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            alias: true,
          },
        },
      },
    });

    if (!project) {
      return errorResponse("Proyecto no encontrado", 404);
    }

    return jsonResponse(serializeProject(project));
  } catch (error) {
    return handleRouteError(error, "Error al buscar proyecto", 400);
  }
}

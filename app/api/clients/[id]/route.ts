import { errorResponse, handleRouteError, jsonResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { serializeClient } from "@/lib/serializers";

function parseClientId(id: string) {
  const clientId = Number(id);

  if (!Number.isInteger(clientId) || clientId <= 0) {
    throw new Error("ID de cliente inválido");
  }

  return clientId;
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const clientId = parseClientId(id);

    const client = await prisma.clients.findUnique({
      where: { id: clientId },
      include: {
        projects: {
          select: { id: true },
        },
      },
    });

    if (!client) {
      return errorResponse("Cliente no encontrado", 404);
    }

    if (client.projects.length > 0) {
      return errorResponse(
        "No se puede eliminar un cliente con proyectos asociados",
        409
      );
    }

    await prisma.clients.delete({ where: { id: clientId } });

    return jsonResponse({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    return handleRouteError(error, "Error al eliminar cliente");
  }
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const clientId = parseClientId(id);

    const client = await prisma.clients.findUnique({
      where: { id: clientId },
      include: {
        projects: {
          select: {
            id: true,
            name: true,
            status: true,
            finish_date: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    if (!client) {
      return errorResponse("Cliente no encontrado", 404);
    }

    return jsonResponse(serializeClient(client));
  } catch (error) {
    return handleRouteError(error, "Error al encontrar el cliente", 400);
  }
}

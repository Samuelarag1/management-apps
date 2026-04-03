import { errorResponse, handleRouteError, jsonResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { serializeProject } from "@/lib/serializers";
import { createProjectSchema } from "@/lib/validators";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            alias: true,
          },
        },
      },
      orderBy: [{ initial_date: "desc" }, { name: "asc" }],
    });

    return jsonResponse(projects.map(serializeProject));
  } catch (error) {
    return handleRouteError(error, "Error al traer proyectos");
  }
}

export async function POST(req: Request) {
  try {
    const payload = createProjectSchema.parse(await req.json());

    if (payload.clientsId) {
      const client = await prisma.clients.findUnique({
        where: { id: payload.clientsId },
        select: { id: true },
      });

      if (!client) {
        return errorResponse("El cliente seleccionado no existe", 404);
      }
    }

    const newProject = await prisma.project.create({
      data: payload,
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

    return jsonResponse(serializeProject(newProject), 201);
  } catch (error) {
    return handleRouteError(error, "Error al crear proyecto", 400);
  }
}

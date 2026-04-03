import { errorResponse, handleRouteError, jsonResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { serializeClient } from "@/lib/serializers";
import { createClientSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const payload = createClientSchema.parse(await req.json());

    const existingClient = await prisma.clients.findUnique({
      where: { email: payload.email },
    });

    if (existingClient) {
      return errorResponse("Ya existe un cliente con ese email", 409);
    }

    const client = await prisma.clients.create({
      data: {
        ...payload,
        phone_number: payload.phone_number ?? null,
        location: payload.location ?? null,
      },
      include: {
        projects: {
          select: {
            id: true,
            name: true,
            status: true,
            finish_date: true,
          },
        },
      },
    });

    return jsonResponse(serializeClient(client), 201);
  } catch (error) {
    return handleRouteError(error, "Error al crear cliente");
  }
}

export async function GET() {
  try {
    const clients = await prisma.clients.findMany({
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
      orderBy: {
        name: "asc",
      },
    });

    return jsonResponse(clients.map(serializeClient));
  } catch (error) {
    return handleRouteError(error, "Error al traer clientes");
  }
}

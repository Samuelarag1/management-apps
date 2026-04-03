import { Status } from "@prisma/client";
import { handleRouteError, jsonResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      projectCount,
      activeProjectCount,
      completedProjectCount,
      clientCount,
      revenueProjects,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: Status.activo } }),
      prisma.project.count({ where: { status: Status.completo } }),
      prisma.clients.count(),
      prisma.project.findMany({
        select: {
          price: true,
        },
      }),
    ]);

    const totalRevenue = revenueProjects.reduce((sum, project) => {
      return sum + Number(project.price);
    }, 0);

    return jsonResponse({
      projectCount,
      activeProjectCount,
      completedProjectCount,
      clientCount,
      totalRevenue,
    });
  } catch (error) {
    return handleRouteError(error, "Error al traer el resumen del dashboard");
  }
}

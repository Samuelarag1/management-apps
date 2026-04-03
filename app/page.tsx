import { Status } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, CheckSquare, CreditCard, Users } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { ProjectsOverview } from "@/components/projects-overview";
import { Sidebar } from "@/components/sidebar";
import { formatPrice } from "@/utils/numberUtils";
import Link from "next/link";

export default async function Home() {
  const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);

  let projectCount = 0;
  let activeProjectCount = 0;
  let completedProjectCount = 0;
  let clientCount = 0;
  let totalRevenue = 0;
  let overviewProjects: Array<{
    id: string;
    name: string;
    client: string | null;
    status: Status | null;
    finishDate: string | null;
  }> = [];

  if (isDatabaseConfigured) {
    const [
      totalProjects,
      activeProjects,
      completedProjects,
      totalClients,
      revenueProjects,
      recentProjects,
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
      prisma.project.findMany({
        take: 4,
        orderBy: [{ initial_date: "desc" }, { name: "asc" }],
        include: {
          client: {
            select: {
              name: true,
              alias: true,
            },
          },
        },
      }),
    ]);

    projectCount = totalProjects;
    activeProjectCount = activeProjects;
    completedProjectCount = completedProjects;
    clientCount = totalClients;
    totalRevenue = revenueProjects.reduce((sum, project) => {
      return sum + Number(project.price);
    }, 0);
    overviewProjects = recentProjects.map((project) => ({
      id: project.id,
      name: project.name,
      client: project.client?.alias ?? project.client?.name ?? null,
      status: project.status ?? null,
      finishDate: project.finish_date?.toISOString() ?? null,
    }));
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Proyectos activos
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjectCount}</div>
                <p className="text-xs text-muted-foreground">
                  {isDatabaseConfigured
                    ? `${projectCount} proyectos en total`
                    : "Configura DATABASE_URL para ver métricas reales"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Proyectos completos
                </CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedProjectCount}</div>
                <p className="text-xs text-muted-foreground">
                  Historial de entregas finalizadas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientCount}</div>
                <p className="text-xs text-muted-foreground">
                  Contactos activos en la base
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Facturación estimada
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPrice(totalRevenue)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Suma del valor actual de los proyectos
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Proyectos recientes</CardTitle>
                <CardDescription>
                  Resumen actualizado de los últimos proyectos cargados.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectsOverview projects={overviewProjects} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Accesos rápidos</CardTitle>
                <CardDescription>
                  Atajos a las secciones que más vas a usar.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button asChild className="justify-start">
                  <Link href="/projects">Abrir proyectos</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/clients">Gestionar clientes</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/tasks">Revisar tareas</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/invoices">Ver facturación</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

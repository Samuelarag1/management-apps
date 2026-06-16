import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, CreditCard, Users, Wrench } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { ProjectsOverview } from "@/components/projects-overview";
import { Sidebar } from "@/components/sidebar";
import { formatPrice } from "@/utils/numberUtils";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

  let projectCount = 0;
  let activeProjectCount = 0;
  let completedProjectCount = 0;
  let clientCount = 0;
  let monthlyMaintenance = 0;
  let activeMaintCount = 0;
  let recentMaintenances: Array<{ id: string; name: string; amount: number; status: string; clientAlias: string | null }> = [];
  let monthlyWorkTotal = 0;
  let overviewProjects: Array<{
    id: string;
    name: string;
    client: string | null;
    status: string | null;
    finishDate: string | null;
  }> = [];

  try {
    const now = new Date();
    const firstOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

    const [
      { count: total },
      { count: active },
      { count: completed },
      { count: clients },
      { data: recentProjects },
      { data: maintenanceData },
      { data: workThisMonth },
    ] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("status", "activo"),
      supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("status", "completo"),
      supabase.from("clients").select("*", { count: "exact", head: true }),
      supabase
        .from("projects")
        .select("id, name, status, finish_date, clients(name, alias)")
        .order("created_at", { ascending: false })
        .limit(4),
      supabase
        .from("maintenances")
        .select("id, name, amount, status, clients(name, alias)")
        .order("created_at", { ascending: false })
        .limit(5),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any)
        .from("work_items")
        .select("amount")
        .gte("work_date", firstOfMonth),
    ]);

    projectCount = total ?? 0;
    activeProjectCount = active ?? 0;
    completedProjectCount = completed ?? 0;
    clientCount = clients ?? 0;

    type RawRecent = { id: string; name: string; status: string | null; finish_date: string | null; clients: { name: string; alias: string } | null };
    overviewProjects = ((recentProjects ?? []) as unknown as RawRecent[]).map((p) => ({
      id: p.id,
      name: p.name,
      client: p.clients?.alias ?? p.clients?.name ?? null,
      status: p.status,
      finishDate: p.finish_date ?? null,
    }));

    type RawMaint = { id: string; name: string; amount: number; status: string; clients: { name: string; alias: string } | null };
    const maint = ((maintenanceData ?? []) as unknown as RawMaint[]);
    activeMaintCount = maint.filter((m) => m.status === "activo").length;
    monthlyMaintenance = maint
      .filter((m) => m.status === "activo")
      .reduce((sum, m) => sum + (m.amount ?? 0), 0);
    recentMaintenances = maint.map((m) => ({
      id: m.id,
      name: m.name,
      amount: m.amount,
      status: m.status,
      clientAlias: m.clients?.alias ?? null,
    }));
    monthlyWorkTotal = ((workThisMonth ?? []) as { amount: number }[]).reduce(
      (sum, w) => sum + (w.amount ?? 0),
      0
    );
  } catch {
    // silently degrade — data will show zeros
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 pb-16 lg:pb-6">
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
                  {projectCount} proyectos en total
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
                  {completedProjectCount} proyectos completos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Mantenimientos activos
                </CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeMaintCount}</div>
                <p className="text-xs text-muted-foreground">
                  servicios recurrentes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Este mes
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPrice(monthlyMaintenance + monthlyWorkTotal)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatPrice(monthlyMaintenance)} mant. · {formatPrice(monthlyWorkTotal)} trabajos
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
            <div className="lg:col-span-3 flex flex-col gap-4">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Mantenimientos</CardTitle>
                  <CardDescription>
                    Últimos servicios recurrentes registrados.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentMaintenances.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No hay mantenimientos.{" "}
                      <Link href="/maintenance" className="underline">
                        Agregar uno
                      </Link>
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {recentMaintenances.map((m) => (
                        <div key={m.id} className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-medium leading-none">{m.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {m.clientAlias ?? "Sin cliente"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{formatPrice(m.amount)}</span>
                            <Badge variant={m.status === "activo" ? "default" : "secondary"} className="text-[10px]">
                              {m.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Button asChild variant="ghost" size="sm" className="w-full mt-2">
                        <Link href="/maintenance">Ver todos →</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Accesos rápidos</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Button asChild className="justify-start">
                    <Link href="/projects">Abrir proyectos</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/clients">Gestionar clientes</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/invoices">Ver facturación</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/maintenance">Mantenimientos</Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start">
                    <Link href="/work">Trabajos</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

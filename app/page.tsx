import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CreditCard, Briefcase, CheckSquare } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { ProjectsOverview } from "@/components/projects-overview";
import { RecentInvoices } from "@/components/recent-invoices";
import { TasksOverview } from "@/components/tasks-overview";
// import { RegisterSW } from "./register-sw";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
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
                  Proyectos Activos
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">+2 este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tareas Pendientes
                </CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  6 con vencimiento próximo
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ingresos Mensuales
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,250</div>
                <p className="text-xs text-muted-foreground">
                  +20% respecto al mes anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Horas Registradas
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120h</div>
                <p className="text-xs text-muted-foreground">32h esta semana</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="projects">Proyectos</TabsTrigger>
              <TabsTrigger value="tasks">Tareas</TabsTrigger>
              <TabsTrigger value="invoices">Facturas</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Proyectos Recientes</CardTitle>
                    <CardDescription>
                      Resumen de tus proyectos activos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProjectsOverview />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Tareas Pendientes</CardTitle>
                    <CardDescription>
                      Tareas con vencimiento próximo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TasksOverview />
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Facturas Recientes</CardTitle>
                  <CardDescription>Historial de facturación</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentInvoices />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="projects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Todos los Proyectos</CardTitle>
                  <CardDescription>
                    Gestiona todos tus proyectos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button>Nuevo Proyecto</Button>
                  </div>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                      <div>Nombre</div>
                      <div>Cliente</div>
                      <div>Estado</div>
                      <div>Fecha límite</div>
                      <div>Acciones</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          name: "Rediseño Web",
                          client: "Acme Inc",
                          status: "En progreso",
                          deadline: "15 Mayo 2025",
                        },
                        {
                          name: "App Móvil",
                          client: "TechCorp",
                          status: "Planificación",
                          deadline: "30 Junio 2025",
                        },
                        {
                          name: "Campaña Marketing",
                          client: "GlobalBiz",
                          status: "En progreso",
                          deadline: "22 Mayo 2025",
                        },
                        {
                          name: "Tienda Online",
                          client: "LocalShop",
                          status: "Revisión",
                          deadline: "10 Mayo 2025",
                        },
                      ].map((project, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-5 gap-4 p-4 items-center"
                        >
                          <div className="font-medium">{project.name}</div>
                          <div>{project.client}</div>
                          <div>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                project.status === "En progreso"
                                  ? "bg-blue-100 text-blue-800"
                                  : project.status === "Planificación"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                          <div>{project.deadline}</div>
                          <div>
                            <Button variant="ghost" size="sm">
                              Ver
                            </Button>
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tasks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Todas las Tareas</CardTitle>
                  <CardDescription>
                    Gestiona tus tareas pendientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button>Nueva Tarea</Button>
                  </div>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                      <div>Tarea</div>
                      <div>Proyecto</div>
                      <div>Prioridad</div>
                      <div>Fecha límite</div>
                      <div>Acciones</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          name: "Diseñar página de inicio",
                          project: "Rediseño Web",
                          priority: "Alta",
                          deadline: "10 Mayo 2025",
                        },
                        {
                          name: "Implementar autenticación",
                          project: "App Móvil",
                          priority: "Media",
                          deadline: "15 Mayo 2025",
                        },
                        {
                          name: "Crear contenido para redes",
                          project: "Campaña Marketing",
                          priority: "Alta",
                          deadline: "8 Mayo 2025",
                        },
                        {
                          name: "Configurar pasarela de pago",
                          project: "Tienda Online",
                          priority: "Alta",
                          deadline: "5 Mayo 2025",
                        },
                      ].map((task, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-5 gap-4 p-4 items-center"
                        >
                          <div className="font-medium">{task.name}</div>
                          <div>{task.project}</div>
                          <div>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                task.priority === "Alta"
                                  ? "bg-red-100 text-red-800"
                                  : task.priority === "Media"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                          <div>{task.deadline}</div>
                          <div>
                            <Button variant="ghost" size="sm">
                              Completar
                            </Button>
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="invoices" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Todas las Facturas</CardTitle>
                  <CardDescription>
                    Gestiona tus facturas y pagos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button>Nueva Factura</Button>
                  </div>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                      <div>Nº Factura</div>
                      <div>Cliente</div>
                      <div>Fecha</div>
                      <div>Monto</div>
                      <div>Estado</div>
                      <div>Acciones</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          id: "INV-001",
                          client: "Acme Inc",
                          date: "01 Abril 2025",
                          amount: "$1,200",
                          status: "Pagada",
                        },
                        {
                          id: "INV-002",
                          client: "TechCorp",
                          date: "15 Abril 2025",
                          amount: "$850",
                          status: "Pendiente",
                        },
                        {
                          id: "INV-003",
                          client: "GlobalBiz",
                          date: "22 Abril 2025",
                          amount: "$1,500",
                          status: "Pagada",
                        },
                        {
                          id: "INV-004",
                          client: "LocalShop",
                          date: "30 Abril 2025",
                          amount: "$700",
                          status: "Vencida",
                        },
                      ].map((invoice, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-6 gap-4 p-4 items-center"
                        >
                          <div className="font-medium">{invoice.id}</div>
                          <div>{invoice.client}</div>
                          <div>{invoice.date}</div>
                          <div>{invoice.amount}</div>
                          <div>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                invoice.status === "Pagada"
                                  ? "bg-green-100 text-green-800"
                                  : invoice.status === "Pendiente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {invoice.status}
                            </span>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">
                              Ver
                            </Button>
                            <Button variant="ghost" size="sm">
                              Descargar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

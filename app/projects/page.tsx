import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function ProyectosPage() {
  const proyectos = [
    {
      id: 1,
      nombre: "Rediseño Web",
      cliente: "Acme Inc",
      estado: "En progreso",
      fechaInicio: "01 Abril 2025",
      fechaFin: "15 Mayo 2025",
      progreso: 65,
      presupuesto: "$3,500",
      tareas: 12,
      tareasCompletadas: 8,
    },
    {
      id: 2,
      nombre: "App Móvil",
      cliente: "TechCorp",
      estado: "Planificación",
      fechaInicio: "15 Abril 2025",
      fechaFin: "30 Junio 2025",
      progreso: 25,
      presupuesto: "$8,000",
      tareas: 20,
      tareasCompletadas: 5,
    },
    {
      id: 3,
      nombre: "Campaña Marketing",
      cliente: "GlobalBiz",
      estado: "En progreso",
      fechaInicio: "10 Abril 2025",
      fechaFin: "22 Mayo 2025",
      progreso: 50,
      presupuesto: "$2,500",
      tareas: 15,
      tareasCompletadas: 7,
    },
    {
      id: 4,
      nombre: "Tienda Online",
      cliente: "LocalShop",
      estado: "Revisión",
      fechaInicio: "05 Abril 2025",
      fechaFin: "10 Mayo 2025",
      progreso: 90,
      presupuesto: "$4,200",
      tareas: 18,
      tareasCompletadas: 16,
    },
    {
      id: 5,
      nombre: "Identidad Corporativa",
      cliente: "Innovate Labs",
      estado: "Completado",
      fechaInicio: "01 Marzo 2025",
      fechaFin: "30 Marzo 2025",
      progreso: 100,
      presupuesto: "$1,800",
      tareas: 10,
      tareasCompletadas: 10,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pb-16 lg:pb-0">
          <div className="container mx-auto p-4 md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Proyectos</h1>
                <p className="text-muted-foreground">
                  Gestiona tus proyectos y su progreso
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar proyecto..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-[200px] lg:w-[300px]"
                  />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Proyecto
                </Button>
              </div>
            </div>

            <Tabs defaultValue="todos" className="mt-6">
              <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="activos">Activos</TabsTrigger>
                <TabsTrigger value="completados">Completados</TabsTrigger>
              </TabsList>
              <TabsContent value="todos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Todos los Proyectos</CardTitle>
                    <CardDescription>
                      Lista de todos tus proyectos y su estado actual
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                        <div className="col-span-2">Proyecto</div>
                        <div>Cliente</div>
                        <div>Estado</div>
                        <div>Fecha Límite</div>
                        <div>Progreso</div>
                        <div>Acciones</div>
                      </div>
                      <div className="divide-y">
                        {proyectos.map((proyecto) => (
                          <div
                            key={proyecto.id}
                            className="grid grid-cols-7 gap-4 p-4 items-center"
                          >
                            <div className="col-span-2">
                              <div className="font-medium">
                                {proyecto.nombre}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {proyecto.tareasCompletadas} de{" "}
                                {proyecto.tareas} tareas completadas
                              </div>
                            </div>
                            <div>{proyecto.cliente}</div>
                            <div>
                              <Badge
                                variant={
                                  proyecto.estado === "Completado"
                                    ? "outline"
                                    : proyecto.estado === "En progreso"
                                    ? "default"
                                    : proyecto.estado === "Planificación"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {proyecto.estado}
                              </Badge>
                            </div>
                            <div>{proyecto.fechaFin}</div>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={proyecto.progreso}
                                className="h-2"
                              />
                              <span className="text-sm font-medium">
                                {proyecto.progreso}%
                              </span>
                            </div>
                            <div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Acciones</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    Ver detalles
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Editar proyecto
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Ver tareas
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Eliminar proyecto
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="activos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Proyectos Activos</CardTitle>
                    <CardDescription>
                      Proyectos en curso y planificación
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                        <div className="col-span-2">Proyecto</div>
                        <div>Cliente</div>
                        <div>Estado</div>
                        <div>Fecha Límite</div>
                        <div>Progreso</div>
                        <div>Acciones</div>
                      </div>
                      <div className="divide-y">
                        {proyectos
                          .filter(
                            (proyecto) => proyecto.estado !== "Completado"
                          )
                          .map((proyecto) => (
                            <div
                              key={proyecto.id}
                              className="grid grid-cols-7 gap-4 p-4 items-center"
                            >
                              <div className="col-span-2">
                                <div className="font-medium">
                                  {proyecto.nombre}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {proyecto.tareasCompletadas} de{" "}
                                  {proyecto.tareas} tareas completadas
                                </div>
                              </div>
                              <div>{proyecto.cliente}</div>
                              <div>
                                <Badge
                                  variant={
                                    proyecto.estado === "En progreso"
                                      ? "default"
                                      : proyecto.estado === "Planificación"
                                      ? "secondary"
                                      : "destructive"
                                  }
                                >
                                  {proyecto.estado}
                                </Badge>
                              </div>
                              <div>{proyecto.fechaFin}</div>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={proyecto.progreso}
                                  className="h-2"
                                />
                                <span className="text-sm font-medium">
                                  {proyecto.progreso}%
                                </span>
                              </div>
                              <div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Acciones</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Editar proyecto
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Ver tareas
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      Eliminar proyecto
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="completados" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Proyectos Completados</CardTitle>
                    <CardDescription>Proyectos finalizados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                        <div className="col-span-2">Proyecto</div>
                        <div>Cliente</div>
                        <div>Estado</div>
                        <div>Fecha Finalización</div>
                        <div>Presupuesto</div>
                        <div>Acciones</div>
                      </div>
                      <div className="divide-y">
                        {proyectos
                          .filter(
                            (proyecto) => proyecto.estado === "Completado"
                          )
                          .map((proyecto) => (
                            <div
                              key={proyecto.id}
                              className="grid grid-cols-7 gap-4 p-4 items-center"
                            >
                              <div className="col-span-2">
                                <div className="font-medium">
                                  {proyecto.nombre}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {proyecto.tareasCompletadas} de{" "}
                                  {proyecto.tareas} tareas completadas
                                </div>
                              </div>
                              <div>{proyecto.cliente}</div>
                              <div>
                                <Badge variant="outline">
                                  {proyecto.estado}
                                </Badge>
                              </div>
                              <div>{proyecto.fechaFin}</div>
                              <div>{proyecto.presupuesto}</div>
                              <div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Acciones</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Duplicar proyecto
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Generar informe
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      Archivar proyecto
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

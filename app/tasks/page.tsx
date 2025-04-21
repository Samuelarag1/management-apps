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
import { Search, Plus, MoreHorizontal, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function TareasPage() {
  const tareas = [
    {
      id: 1,
      nombre: "Diseñar página de inicio",
      proyecto: "Rediseño Web",
      cliente: "Acme Inc",
      prioridad: "Alta",
      estado: "Pendiente",
      fechaLimite: "10 Mayo 2025",
      asignado: "Juan Pérez",
    },
    {
      id: 2,
      nombre: "Implementar autenticación",
      proyecto: "App Móvil",
      cliente: "TechCorp",
      prioridad: "Media",
      estado: "En progreso",
      fechaLimite: "15 Mayo 2025",
      asignado: "Juan Pérez",
    },
    {
      id: 3,
      nombre: "Crear contenido para redes",
      proyecto: "Campaña Marketing",
      cliente: "GlobalBiz",
      prioridad: "Alta",
      estado: "Pendiente",
      fechaLimite: "8 Mayo 2025",
      asignado: "Juan Pérez",
    },
    {
      id: 4,
      nombre: "Configurar pasarela de pago",
      proyecto: "Tienda Online",
      cliente: "LocalShop",
      prioridad: "Alta",
      estado: "En progreso",
      fechaLimite: "5 Mayo 2025",
      asignado: "Juan Pérez",
    },
    {
      id: 5,
      nombre: "Optimizar SEO",
      proyecto: "Rediseño Web",
      cliente: "Acme Inc",
      prioridad: "Media",
      estado: "Completada",
      fechaLimite: "2 Mayo 2025",
      asignado: "Juan Pérez",
    },
    {
      id: 6,
      nombre: "Diseñar logo",
      proyecto: "Identidad Corporativa",
      cliente: "Innovate Labs",
      prioridad: "Baja",
      estado: "Completada",
      fechaLimite: "28 Abril 2025",
      asignado: "Juan Pérez",
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
                <h1 className="text-2xl font-bold tracking-tight">Tareas</h1>
                <p className="text-muted-foreground">
                  Gestiona tus tareas y actividades
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar tarea..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-[200px] lg:w-[300px]"
                  />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Tarea
                </Button>
              </div>
            </div>

            <Tabs defaultValue="todas" className="mt-6">
              <TabsList>
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
                <TabsTrigger value="completadas">Completadas</TabsTrigger>
              </TabsList>
              <TabsContent value="todas" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Todas las Tareas</CardTitle>
                    <CardDescription>
                      Lista de todas tus tareas y su estado actual
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                        <div className="col-span-2">Tarea</div>
                        <div>Proyecto</div>
                        <div>Prioridad</div>
                        <div>Fecha Límite</div>
                        <div>Estado</div>
                        <div>Acciones</div>
                      </div>
                      <div className="divide-y">
                        {tareas.map((tarea) => (
                          <div
                            key={tarea.id}
                            className="grid grid-cols-7 gap-4 p-4 items-center"
                          >
                            <div className="col-span-2 flex items-start gap-2">
                              <Checkbox
                                id={`task-${tarea.id}`}
                                checked={tarea.estado === "Completada"}
                              />
                              <div>
                                <label
                                  htmlFor={`task-${tarea.id}`}
                                  className={`font-medium ${
                                    tarea.estado === "Completada"
                                      ? "line-through text-muted-foreground"
                                      : ""
                                  }`}
                                >
                                  {tarea.nombre}
                                </label>
                                <div className="text-sm text-muted-foreground">
                                  {tarea.cliente}
                                </div>
                              </div>
                            </div>
                            <div>{tarea.proyecto}</div>
                            <div>
                              <Badge
                                variant={
                                  tarea.prioridad === "Alta"
                                    ? "destructive"
                                    : tarea.prioridad === "Media"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {tarea.prioridad}
                              </Badge>
                            </div>
                            <div>{tarea.fechaLimite}</div>
                            <div>
                              <Badge
                                variant={
                                  tarea.estado === "Completada"
                                    ? "outline"
                                    : tarea.estado === "En progreso"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {tarea.estado}
                              </Badge>
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
                                    Editar tarea
                                  </DropdownMenuItem>
                                  {tarea.estado !== "Completada" && (
                                    <DropdownMenuItem>
                                      <CheckCircle2 className="mr-2 h-4 w-4" />
                                      Marcar como completada
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Eliminar tarea
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
              <TabsContent value="pendientes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tareas Pendientes</CardTitle>
                    <CardDescription>
                      Tareas que requieren tu atención
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                        <div className="col-span-2">Tarea</div>
                        <div>Proyecto</div>
                        <div>Prioridad</div>
                        <div>Fecha Límite</div>
                        <div>Estado</div>
                        <div>Acciones</div>
                      </div>
                      <div className="divide-y">
                        {tareas
                          .filter((tarea) => tarea.estado !== "Completada")
                          .map((tarea) => (
                            <div
                              key={tarea.id}
                              className="grid grid-cols-7 gap-4 p-4 items-center"
                            >
                              <div className="col-span-2 flex items-start gap-2">
                                <Checkbox id={`pending-task-${tarea.id}`} />
                                <div>
                                  <label
                                    htmlFor={`pending-task-${tarea.id}`}
                                    className="font-medium"
                                  >
                                    {tarea.nombre}
                                  </label>
                                  <div className="text-sm text-muted-foreground">
                                    {tarea.cliente}
                                  </div>
                                </div>
                              </div>
                              <div>{tarea.proyecto}</div>
                              <div>
                                <Badge
                                  variant={
                                    tarea.prioridad === "Alta"
                                      ? "destructive"
                                      : tarea.prioridad === "Media"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {tarea.prioridad}
                                </Badge>
                              </div>
                              <div>{tarea.fechaLimite}</div>
                              <div>
                                <Badge
                                  variant={
                                    tarea.estado === "En progreso"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {tarea.estado}
                                </Badge>
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
                                      Editar tarea
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <CheckCircle2 className="mr-2 h-4 w-4" />
                                      Marcar como completada
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      Eliminar tarea
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
              <TabsContent value="completadas" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tareas Completadas</CardTitle>
                    <CardDescription>Tareas que has finalizado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                        <div className="col-span-2">Tarea</div>
                        <div>Proyecto</div>
                        <div>Prioridad</div>
                        <div>Fecha Completada</div>
                        <div>Estado</div>
                        <div>Acciones</div>
                      </div>
                      <div className="divide-y">
                        {tareas
                          .filter((tarea) => tarea.estado === "Completada")
                          .map((tarea) => (
                            <div
                              key={tarea.id}
                              className="grid grid-cols-7 gap-4 p-4 items-center"
                            >
                              <div className="col-span-2 flex items-start gap-2">
                                <Checkbox
                                  id={`completed-task-${tarea.id}`}
                                  checked
                                />
                                <div>
                                  <label
                                    htmlFor={`completed-task-${tarea.id}`}
                                    className="font-medium line-through text-muted-foreground"
                                  >
                                    {tarea.nombre}
                                  </label>
                                  <div className="text-sm text-muted-foreground">
                                    {tarea.cliente}
                                  </div>
                                </div>
                              </div>
                              <div>{tarea.proyecto}</div>
                              <div>
                                <Badge
                                  variant={
                                    tarea.prioridad === "Alta"
                                      ? "destructive"
                                      : tarea.prioridad === "Media"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {tarea.prioridad}
                                </Badge>
                              </div>
                              <div>{tarea.fechaLimite}</div>
                              <div>
                                <Badge variant="outline">{tarea.estado}</Badge>
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
                                      Reabrir tarea
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      Eliminar tarea
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

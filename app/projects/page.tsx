"use client";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCardList from "./components/projectCards";
import { useEffect, useState } from "react";
import IMProjects from "@/Models/Projects";

export default function ProyectosPage() {
  const [projects, setProjects] = useState<IMProjects[]>();

  //   {
  //     id: 1,
  //     nombre: "Rediseño Web",
  //     cliente: "Acme Inc",
  //     estado: "En progreso",
  //     fechaInicio: "01 Abril 2025",
  //     fechaFin: "15 Mayo 2025",
  //     progreso: 65,
  //     presupuesto: "$3,500",
  //     tareas: 12,
  //     tareasCompletadas: 8,
  //   },
  //   {
  //     id: 2,
  //     nombre: "App Móvil",
  //     cliente: "TechCorp",
  //     estado: "Planificación",
  //     fechaInicio: "15 Abril 2025",
  //     fechaFin: "30 Junio 2025",
  //     progreso: 25,
  //     presupuesto: "$8,000",
  //     tareas: 20,
  //     tareasCompletadas: 5,
  //   },
  //   {
  //     id: 3,
  //     nombre: "Campaña Marketing",
  //     cliente: "GlobalBiz",
  //     estado: "En progreso",
  //     fechaInicio: "10 Abril 2025",
  //     fechaFin: "22 Mayo 2025",
  //     progreso: 50,
  //     presupuesto: "$2,500",
  //     tareas: 15,
  //     tareasCompletadas: 7,
  //   },
  //   {
  //     id: 4,
  //     nombre: "Tienda Online",
  //     cliente: "LocalShop",
  //     estado: "Revisión",
  //     fechaInicio: "05 Abril 2025",
  //     fechaFin: "10 Mayo 2025",
  //     progreso: 90,
  //     presupuesto: "$4,200",
  //     tareas: 18,
  //     tareasCompletadas: 16,
  //   },
  //   {
  //     id: 5,
  //     nombre: "Identidad Corporativa",
  //     cliente: "Innovate Labs",
  //     estado: "Completado",
  //     fechaInicio: "01 Marzo 2025",
  //     fechaFin: "30 Marzo 2025",
  //     progreso: 100,
  //     presupuesto: "$1,800",
  //     tareas: 10,
  //     tareasCompletadas: 10,
  //   },
  // ];

  useEffect(() => {
    fetch("api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  console.log(projects);
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
              <TabsContent value="todos">
                <ProjectCardList
                  titulo="Todos los Proyectos"
                  descripcion="Lista de todos tus proyectos y su estado actual"
                  proyectos={projects!}
                  key={0}
                />
              </TabsContent>
              <TabsContent value="activos">
                <ProjectCardList
                  titulo="Proyectos Activos"
                  descripcion="Proyectos en curso y planificación"
                  proyectos={[]}
                  key={1}
                />
              </TabsContent>
              <TabsContent value="completados">
                <ProjectCardList
                  titulo="Proyectos Completados"
                  descripcion="Proyectos finalizados"
                  proyectos={[]}
                  key={2}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

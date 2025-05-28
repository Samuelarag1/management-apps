"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCardList from "./components/projectCards";
import { useEffect, useState } from "react";
import IMProjects from "@/Models/Projects";
import { ModalProjects } from "./components/createProject";

export default function ProyectosPage() {
  const [projects, setProjects] = useState<IMProjects[]>();

  useEffect(() => {
    fetch("api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

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
              <ModalProjects />
            </div>

            <Tabs defaultValue="todos" className="mt-6">
              <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="activos">Activos</TabsTrigger>
                <TabsTrigger value="completados">Completados</TabsTrigger>
                <TabsTrigger value="discontinuados">Discontinuados</TabsTrigger>
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

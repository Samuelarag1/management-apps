"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCardList from "./components/projectCards";
import { useEffect, useState } from "react";
import IMProjects from "@/Models/Projects";
import { ProjectModal } from "./components/projectModal";

export default function ProyectosPage() {
  const [projects, setProjects] = useState<IMProjects[]>();
  const [projectDetail, setProjectDetail] = useState<IMProjects>();

  useEffect(() => {
    fetch("api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const deleteProject = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setProjects((prev) => prev?.filter((p) => p.id !== projectId.toString()));
    } else {
      console.error("Error al eliminar el proyecto");
    }
  };
  const handleViewDetails = async (id: string) => {
    await fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProjectDetail(data));

    console.log(projectDetail);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pb-16 lg:pb-0">
            <div className="container mx-auto p-4 md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    Proyectos
                  </h1>
                  <p className="text-muted-foreground">
                    Gestiona tus proyectos y su progreso
                  </p>
                </div>
                <ProjectModal
                  projectDetail={projectDetail}
                  setProjectDetail={setProjectDetail}
                />
              </div>
              <Button
                className="flex items-center gap-2"
                onClick={() => setIsCreating(true)}
              >
                <Plus className="h-4 w-4" />
                Nuevo Proyecto
              </Button>

              <Tabs defaultValue="todos" className="mt-6">
                <TabsList>
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="activos">Activos</TabsTrigger>
                  <TabsTrigger value="completados">Completados</TabsTrigger>
                  <TabsTrigger value="descontinuados">
                    Descontinuados
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="todos">
                  <ProjectCardList
                    titulo="Todos los Proyectos"
                    descripcion="Lista de todos tus proyectos y su estado actual"
                    proyectos={projects!}
                    onDelete={deleteProject}
                    onViewProject={handleViewDetails}
                  />
                </TabsContent>
                <TabsContent value="activos">
                  <ProjectCardList
                    titulo="Todos los Proyectos"
                    descripcion="Lista de todos tus proyectos y su estado actual"
                    proyectos={projects!}
                    onDelete={deleteProject}
                    onViewProject={handleViewDetails}
                  />
                </TabsContent>
                <TabsContent value="completados">
                  <ProjectCardList
                    titulo="Todos los Proyectos"
                    descripcion="Lista de todos tus proyectos y su estado actual"
                    proyectos={projects!}
                    onDelete={deleteProject}
                    onViewProject={handleViewDetails}
                  />
                </TabsContent>
                <TabsContent value="descontinuados">
                  <ProjectCardList
                    titulo="Todos los Proyectos"
                    descripcion="Lista de todos tus proyectos y su estado actual"
                    proyectos={projects!}
                    onDelete={deleteProject}
                    onViewProject={handleViewDetails}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
      <ProjectModal
        projectDetail={projectDetail}
        setProjectDetail={setProjectDetail}
      />
    </>
  );
}

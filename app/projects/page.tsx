"use client";

import { fetchJson } from "@/lib/api-client";
import type { ProjectRecord } from "@/types/entities";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCardList from "./components/projectCards";
import { useEffect, useState } from "react";
import { ProjectModal } from "./components/projectModal";
import { ModalProjects } from "./components/createProject";
import { toast } from "sonner";

export default function ProyectosPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [projectDetail, setProjectDetail] = useState<ProjectRecord>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const data = await fetchJson<ProjectRecord[]>("/api/projects");

        if (!cancelled) {
          setProjects(data);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar los proyectos"
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const deleteProject = async (projectId: string) => {
    try {
      await fetchJson<{ message: string }>(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      setProjectDetail((prev) => (prev?.id === projectId ? undefined : prev));
      toast.success("Proyecto eliminado correctamente");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el proyecto"
      );
    }
  };

  const handleCreatedProject = (project: ProjectRecord) => {
    setProjects((prev) => [project, ...prev]);
  };

  const activeProjects = projects.filter((project) => project.status === "activo");
  const completedProjects = projects.filter(
    (project) => project.status === "completo"
  );
  const discontinuedProjects = projects.filter(
    (project) => project.status === "descontinuado"
  );

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
                <ModalProjects onCreated={handleCreatedProject} />
              </div>

              <Tabs defaultValue="todos" className="mt-6">
                <TabsList>
                  <TabsTrigger value="todos">
                    Todos ({projects.length})
                  </TabsTrigger>
                  <TabsTrigger value="activos">
                    Activos ({activeProjects.length})
                  </TabsTrigger>
                  <TabsTrigger value="completados">
                    Completados ({completedProjects.length})
                  </TabsTrigger>
                  <TabsTrigger value="descontinuados">
                    Descontinuados ({discontinuedProjects.length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="todos">
                  <ProjectCardList
                    titulo="Todos los proyectos"
                    descripcion={
                      isLoading
                        ? "Cargando proyectos..."
                        : "Lista completa de proyectos y su estado actual."
                    }
                    proyectos={projects}
                    onDelete={deleteProject}
                    onViewProject={(id) =>
                      setProjectDetail(
                        projects.find((project) => project.id === id)
                      )
                    }
                  />
                </TabsContent>
                <TabsContent value="activos">
                  <ProjectCardList
                    titulo="Proyectos activos"
                    descripcion="Trabajo en curso y próximos vencimientos."
                    proyectos={activeProjects}
                    onDelete={deleteProject}
                    onViewProject={(id) =>
                      setProjectDetail(
                        projects.find((project) => project.id === id)
                      )
                    }
                  />
                </TabsContent>
                <TabsContent value="completados">
                  <ProjectCardList
                    titulo="Proyectos completados"
                    descripcion="Historial de entregas finalizadas."
                    proyectos={completedProjects}
                    onDelete={deleteProject}
                    onViewProject={(id) =>
                      setProjectDetail(
                        projects.find((project) => project.id === id)
                      )
                    }
                  />
                </TabsContent>
                <TabsContent value="descontinuados">
                  <ProjectCardList
                    titulo="Proyectos descontinuados"
                    descripcion="Proyectos pausados o cerrados sin continuidad."
                    proyectos={discontinuedProjects}
                    onDelete={deleteProject}
                    onViewProject={(id) =>
                      setProjectDetail(
                        projects.find((project) => project.id === id)
                      )
                    }
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
        onDelete={deleteProject}
      />
    </>
  );
}

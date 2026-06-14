"use client";

import { createClient } from "@/lib/supabase/client";
import type { ProjectRecord } from "@/types/entities";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCardList from "./components/projectCards";
import { useEffect, useState } from "react";
import { ProjectModal } from "./components/projectModal";
import { ModalProjects } from "./components/createProject";
import { EditProject } from "./components/editProject";
import { toast } from "sonner";

export default function ProyectosPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [projectDetail, setProjectDetail] = useState<ProjectRecord>();
  const [editingProject, setEditingProject] = useState<ProjectRecord>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("projects")
          .select("*, clients(id, name, alias)")
          .order("created_at", { ascending: false });

        if (error) throw error;

        type RawProject = {
            id: string; created_at: string; user_id: string; client_id: string | null;
            name: string; description: string | null; price: number | null; status: string;
            initial_date: string | null; finish_date: string | null; pre_payment: number | null;
            hosting: string | null; domain: string | null; cloud_storage: boolean;
            cloud_storage_date: string | null;
            clients: { id: string; name: string; alias: string } | null;
          };
          if (!cancelled) {
          setProjects(
            ((data ?? []) as unknown as RawProject[]).map((p) => ({
              ...p,
              status: p.status as ProjectRecord["status"],
              client: p.clients
                ? { id: p.clients.id, name: p.clients.name, alias: p.clients.alias }
                : null,
            }))
          );
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
        if (!cancelled) setIsLoading(false);
      }
    }

    loadProjects();
    return () => { cancelled = true; };
  }, []);

  const deleteProject = async (projectId: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);
      if (error) throw error;

      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setProjectDetail((prev) => (prev?.id === projectId ? undefined : prev));
      toast.success("Proyecto eliminado correctamente");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo eliminar el proyecto"
      );
    }
  };

  const handleCreatedProject = (project: ProjectRecord) => {
    setProjects((prev) => [project, ...prev]);
  };

  const handleUpdatedProject = (updated: ProjectRecord) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setProjectDetail((prev) => (prev?.id === updated.id ? updated : prev));
    setEditingProject(undefined);
  };

  const openEdit = (id: string) => {
    setEditingProject(projects.find((p) => p.id === id));
  };

  const activeProjects = projects.filter((p) => p.status === "activo");
  const completedProjects = projects.filter((p) => p.status === "completo");
  const discontinuedProjects = projects.filter((p) => p.status === "descontinuado");

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
                <div className="overflow-x-auto pb-1">
                  <TabsList className="w-max">
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
                </div>
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
                    onViewProject={(id) => setProjectDetail(projects.find((p) => p.id === id))}
                    onEditProject={openEdit}
                  />
                </TabsContent>
                <TabsContent value="activos">
                  <ProjectCardList
                    titulo="Proyectos activos"
                    descripcion="Trabajo en curso y próximos vencimientos."
                    proyectos={activeProjects}
                    onDelete={deleteProject}
                    onViewProject={(id) => setProjectDetail(projects.find((p) => p.id === id))}
                    onEditProject={openEdit}
                  />
                </TabsContent>
                <TabsContent value="completados">
                  <ProjectCardList
                    titulo="Proyectos completados"
                    descripcion="Historial de entregas finalizadas."
                    proyectos={completedProjects}
                    onDelete={deleteProject}
                    onViewProject={(id) => setProjectDetail(projects.find((p) => p.id === id))}
                    onEditProject={openEdit}
                  />
                </TabsContent>
                <TabsContent value="descontinuados">
                  <ProjectCardList
                    titulo="Proyectos descontinuados"
                    descripcion="Proyectos pausados o cerrados sin continuidad."
                    proyectos={discontinuedProjects}
                    onDelete={deleteProject}
                    onViewProject={(id) => setProjectDetail(projects.find((p) => p.id === id))}
                    onEditProject={openEdit}
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
        onEdit={(p) => {
          setProjectDetail(undefined);
          setEditingProject(p);
        }}
      />
      <EditProject
        project={editingProject}
        open={!!editingProject}
        onOpenChange={(open) => { if (!open) setEditingProject(undefined); }}
        onUpdated={handleUpdatedProject}
      />
    </>
  );
}

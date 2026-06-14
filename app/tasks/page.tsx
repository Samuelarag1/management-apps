"use client";

import { createClient } from "@/lib/supabase/client";
import type { TaskRecord, TaskPriority, TaskStatus } from "@/types/entities";
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
import { Search, MoreHorizontal, CheckCircle2 } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { CreateTask } from "./components/createTask";
import { useDeferredValue, useEffect, useState } from "react";
import { toast } from "sonner";

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
  urgente: "Urgente",
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  pendiente: "Pendiente",
  en_progreso: "En progreso",
  completada: "Completada",
};

function priorityVariant(priority: TaskPriority) {
  if (priority === "alta" || priority === "urgente") return "destructive";
  if (priority === "media") return "default";
  return "secondary";
}

function statusVariant(status: TaskStatus) {
  if (status === "completada") return "outline";
  if (status === "en_progreso") return "default";
  return "secondary";
}

function TaskRow({
  task,
  onToggle,
  onDelete,
}: {
  task: TaskRecord;
  onToggle: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}) {
  const isCompleted = task.status === "completada";

  return (
    <div className="grid grid-cols-7 gap-4 p-4 items-center">
      <div className="col-span-2 flex items-start gap-2">
        <Checkbox
          id={`task-${task.id}`}
          checked={isCompleted}
          onCheckedChange={() =>
            onToggle(task.id, isCompleted ? "pendiente" : "completada")
          }
        />
        <div>
          <label
            htmlFor={`task-${task.id}`}
            className={`font-medium cursor-pointer ${
              isCompleted ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </label>
          <div className="text-sm text-muted-foreground">
            {task.clients?.alias ?? "Sin cliente"}
          </div>
        </div>
      </div>
      <div className="text-sm">{task.projects?.name ?? "—"}</div>
      <div>
        <Badge variant={priorityVariant(task.priority)}>
          {PRIORITY_LABELS[task.priority]}
        </Badge>
      </div>
      <div className="text-sm">
        {task.due_date
          ? new Date(task.due_date + "T00:00:00").toLocaleDateString("es-AR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "—"}
      </div>
      <div>
        <Badge variant={statusVariant(task.status)}>
          {STATUS_LABELS[task.status]}
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
            {!isCompleted && (
              <DropdownMenuItem
                onClick={() => onToggle(task.id, "completada")}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Marcar como completada
              </DropdownMenuItem>
            )}
            {isCompleted && (
              <DropdownMenuItem onClick={() => onToggle(task.id, "pendiente")}>
                Reabrir tarea
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(task.id)}
            >
              Eliminar tarea
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function TaskTable({
  title,
  description,
  tasks,
  onToggle,
  onDelete,
  isLoading,
}: {
  title: string;
  description: string;
  tasks: TaskRecord[];
  onToggle: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay tareas aquí.</p>
        ) : (
          <div className="rounded-md border">
            <div className="grid grid-cols-7 gap-4 p-4 font-medium text-sm text-muted-foreground">
              <div className="col-span-2">Tarea</div>
              <div>Proyecto</div>
              <div>Prioridad</div>
              <div>Fecha Límite</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>
            <div className="divide-y">
              {tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function TareasPage() {
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadTasks() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("tasks")
          .select("*, projects(name), clients(name, alias)")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!cancelled) setTasks((data ?? []) as TaskRecord[]);
      } catch (error) {
        if (!cancelled)
          toast.error(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar las tareas"
          );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadTasks();
    return () => { cancelled = true; };
  }, []);

  const handleToggle = async (id: string, newStatus: TaskStatus) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("tasks")
        .update({ status: newStatus })
        .eq("id", id);
      if (error) throw error;
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo actualizar la tarea"
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Tarea eliminada");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo eliminar la tarea"
      );
    }
  };

  const handleCreated = (task: TaskRecord) => {
    setTasks((prev) => [task, ...prev]);
  };

  const filtered = tasks.filter((t) => {
    const q = deferredSearch.trim().toLowerCase();
    if (!q) return true;
    return [t.title, t.projects?.name ?? "", t.clients?.alias ?? ""].some(
      (v) => v.toLowerCase().includes(q)
    );
  });

  const pending = filtered.filter((t) => t.status !== "completada");
  const completed = filtered.filter((t) => t.status === "completada");

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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-[200px] lg:w-[300px]"
                  />
                </div>
                <CreateTask onCreated={handleCreated} />
              </div>
            </div>

            <Tabs defaultValue="todas" className="mt-6">
              <TabsList>
                <TabsTrigger value="todas">
                  Todas ({filtered.length})
                </TabsTrigger>
                <TabsTrigger value="pendientes">
                  Pendientes ({pending.length})
                </TabsTrigger>
                <TabsTrigger value="completadas">
                  Completadas ({completed.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="todas" className="space-y-4">
                <TaskTable
                  title="Todas las Tareas"
                  description="Lista de todas tus tareas y su estado actual"
                  tasks={filtered}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="pendientes" className="space-y-4">
                <TaskTable
                  title="Tareas Pendientes"
                  description="Tareas que requieren tu atención"
                  tasks={pending}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="completadas" className="space-y-4">
                <TaskTable
                  title="Tareas Completadas"
                  description="Tareas que has finalizado"
                  tasks={completed}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  isLoading={isLoading}
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

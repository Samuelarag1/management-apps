"use client";

import { createClient } from "@/lib/supabase/client";
import type { ClientRecord, ProjectRecord, TaskRecord } from "@/types/entities";
import SpinnerOverlay from "@/components/spinner-overlay";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface TaskFormValues {
  title: string;
  description: string;
  status: "pendiente" | "en_progreso" | "completada";
  priority: "baja" | "media" | "alta" | "urgente";
  due_date: string;
  project_id: string;
  client_id: string;
}

const defaultValues: TaskFormValues = {
  title: "",
  description: "",
  status: "pendiente",
  priority: "media",
  due_date: "",
  project_id: "",
  client_id: "",
};

interface CreateTaskProps {
  onCreated: (task: TaskRecord) => void;
}

export function CreateTask({ onCreated }: CreateTaskProps) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<TaskFormValues>({ defaultValues });

  useEffect(() => {
    if (!open) return;

    const supabase = createClient();
    Promise.all([
      supabase.from("projects").select("id, name, status, description, price, pre_payment, finish_date, initial_date, hosting, domain, cloud_storage, cloud_storage_date, client_id, clients(id, name, alias)").order("name"),
      supabase.from("clients").select("id, name, alias, email, status, phone_number, location, projects(id, name, status, finish_date)").order("name"),
    ]).then(([{ data: p }, { data: c }]) => {
      type RawProj = {
        id: string; name: string; description: string | null; price: number | null;
        status: string; pre_payment: number | null; finish_date: string | null;
        initial_date: string | null; hosting: string | null; domain: string | null;
        cloud_storage: boolean; cloud_storage_date: string | null; client_id: string | null;
        clients: { id: string; name: string; alias: string } | null;
      };
      setProjects(
        ((p ?? []) as unknown as RawProj[]).map((proj) => ({
          ...proj,
          status: proj.status as ProjectRecord["status"],
          client: proj.clients
            ? { id: proj.clients.id, name: proj.clients.name, alias: proj.clients.alias }
            : null,
        }))
      );
      setClients((c ?? []) as ClientRecord[]);
    });
  }, [open]);

  const onSubmit: SubmitHandler<TaskFormValues> = async (data) => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");

      const { data: task, error } = await supabase
        .from("tasks")
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description || null,
          status: data.status,
          priority: data.priority,
          due_date: data.due_date || null,
          project_id: data.project_id || null,
          client_id: data.client_id || null,
        })
        .select("*, projects(name), clients(name, alias)")
        .single();

      if (error) throw error;

      onCreated(task as TaskRecord);
      toast.success("Tarea creada exitosamente");
      setOpen(false);
      reset(defaultValues);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al crear la tarea"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(defaultValues); }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Tarea
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        {isSubmitting ? <SpinnerOverlay /> : null}
        <DialogHeader>
          <DialogTitle>Nueva tarea</DialogTitle>
          <DialogDescription>
            Registra los detalles de la tarea a realizar.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Descripción breve de la tarea"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Prioridad</Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="en_progreso">En progreso</SelectItem>
                      <SelectItem value="completada">Completada</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="due_date">Fecha límite</Label>
            <Input id="due_date" type="date" {...register("due_date")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Proyecto</Label>
              <Controller
                name="project_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sin proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Controller
                name="client_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sin cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.alias}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Detalles adicionales de la tarea..."
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear tarea"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

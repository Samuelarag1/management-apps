"use client";

import { createClient } from "@/lib/supabase/client";
import type { ClientRecord, WorkItemRecord, WorkItemStatus } from "@/types/entities";
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
import { Controller, type Control, type UseFormRegister, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface WorkFormValues {
  title: string;
  description: string;
  amount: number;
  hours: string;
  work_date: string;
  status: WorkItemStatus;
  project_id: string;
  client_id: string;
}

type RawProj = { id: string; name: string; client_id: string | null };

const today = new Date().toISOString().split("T")[0];

const defaultValues: WorkFormValues = {
  title: "",
  description: "",
  amount: 0,
  hours: "",
  work_date: today,
  status: "completado",
  project_id: "",
  client_id: "",
};

// ─── Shared form fields ──────────────────────────────────────────────────────

function WorkFormFields({
  register,
  control,
  clients,
  projects,
  isSubmitting,
  submitLabel,
  onSubmit,
}: {
  register: UseFormRegister<WorkFormValues>;
  control: Control<WorkFormValues>;
  clients: ClientRecord[];
  projects: RawProj[];
  isSubmitting: boolean;
  submitLabel: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form className="grid gap-4 py-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="wf-title">Descripción del trabajo</Label>
        <Input
          id="wf-title"
          {...register("title")}
          placeholder="Ej: Actualización de WordPress + plugins"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="wf-amount">Monto cobrado</Label>
          <Input
            id="wf-amount"
            type="number"
            min="0"
            step="0.01"
            {...register("amount", { valueAsNumber: true })}
            placeholder="0.00"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wf-hours">Horas trabajadas</Label>
          <Input
            id="wf-hours"
            type="number"
            min="0"
            step="0.5"
            {...register("hours")}
            placeholder="Ej: 2.5"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="wf-work_date">Fecha</Label>
          <Input id="wf-work_date" type="date" {...register("work_date")} required />
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
                  <SelectItem value="completado">Completado</SelectItem>
                  <SelectItem value="facturado">Facturado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="wf-description">Notas</Label>
        <Textarea
          id="wf-description"
          {...register("description")}
          placeholder="Detalles del trabajo realizado..."
          rows={2}
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Guardando..." : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}

// ─── Create ──────────────────────────────────────────────────────────────────

interface CreateWorkItemProps {
  onCreated: (item: WorkItemRecord) => void;
}

export function CreateWorkItem({ onCreated }: CreateWorkItemProps) {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [projects, setProjects] = useState<RawProj[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<WorkFormValues>({ defaultValues });

  const watchedProjectId = watch("project_id");

  useEffect(() => {
    if (!watchedProjectId) return;
    const proj = projects.find((p) => p.id === watchedProjectId);
    if (proj?.client_id) setValue("client_id", proj.client_id);
  }, [watchedProjectId, projects, setValue]);

  useEffect(() => {
    if (!open) return;
    const supabase = createClient();
    Promise.all([
      supabase
        .from("clients")
        .select("id, name, alias, email, status, phone_number, location, projects(id, name, status, finish_date)")
        .order("name"),
      supabase.from("projects").select("id, name, client_id").order("name"),
    ]).then(([{ data: c }, { data: p }]) => {
      setClients((c ?? []) as ClientRecord[]);
      setProjects((p ?? []) as RawProj[]);
    });
  }, [open]);

  const onSubmit: SubmitHandler<WorkFormValues> = async (data) => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: item, error } = await (supabase as any)
        .from("work_items")
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description || null,
          amount: Number(data.amount),
          hours: data.hours ? Number(data.hours) : null,
          work_date: data.work_date,
          status: data.status,
          project_id: data.project_id || null,
          client_id: data.client_id || null,
        })
        .select("*, clients(name, alias), projects(name)")
        .single();

      if (error) throw error;

      onCreated(item as WorkItemRecord);
      toast.success("Trabajo registrado");
      setOpen(false);
      reset(defaultValues);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al registrar el trabajo"
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset(defaultValues);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo trabajo
        </Button>
      </DialogTrigger>
      <DialogContent>
        {isSubmitting ? <SpinnerOverlay /> : null}
        <DialogHeader>
          <DialogTitle>Registrar trabajo</DialogTitle>
          <DialogDescription>
            Anotá un trabajo puntual realizado para un proyecto o cliente.
          </DialogDescription>
        </DialogHeader>
        <WorkFormFields
          register={register}
          control={control}
          clients={clients}
          projects={projects}
          isSubmitting={isSubmitting}
          submitLabel="Registrar trabajo"
          onSubmit={handleSubmit(onSubmit)}
        />
      </DialogContent>
    </Dialog>
  );
}

// ─── Edit ─────────────────────────────────────────────────────────────────────

interface EditWorkItemProps {
  item: WorkItemRecord | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (item: WorkItemRecord) => void;
}

function toFormValues(item: WorkItemRecord): WorkFormValues {
  return {
    title: item.title,
    description: item.description ?? "",
    amount: item.amount,
    hours: item.hours != null ? String(item.hours) : "",
    work_date: item.work_date,
    status: item.status,
    project_id: item.project_id ?? "",
    client_id: item.client_id ?? "",
  };
}

export function EditWorkItem({
  item,
  open,
  onOpenChange,
  onUpdated,
}: EditWorkItemProps) {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [projects, setProjects] = useState<RawProj[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<WorkFormValues>({ defaultValues });

  const watchedProjectId = watch("project_id");

  useEffect(() => {
    if (!watchedProjectId) return;
    const proj = projects.find((p) => p.id === watchedProjectId);
    if (proj?.client_id) setValue("client_id", proj.client_id);
  }, [watchedProjectId, projects, setValue]);

  useEffect(() => {
    if (!open || !item) return;
    reset(toFormValues(item));
    const supabase = createClient();
    Promise.all([
      supabase
        .from("clients")
        .select("id, name, alias, email, status, phone_number, location, projects(id, name, status, finish_date)")
        .order("name"),
      supabase.from("projects").select("id, name, client_id").order("name"),
    ]).then(([{ data: c }, { data: p }]) => {
      setClients((c ?? []) as ClientRecord[]);
      setProjects((p ?? []) as RawProj[]);
    });
  }, [open, item, reset]);

  const onSubmit: SubmitHandler<WorkFormValues> = async (data) => {
    if (!item) return;
    try {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: updated, error } = await (supabase as any)
        .from("work_items")
        .update({
          title: data.title,
          description: data.description || null,
          amount: Number(data.amount),
          hours: data.hours ? Number(data.hours) : null,
          work_date: data.work_date,
          status: data.status,
          project_id: data.project_id || null,
          client_id: data.client_id || null,
        })
        .eq("id", item.id)
        .select("*, clients(name, alias), projects(name)")
        .single();

      if (error) throw error;

      onUpdated(updated as WorkItemRecord);
      toast.success("Trabajo actualizado");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al actualizar"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {isSubmitting ? <SpinnerOverlay /> : null}
        <DialogHeader>
          <DialogTitle>Editar trabajo</DialogTitle>
          <DialogDescription>{item?.title}</DialogDescription>
        </DialogHeader>
        <WorkFormFields
          register={register}
          control={control}
          clients={clients}
          projects={projects}
          isSubmitting={isSubmitting}
          submitLabel="Guardar cambios"
          onSubmit={handleSubmit(onSubmit)}
        />
      </DialogContent>
    </Dialog>
  );
}

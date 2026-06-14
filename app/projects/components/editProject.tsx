"use client";

import { createClient } from "@/lib/supabase/client";
import type { ClientRecord, ProjectRecord } from "@/types/entities";
import SpinnerOverlay from "@/components/spinner-overlay";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProjectFormValues {
  name: string;
  price: number;
  description: string;
  pre_payment: string;
  finish_date: string;
  status: "activo" | "completo" | "descontinuado";
  initial_date: string;
  hosting: string;
  domain: string;
  cloud_storage: boolean;
  cloud_storage_date: string;
  client_id: string;
}

interface EditProjectProps {
  project: ProjectRecord | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (project: ProjectRecord) => void;
}

function toFormValues(p: ProjectRecord): ProjectFormValues {
  return {
    name: p.name,
    price: p.price ?? 0,
    description: p.description ?? "",
    pre_payment: p.pre_payment != null ? String(p.pre_payment) : "",
    finish_date: p.finish_date ?? "",
    status: p.status ?? "activo",
    initial_date: p.initial_date ?? "",
    hosting: p.hosting ?? "",
    domain: p.domain ?? "",
    cloud_storage: p.cloud_storage ?? false,
    cloud_storage_date: p.cloud_storage_date ?? "",
    client_id: p.client_id ?? "",
  };
}

export function EditProject({ project, open, onOpenChange, onUpdated }: EditProjectProps) {
  const [step, setStep] = useState(1);
  const [clients, setClients] = useState<ClientRecord[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<ProjectFormValues>({
    defaultValues: project ? toFormValues(project) : undefined,
  });

  useEffect(() => {
    if (!open || !project) return;
    reset(toFormValues(project));
    setStep(1);

    const supabase = createClient();
    supabase
      .from("clients")
      .select("id, name, alias, email, status, phone_number, location, projects(id, name, status, finish_date)")
      .order("name")
      .then(({ data }) => setClients((data ?? []) as ClientRecord[]));
  }, [open, project, reset]);

  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    if (!project) return;
    try {
      const supabase = createClient();

      const { data: updated, error } = await supabase
        .from("projects")
        .update({
          name: data.name,
          price: data.price || null,
          description: data.description || null,
          pre_payment: data.pre_payment ? Number(data.pre_payment) : null,
          finish_date: data.finish_date || null,
          status: data.status,
          initial_date: data.initial_date || null,
          hosting: data.hosting || null,
          domain: data.domain || null,
          cloud_storage: data.cloud_storage,
          cloud_storage_date: data.cloud_storage_date || null,
          client_id: data.client_id || null,
        })
        .eq("id", project.id)
        .select("*, clients(id, name, alias)")
        .single();

      if (error) throw error;

      type RawProject = {
        id: string; created_at: string; user_id: string; client_id: string | null;
        name: string; description: string | null; price: number | null; status: string;
        initial_date: string | null; finish_date: string | null; pre_payment: number | null;
        hosting: string | null; domain: string | null; cloud_storage: boolean;
        cloud_storage_date: string | null;
        clients: { id: string; name: string; alias: string } | null;
      };
      const raw = updated as unknown as RawProject;
      const projectRecord: ProjectRecord = {
        ...raw,
        status: raw.status as ProjectRecord["status"],
        client: raw.clients
          ? { id: raw.clients.id, name: raw.clients.name, alias: raw.clients.alias }
          : null,
      };

      onUpdated(projectRecord);
      toast.success("Proyecto actualizado");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al actualizar el proyecto"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        {isSubmitting ? <SpinnerOverlay /> : null}
        <DialogHeader>
          <DialogTitle>Editar proyecto</DialogTitle>
          <DialogDescription>
            {project?.name} — Paso {step} de 2
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre del proyecto</Label>
                <Input id="edit-name" {...register("name")} required />
              </div>
              <div className="space-y-2">
                <Label>Cliente</Label>
                <Controller
                  name="client_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <SelectTrigger><SelectValue placeholder="Selecciona un cliente" /></SelectTrigger>
                      <SelectContent>
                        {clients.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.alias}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Precio total</Label>
                  <Input id="edit-price" type="number" min="0" step="0.01" {...register("price", { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-pre_payment">Pago anticipado</Label>
                  <Input id="edit-pre_payment" type="number" min="0" step="0.01" {...register("pre_payment")} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-initial_date">Inicio</Label>
                  <Input id="edit-initial_date" type="date" {...register("initial_date")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-finish_date">Entrega</Label>
                  <Input id="edit-finish_date" type="date" {...register("finish_date")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="completo">Completo</SelectItem>
                        <SelectItem value="descontinuado">Descontinuado</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-domain">Vto. dominio</Label>
                  <Input id="edit-domain" type="date" {...register("domain")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-hosting">Vto. hosting</Label>
                  <Input id="edit-hosting" type="date" {...register("hosting")} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Cloud storage</Label>
                  <Controller
                    name="cloud_storage"
                    control={control}
                    render={({ field }) => (
                      <div className="flex h-10 items-center rounded-md border px-3">
                        <Switch checked={field.value} onCheckedChange={field.onChange} aria-label="Cloud storage" />
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-cloud_storage_date">Vto. cloud</Label>
                  <Input id="edit-cloud_storage_date" type="date" {...register("cloud_storage_date")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea id="edit-description" {...register("description")} placeholder="Describe el objetivo y alcance del proyecto" />
              </div>
            </>
          )}

          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            {step > 1 ? (
              <Button variant="outline" type="button" onClick={() => setStep(1)}>
                Atrás
              </Button>
            ) : (
              <div />
            )}
            {step < 2 ? (
              <Button type="button" onClick={() => setStep(2)}>
                Siguiente
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

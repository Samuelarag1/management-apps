"use client";

import { createClient } from "@/lib/supabase/client";
import type { ClientRecord, MaintenanceRecord } from "@/types/entities";
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
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface MaintenanceFormValues {
  name: string;
  amount: number;
  billing_day: number;
  status: "activo" | "pausado" | "cancelado";
  start_date: string;
  client_id: string;
  project_id: string;
  notes: string;
}

type RawProj = { id: string; name: string; client_id: string | null };

interface EditMaintenanceProps {
  maintenance: MaintenanceRecord | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (maintenance: MaintenanceRecord) => void;
}

function toFormValues(m: MaintenanceRecord): MaintenanceFormValues {
  return {
    name: m.name,
    amount: m.amount,
    billing_day: m.billing_day,
    status: m.status,
    start_date: m.start_date,
    client_id: m.client_id ?? "",
    project_id: m.project_id ?? "",
    notes: m.notes ?? "",
  };
}

export function EditMaintenance({ maintenance, open, onOpenChange, onUpdated }: EditMaintenanceProps) {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [projects, setProjects] = useState<RawProj[]>([]);

  const { register, handleSubmit, reset, control, setValue, watch, formState: { isSubmitting } } =
    useForm<MaintenanceFormValues>();

  const watchedProjectId = watch("project_id");

  // Auto-fill client when project changes
  useEffect(() => {
    if (!watchedProjectId) return;
    const proj = projects.find((p) => p.id === watchedProjectId);
    if (proj?.client_id) setValue("client_id", proj.client_id);
  }, [watchedProjectId, projects, setValue]);

  useEffect(() => {
    if (!open || !maintenance) return;
    reset(toFormValues(maintenance));

    const supabase = createClient();
    Promise.all([
      supabase.from("clients").select("id, name, alias, email, status, phone_number, location, projects(id, name, status, finish_date)").order("name"),
      supabase.from("projects").select("id, name, client_id").order("name"),
    ]).then(([{ data: c }, { data: p }]) => {
      setClients((c ?? []) as ClientRecord[]);
      setProjects((p ?? []) as RawProj[]);
    });
  }, [open, maintenance, reset]);

  const onSubmit: SubmitHandler<MaintenanceFormValues> = async (data) => {
    if (!maintenance) return;
    try {
      const supabase = createClient();
      const { data: updated, error } = await supabase
        .from("maintenances")
        .update({
          name: data.name,
          amount: Number(data.amount),
          billing_day: Number(data.billing_day),
          status: data.status,
          start_date: data.start_date,
          client_id: data.client_id || null,
          project_id: data.project_id || null,
          notes: data.notes || null,
        })
        .eq("id", maintenance.id)
        .select("*, clients(name, alias), projects(name)")
        .single();

      if (error) throw error;

      onUpdated(updated as MaintenanceRecord);
      toast.success("Mantenimiento actualizado");
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al actualizar el mantenimiento");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        {isSubmitting ? <SpinnerOverlay /> : null}
        <DialogHeader>
          <DialogTitle>Editar mantenimiento</DialogTitle>
          <DialogDescription>{maintenance?.name}</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="em-name">Nombre del servicio</Label>
            <Input id="em-name" {...register("name")} required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="em-amount">Monto mensual</Label>
              <Input id="em-amount" type="number" min="0" step="0.01" {...register("amount", { valueAsNumber: true })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="em-billing_day">Día de cobro</Label>
              <Input id="em-billing_day" type="number" min="1" max="31" {...register("billing_day", { valueAsNumber: true })} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Estado</Label>
              <Controller name="status" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="pausado">Pausado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              )} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="em-start_date">Fecha de inicio</Label>
              <Input id="em-start_date" type="date" {...register("start_date")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Proyecto</Label>
            <Controller name="project_id" control={control} render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger><SelectValue placeholder="Sin proyecto" /></SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </div>

          <div className="space-y-2">
            <Label>Cliente</Label>
            <Controller name="client_id" control={control} render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger><SelectValue placeholder="Sin cliente" /></SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.alias}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="em-notes">Notas</Label>
            <Textarea id="em-notes" {...register("notes")} rows={2} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

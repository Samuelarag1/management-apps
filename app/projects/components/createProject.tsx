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

interface ModalProjectsProps {
  onCreated?: (project: ProjectRecord) => void;
}

const defaultValues: ProjectFormValues = {
  name: "",
  price: 0,
  description: "",
  pre_payment: "",
  finish_date: "",
  status: "activo",
  initial_date: "",
  hosting: "",
  domain: "",
  cloud_storage: false,
  cloud_storage_date: "",
  client_id: "",
};

export function ModalProjects({ onCreated }: ModalProjectsProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<ProjectFormValues>({ defaultValues });

  useEffect(() => {
    let cancelled = false;

    async function loadClients() {
      if (!open) return;
      try {
        setIsLoadingClients(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from("clients")
          .select("id, name, alias, email, status, phone_number, location, projects(id, name, status, finish_date)")
          .order("name");
        if (error) throw error;
        if (!cancelled) setClients((data ?? []) as ClientRecord[]);
      } catch (error) {
        if (!cancelled)
          toast.error(
            error instanceof Error ? error.message : "No se pudieron cargar los clientes"
          );
      } finally {
        if (!cancelled) setIsLoadingClients(false);
      }
    }

    loadClients();
    return () => { cancelled = true; };
  }, [open]);

  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");

      const { data: project, error } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
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
      const rawProject = project as unknown as RawProject;
      const selectedClient = clients.find((c) => c.id === data.client_id);
      const projectRecord: ProjectRecord = {
        ...rawProject,
        status: rawProject.status as ProjectRecord["status"],
        client: selectedClient
          ? { id: selectedClient.id, name: selectedClient.name, alias: selectedClient.alias }
          : null,
      };

      onCreated?.(projectRecord);
      toast.success("Proyecto creado exitosamente");
      setOpen(false);
      setStep(1);
      reset(defaultValues);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al crear el proyecto"
      );
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setStep(1);
      reset(defaultValues);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Nuevo proyecto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        {isSubmitting ? <SpinnerOverlay /> : null}
        <DialogHeader>
          <DialogTitle>Nuevo proyecto</DialogTitle>
          <DialogDescription>
            Registra los datos principales y técnicos del proyecto.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del proyecto</Label>
                <Input id="name" {...register("name")} placeholder="Nombre del proyecto" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client_id">Cliente</Label>
                <Controller
                  name="client_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingClients ? "Cargando..." : "Selecciona un cliente"} />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.alias}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio total</Label>
                  <Input id="price" {...register("price", { valueAsNumber: true })} type="number" min="0" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pre_payment">Pago anticipado</Label>
                  <Input id="pre_payment" {...register("pre_payment")} type="number" min="0" step="0.01" placeholder="0.00" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="initial_date">Inicio</Label>
                  <Input id="initial_date" type="date" {...register("initial_date")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finish_date">Entrega</Label>
                  <Input id="finish_date" type="date" {...register("finish_date")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
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
                  <Label htmlFor="domain">Vto. dominio</Label>
                  <Input id="domain" type="date" {...register("domain")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hosting">Vto. hosting</Label>
                  <Input id="hosting" type="date" {...register("hosting")} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cloud_storage">Cloud storage</Label>
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
                  <Label htmlFor="cloud_storage_date">Vto. cloud</Label>
                  <Input id="cloud_storage_date" type="date" {...register("cloud_storage_date")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" {...register("description")} placeholder="Describe el objetivo y alcance del proyecto" />
              </div>
            </>
          )}

          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                type="button"
                onClick={() => setStep(1)}
              >
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
                {isSubmitting ? "Creando..." : "Crear proyecto"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

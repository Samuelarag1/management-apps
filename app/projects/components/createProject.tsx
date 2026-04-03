"use client";

import { fetchJson } from "@/lib/api-client";
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
  pre_payment?: string;
  finish_date: string;
  status: "activo" | "completo" | "descontinuado";
  initial_date: string;
  hosting: string;
  domain: string;
  cloud_storage: boolean;
  cloud_storage_date: string;
  clientsId: number | null;
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
  clientsId: null,
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
  } = useForm<ProjectFormValues>({
    defaultValues,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadClients() {
      if (!open) {
        return;
      }

      try {
        setIsLoadingClients(true);
        const data = await fetchJson<ClientRecord[]>("/api/clients");

        if (!cancelled) {
          setClients(data);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar los clientes"
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingClients(false);
        }
      }
    }

    loadClients();

    return () => {
      cancelled = true;
    };
  }, [open]);

  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    try {
      const project = await fetchJson<ProjectRecord>("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      onCreated?.(project);
      toast.success("Proyecto creado exitosamente");
      setOpen(false);
      setStep(1);
      reset(defaultValues);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al agregar el proyecto"
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Nombre del proyecto"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input
                    id="price"
                    {...register("price", { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="initial_date">Fecha de inicio</Label>
                  <Input
                    id="initial_date"
                    type="date"
                    {...register("initial_date")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finish_date">Fecha de entrega</Label>
                  <Input
                    id="finish_date"
                    type="date"
                    {...register("finish_date")}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pre_payment">Pago anticipado</Label>
                  <Input
                    id="pre_payment"
                    {...register("pre_payment")}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="activo">Activo</SelectItem>
                          <SelectItem value="completo">Completo</SelectItem>
                          <SelectItem value="descontinuado">
                            Descontinuado
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hosting">Renovación de hosting</Label>
                  <Input id="hosting" type="date" {...register("hosting")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Renovación de dominio</Label>
                  <Input id="domain" type="date" {...register("domain")} />
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
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Cloud storage"
                        />
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cloud_storage_date">
                    Renovación de cloud
                  </Label>
                  <Input
                    id="cloud_storage_date"
                    type="date"
                    {...register("cloud_storage_date")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientsId">Cliente relacionado</Label>
                <Controller
                  name="clientsId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value ? Number(value) : null)
                      }
                      value={field.value?.toString() ?? ""}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingClients
                              ? "Cargando clientes..."
                              : "Selecciona un cliente"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem
                            key={client.id}
                            value={client.id.toString()}
                          >
                            {client.alias}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe el objetivo y alcance del proyecto"
                />
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

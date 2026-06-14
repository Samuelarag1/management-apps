"use client";

import { createClient } from "@/lib/supabase/client";
import type { ClientRecord } from "@/types/entities";
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
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ClientFormValues {
  name: string;
  alias: string;
  email: string;
  phone_number: string;
  location: string;
  status: string;
}

interface EditClientProps {
  client: ClientRecord | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (client: ClientRecord) => void;
}

function toFormValues(c: ClientRecord): ClientFormValues {
  return {
    name: c.name,
    alias: c.alias,
    email: c.email ?? "",
    phone_number: c.phone_number ?? "",
    location: c.location ?? "",
    status: c.status,
  };
}

export function EditClient({ client, open, onOpenChange, onUpdated }: EditClientProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<ClientFormValues>();

  useEffect(() => {
    if (open && client) reset(toFormValues(client));
  }, [open, client, reset]);

  const onSubmit: SubmitHandler<ClientFormValues> = async (data) => {
    if (!client) return;
    try {
      const supabase = createClient();
      const { data: updated, error } = await supabase
        .from("clients")
        .update({
          name: data.name,
          alias: data.alias,
          email: data.email || null,
          phone_number: data.phone_number || null,
          location: data.location || null,
          status: data.status,
        })
        .eq("id", client.id)
        .select("*, projects(id, name, status, finish_date)")
        .single();

      if (error) throw error;

      onUpdated(updated as ClientRecord);
      toast.success("Cliente actualizado");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al actualizar el cliente"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        {isSubmitting ? <SpinnerOverlay /> : null}
        <DialogHeader>
          <DialogTitle>Editar cliente</DialogTitle>
          <DialogDescription>{client?.alias}</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ec-name">Nombre</Label>
              <Input id="ec-name" {...register("name")} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ec-alias">Empresa</Label>
              <Input id="ec-alias" {...register("alias")} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ec-email">Email</Label>
            <Input id="ec-email" type="email" {...register("email")} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ec-phone">Teléfono</Label>
              <Input id="ec-phone" {...register("phone_number")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ec-location">Ubicación</Label>
              <Input id="ec-location" {...register("location")} />
            </div>
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
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
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

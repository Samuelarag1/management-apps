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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ModalClientsProps {
  title: string;
  onCreated?: (client: ClientRecord) => void;
}

interface ClientFormValues {
  name: string;
  alias: string;
  email: string;
  phone_number: string;
  location: string;
}

const defaultValues: ClientFormValues = {
  name: "",
  alias: "",
  email: "",
  phone_number: "",
  location: "",
};

export function ModalClients({ title, onCreated }: ModalClientsProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ClientFormValues>({ defaultValues });

  const onSubmit: SubmitHandler<ClientFormValues> = async (data) => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");

      const { data: client, error } = await supabase
        .from("clients")
        .insert({
          user_id: user.id,
          name: data.name,
          alias: data.alias,
          email: data.email || null,
          phone_number: data.phone_number || null,
          location: data.location || null,
        })
        .select("*, projects(id, name, status, finish_date)")
        .single();

      if (error) throw error;

      onCreated?.(client as ClientRecord);
      toast.success("Cliente creado exitosamente");
      setOpen(false);
      reset(defaultValues);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al agregar el cliente"
      );
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) reset(defaultValues);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogContent>
        {isSubmitting ? <SpinnerOverlay /> : null}
        <DialogHeader>
          <DialogTitle>Nuevo cliente</DialogTitle>
          <DialogDescription>
            Completa la información principal para registrar un cliente nuevo.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" {...register("name")} placeholder="Samuel Aragon" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alias">Empresa / alias</Label>
            <Input id="alias" {...register("alias")} placeholder="SamaragTech" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} type="email" placeholder="email@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number">Teléfono</Label>
              <Input id="phone_number" {...register("phone_number")} placeholder="+54 9 11..." />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input id="location" {...register("location")} placeholder="Córdoba, Argentina" />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Guardando..." : "Crear cliente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

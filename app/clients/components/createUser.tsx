"use client";
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
import IMProjects from "@/Models/Projects";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IModalProps {
  title: string;
  isCreating: boolean;
}

interface IFormInput {
  name: string;
  alias: string;
  email: string;
  phone_number: string;
  location: string;
  projects?: IMProjects[];
}

export function ModalClients({ title, isCreating }: IModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error en el servidor");

      toast.success("Cliente creado exitosamente");
      setOpen(false);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar nuevo cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">{title}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {loading && <SpinnerOverlay />}
          <DialogHeader>
            <DialogTitle>
              {isCreating ? "Nuevo cliente" : "Editar cliente"}
            </DialogTitle>
            <DialogDescription>
              {isCreating
                ? "Rellena los campos con la información necesaria"
                : "Edita los campos necesarios y no te olvides de guardar!"}
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                {...register("name")}
                placeholder="Samuel Aragon"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alias" className="text-right">
                Nombre de la Empresa
              </Label>
              <Input
                {...register("alias")}
                placeholder="SamaragTech"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                {...register("email")}
                placeholder="email@email.com"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone_number" className="text-right">
                Número de teléfono
              </Label>
              <Input
                {...register("phone_number")}
                placeholder="123-456-789"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Ubicación
              </Label>
              <Input
                {...register("location")}
                placeholder="Córdoba, Argentina"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Proyectos</Label>
              <div className="w-full col-span-3">
                <p className="text-sm font-light">No hay proyectos asignados</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {isCreating ? "Crear cliente" : "Guardar cambios"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {loading ? <SpinnerOverlay /> : null}
    </>
  );
}

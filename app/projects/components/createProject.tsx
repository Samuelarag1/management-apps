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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import IMClients from "@/Models/Clients";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IFormInput {
  name: string;
  price: number;
  description: string;
  pre_payment?: string;
  finish_date: string;
  status?: string;
  initial_date: string;
  hosting: string;
  domain: string;
  cloud_storage?: boolean;
  cloud_storage_date?: string;
  clientsId: number;
  Clients?: IMClients;
}

export function ModalProjects() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [clients, setClients] = useState<IMClients[]>();
  const { register, handleSubmit, watch, reset, control } =
    useForm<IFormInput>();
  const [step, setStep] = useState(1);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error en el servidor");

      toast.success("Proyecto creado exitosamente");
      setOpen(false);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar nuevo proyecto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Nuevo proyecto</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {loading && <SpinnerOverlay />}
          <DialogHeader>
            <DialogTitle>Nuevo proyecto</DialogTitle>
            <DialogDescription>
              Rellena los campos con la información necesaria
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col items-start gap-2 w-40">
                    <Label htmlFor="name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      {...register("name")}
                      placeholder="Nombre del proyecto"
                      className="text-xs"
                      required
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-40">
                    <Label htmlFor="price" className="text-right ml-2">
                      Precio
                    </Label>
                    <Input
                      {...register("price")}
                      type="number"
                      placeholder="$$$"
                      required
                      className="text-xs"
                    />
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col items-start gap-2 w-40">
                    <Label htmlFor="initial_date" className="text-right">
                      Fecha de inicio
                    </Label>
                    <Input
                      type="date"
                      {...register("initial_date")}
                      required
                      className="text-xs"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-40">
                    <Label htmlFor="finish_date" className="text-right">
                      Fecha de entrega
                    </Label>
                    <Input
                      type="date"
                      {...register("finish_date")}
                      className="text-xs"
                      required
                    />
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col items-start gap-2 w-40">
                    <Label htmlFor="pre_payment" className="text-right ml-2">
                      Pago anticipado
                    </Label>
                    <Input
                      {...register("pre_payment")}
                      placeholder="$$$"
                      className="text-xs"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-40">
                    <Label htmlFor="status" className="text-right">
                      Estado
                    </Label>
                    <Controller
                      name="status"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Activo</SelectItem>
                            <SelectItem value="complete">Completado</SelectItem>
                            <SelectItem value="discontinued">
                              Discontinuado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col items-start gap-2 w-40">
                    <Label htmlFor="hosting" className="text-right">
                      Renovacion de hosting
                    </Label>
                    <Input
                      type="date"
                      {...register("hosting")}
                      className="text-xs"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-40">
                    <Label htmlFor="domain" className="text-right">
                      Renovacion de Dominio
                    </Label>
                    <Input
                      type="date"
                      {...register("domain")}
                      className="text-xs"
                    />
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col items-start justify-center gap-2 w-40 h-12">
                    <Label htmlFor="name" className="text-right">
                      Cloud Storage
                    </Label>
                    <Switch {...register("name")} />
                  </div>
                  <div className="flex flex-col items-start gap-2 w-40">
                    <Label htmlFor="pre_payment" className="text-right ml-2">
                      Usuario Relacionado
                    </Label>
                    <Controller
                      name="clientsId"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString() ?? ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Cliente" />
                          </SelectTrigger>
                          <SelectContent>
                            {clients?.map((client) => (
                              <SelectItem
                                key={client.id}
                                value={client.id.toString()}
                              >
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <Label htmlFor="description" className="text-right">
                    Descripcion
                  </Label>
                  <Textarea {...register("description")} />
                </div>
              </>
            )}

            <DialogFooter className="flex justify-between pt-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setStep(step - 1)}
                >
                  Atrás
                </Button>
              )}
              {step < 2 && (
                <Button type="button" onClick={() => setStep(step + 1)}>
                  Siguiente
                </Button>
              )}
              {step === 2 && (
                <Button type="submit" disabled={loading}>
                  Crear proyecto
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {loading ? <SpinnerOverlay /> : null}
    </>
  );
}

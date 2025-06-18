import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import IMProjects from "@/Models/Projects";
import { daysUntilNextYear, formatDate } from "@/utils/dateUtils";
import { formatPrice } from "@/utils/numberUtils";
import { LucidePencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProjectModalProps {
  projectDetail: IMProjects | undefined;
  setProjectDetail: (project: IMProjects | undefined) => void;
  isCreating?: boolean;
  setIsCreating?: (value: boolean) => void;
}

interface IFormInput {
  name: string;
  price: number;
  description: string | null;
  pre_payment: number | null;
  finish_date: Date | null;
  status: "activo" | "completo" | "descontinuado";
  initial_date: Date | null;
  hosting: Date | null;
  domain: Date | null;
  cloud_storage: boolean;
  cloud_storage_date: Date | null;
  clientsId: number | null;
}

export function ProjectModal({
  projectDetail,
  setProjectDetail,
  isCreating = false,
  setIsCreating = () => {},
}: ProjectModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        if (isCreating) {
          setIsCreating(false);
        } else {
          setProjectDetail(undefined);
        }
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isCreating) {
          setIsCreating(false);
        } else {
          setProjectDetail(undefined);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setProjectDetail, isCreating, setIsCreating]);

  const onSubmit = async (data: IFormInput) => {
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
      setIsCreating(false);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el proyecto");
    } finally {
      setLoading(false);
    }
  };

  if (!projectDetail && !isCreating) return null;

  if (isCreating) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        <div ref={cardRef}>
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Nuevo Proyecto</CardTitle>
              <CardDescription>
                Ingresa los datos del nuevo proyecto
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Proyecto</Label>
                  <Input
                    {...register("name")}
                    id="name"
                    placeholder="Mi Proyecto"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    {...register("description")}
                    id="description"
                    placeholder="Describe tu proyecto..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input
                    {...register("price", { valueAsNumber: true })}
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pre_payment">Pago Inicial</Label>
                  <Input
                    {...register("pre_payment", { valueAsNumber: true })}
                    id="pre_payment"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finish_date">Fecha de Entrega</Label>
                  <Input
                    {...register("finish_date")}
                    id="finish_date"
                    type="datetime-local"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initial_date">Fecha de Inicio</Label>
                  <Input
                    {...register("initial_date")}
                    id="initial_date"
                    type="datetime-local"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hosting">Fecha de Hosting</Label>
                  <Input
                    {...register("hosting")}
                    id="hosting"
                    type="datetime-local"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Fecha de Dominio</Label>
                  <Input
                    {...register("domain")}
                    id="domain"
                    type="datetime-local"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cloud_storage">Almacenamiento en la nube</Label>
                  <Input
                    {...register("cloud_storage")}
                    id="cloud_storage"
                    type="checkbox"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cloud_storage_date">Fecha de Almacenamiento</Label>
                  <Input
                    {...register("cloud_storage_date")}
                    id="cloud_storage_date"
                    type="datetime-local"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientsId">ID del Cliente</Label>
                  <Input
                    {...register("clientsId", { valueAsNumber: true })}
                    id="clientsId"
                    type="number"
                    placeholder="ID del cliente"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  Crear Proyecto
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div ref={cardRef}>
        <Card className="w-96">
          <CardHeader className="font-bold">
            Detalle de {projectDetail?.name}
            <CardDescription className="font-semibold">
              <p>{projectDetail?.description}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge
              className={`${
                projectDetail?.status === "completo"
                  ? "bg-green-800 text-white"
                  : projectDetail?.status === "activo"
                  ? "default"
                  : projectDetail?.status === "descontinuado"
                  ? "destructive"
                  : "default"
              } m-2 `}
            >
              {projectDetail?.status && (
                projectDetail.status[0].toLocaleUpperCase() +
                projectDetail.status.slice(1)
              )}
            </Badge>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Nombre del cliente:</p>
              <p className="text-sm font-semibold">
                {projectDetail?.client?.name}
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Entrega:</p>
              <p className="text-sm font-semibold">
                {projectDetail?.finish_date}
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Renovacion de Dominio:</p>
              <p className="text-sm font-semibold">
                {projectDetail?.domain}
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Renovacion de Hosting:</p>
              <p className="text-sm font-semibold">
                {projectDetail?.hosting}
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Almacenamiento en la nube:</p>
              <p className="text-sm font-semibold">
                {projectDetail?.cloud_storage === false ? "No" : "Si"}
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Pago anticipado:</p>
              <div className="flex items-center">
                <p className="text-sm font-semibold">
                  {projectDetail?.pre_payment}
                </p>
              </div>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Precio:</p>
              <div className="flex items-center">
                <p className="text-sm font-semibold">
                  {projectDetail?.price}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="bg-blue-400 hover:bg-blue-500">
              <Link href="/tasks">Tareas</Link>
            </Button>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-800">
                <LucidePencil />
              </Button>
              <Button variant={"destructive"}>
                <Trash2 />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

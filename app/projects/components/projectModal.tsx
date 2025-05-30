import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import IMProjects from "@/Models/Projects";
import { daysUntilNextYear, formatDate } from "@/utils/dateUtils";
import { formatPrice } from "@/utils/numberUtils";
import { LucidePencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ProjectModalProps {
  projectDetail: IMProjects | undefined;
  setProjectDetail: (client: IMProjects | undefined) => void;
}

export function ProjectModal({
  projectDetail,
  setProjectDetail,
}: ProjectModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setProjectDetail(undefined);
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProjectDetail(undefined);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setProjectDetail]);

  if (!projectDetail) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div ref={cardRef}>
        <Card className="w-96">
          <CardHeader className="font-bold">
            Detalle de {projectDetail.name}
            <CardDescription className="font-semibold">
              <p>{projectDetail.description}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge
              className={`${
                projectDetail.status === "completo"
                  ? "bg-green-800 text-white"
                  : projectDetail.status === "activo"
                  ? "default"
                  : projectDetail.status === "descontinuado"
                  ? "destructive"
                  : "default"
              } m-2 `}
            >
              {projectDetail.status[0]?.toLocaleUpperCase() +
                projectDetail.status.slice(1)}
            </Badge>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Nombre del cliente:</p>
              <p className="text-sm font-semibold">
                {projectDetail.client?.name}
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Entrega:</p>
              <p className="text-sm font-semibold">
                {formatDate(projectDetail.finish_date)}
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Renovacion de Dominio:</p>
              <p className="text-sm font-semibold">
                en {daysUntilNextYear(projectDetail.domain)} dias
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Renovacion de Hosting:</p>
              <p className="text-sm font-semibold">
                en {daysUntilNextYear(projectDetail.hosting)} dias
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Almacenamiento en la nube:</p>
              <p className="text-sm font-semibold">
                {projectDetail.cloud_storage === false ? "No" : "Si"}
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Pago anticipado:</p>

              <div className="flex items-center">
                <p className="text-sm font-semibold">
                  {formatPrice(Number(projectDetail.pre_payment))}
                </p>
              </div>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Precio:</p>

              <div className="flex items-center">
                <p className="text-sm font-semibold">
                  {formatPrice(projectDetail.price)}
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

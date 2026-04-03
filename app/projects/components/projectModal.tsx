"use client";

import { getProjectStatusClassName, getProjectStatusLabel } from "@/lib/status";
import type { ProjectRecord } from "@/types/entities";
import { formatDate } from "@/utils/dateUtils";
import { formatPrice } from "@/utils/numberUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { LucidePencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface ProjectModalProps {
  projectDetail: ProjectRecord | undefined;
  setProjectDetail: (project: ProjectRecord | undefined) => void;
  onDelete?: (projectId: string) => Promise<void>;
}

export function ProjectModal({
  projectDetail,
  setProjectDetail,
  onDelete,
}: ProjectModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  if (!projectDetail) {
    return null;
  }

  const handleDelete = async () => {
    if (!onDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(projectDetail.id);
      setProjectDetail(undefined);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div ref={cardRef}>
        <Card className="w-full max-w-md">
          <CardHeader className="font-bold">
            Detalle de {projectDetail.name}
            <CardDescription className="font-normal">
              {projectDetail.description ?? "Sin descripción"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge className={getProjectStatusClassName(projectDetail.status)}>
              {getProjectStatusLabel(projectDetail.status)}
            </Badge>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Cliente:</p>
              <p className="text-sm font-semibold">
                {projectDetail.client?.alias ?? projectDetail.client?.name ?? "-"}
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Inicio:</p>
              <p className="text-sm font-semibold">
                {formatDate(projectDetail.initial_date)}
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Entrega:</p>
              <p className="text-sm font-semibold">
                {formatDate(projectDetail.finish_date)}
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Dominio:</p>
              <p className="text-sm font-semibold">
                {formatDate(projectDetail.domain)}
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Hosting:</p>
              <p className="text-sm font-semibold">
                {formatDate(projectDetail.hosting)}
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Cloud storage:</p>
              <p className="text-sm font-semibold">
                {projectDetail.cloud_storage ? "Sí" : "No"}
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Pago anticipado:</p>
              <p className="text-sm font-semibold">
                {formatPrice(projectDetail.pre_payment)}
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Precio:</p>
              <p className="text-sm font-semibold">
                {formatPrice(projectDetail.price)}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <Link href="/tasks">Tareas</Link>
            </Button>
            <div className="flex gap-2">
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                size="icon"
                disabled
              >
                <LucidePencil />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

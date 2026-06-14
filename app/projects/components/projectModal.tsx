"use client";

import { getProjectStatusClassName, getProjectStatusLabel } from "@/lib/status";
import type { ProjectRecord } from "@/types/entities";
import { formatDate } from "@/utils/dateUtils";
import { formatPrice } from "@/utils/numberUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { LucidePencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface ProjectModalProps {
  projectDetail: ProjectRecord | undefined;
  setProjectDetail: (project: ProjectRecord | undefined) => void;
  onDelete?: (projectId: string) => Promise<void>;
  onEdit?: (project: ProjectRecord) => void;
}

export function ProjectModal({
  projectDetail,
  setProjectDetail,
  onDelete,
  onEdit,
}: ProjectModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete || !projectDetail) return;
    try {
      setIsDeleting(true);
      await onDelete(projectDetail.id);
      setProjectDetail(undefined);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={!!projectDetail}
      onOpenChange={(open) => { if (!open) setProjectDetail(undefined); }}
    >
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>{projectDetail?.name}</DialogTitle>
          <DialogDescription>
            {projectDetail?.description ?? "Sin descripción"}
          </DialogDescription>
        </DialogHeader>

        {projectDetail && (
          <div className="space-y-3 text-sm">
            <div>
              <Badge className={getProjectStatusClassName(projectDetail.status)}>
                {getProjectStatusLabel(projectDetail.status)}
              </Badge>
            </div>
            <Separator />
            <Row label="Cliente">
              {projectDetail.client?.alias ?? projectDetail.client?.name ?? "—"}
            </Row>
            <Separator />
            <Row label="Inicio">{formatDate(projectDetail.initial_date)}</Row>
            <Separator />
            <Row label="Entrega">{formatDate(projectDetail.finish_date)}</Row>
            <Separator />
            <Row label="Dominio">{formatDate(projectDetail.domain)}</Row>
            <Separator />
            <Row label="Hosting">{formatDate(projectDetail.hosting)}</Row>
            <Separator />
            <Row label="Cloud storage">
              {projectDetail.cloud_storage ? "Sí" : "No"}
            </Row>
            <Separator />
            <Row label="Pago anticipado">
              {formatPrice(projectDetail.pre_payment)}
            </Row>
            <Separator />
            <Row label="Precio">{formatPrice(projectDetail.price)}</Row>

            <div className="flex justify-between pt-2">
              <div />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit?.(projectDetail)}
                >
                  <LucidePencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Eliminar</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-right">{children}</span>
    </div>
  );
}

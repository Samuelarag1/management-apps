"use client";

import { getClientStatusClassName } from "@/lib/status";
import type { ClientRecord } from "@/types/entities";
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

interface ClientModalProps {
  clientDetail: ClientRecord | undefined;
  setClientDetail: (client: ClientRecord | undefined) => void;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (client: ClientRecord) => void;
}

export function ClientModal({
  clientDetail,
  setClientDetail,
  onDelete,
  onEdit,
}: ClientModalProps) {
  return (
    <Dialog
      open={!!clientDetail}
      onOpenChange={(open) => { if (!open) setClientDetail(undefined); }}
    >
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>{clientDetail?.alias}</DialogTitle>
          <DialogDescription>{clientDetail?.name}</DialogDescription>
        </DialogHeader>

        {clientDetail && (
          <div className="space-y-3 text-sm">
            <div>
              <Badge className={getClientStatusClassName(clientDetail.status)}>
                {clientDetail.status}
              </Badge>
            </div>
            <Separator />
            <Row label="Email">{clientDetail.email ?? "—"}</Row>
            <Separator />
            <Row label="Teléfono">{clientDetail.phone_number ?? "—"}</Row>
            <Separator />
            <Row label="Ubicación">{clientDetail.location ?? "—"}</Row>
            <Separator />
            <Row label="Proyectos asociados">
              {clientDetail.projects.length}
            </Row>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit?.(clientDetail)}
              >
                <LucidePencil className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={async () => {
                  await onDelete?.(clientDetail.id);
                  setClientDetail(undefined);
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
              </Button>
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

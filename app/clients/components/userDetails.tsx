import { getClientStatusClassName } from "@/lib/status";
import type { ClientRecord } from "@/types/entities";
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
import { useEffect, useRef } from "react";

interface ClientModalProps {
  clientDetail: ClientRecord | undefined;
  setClientDetail: (client: ClientRecord | undefined) => void;
}

export function ClientModal({
  clientDetail,
  setClientDetail,
}: ClientModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setClientDetail(undefined);
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setClientDetail(undefined);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setClientDetail]);

  if (!clientDetail) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div ref={cardRef}>
        <Card className="w-full max-w-md">
          <CardHeader>
            Detalle de {clientDetail.name}
            <CardDescription>{clientDetail.alias}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Badge className={getClientStatusClassName(clientDetail.status)}>
              {clientDetail.status}
            </Badge>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Nombre:</p>
              <p className="text-sm font-semibold">{clientDetail.name}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Empresa:</p>
              <p className="text-sm font-semibold">{clientDetail.alias}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Email:</p>
              <p className="text-sm font-semibold">{clientDetail.email}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Teléfono:</p>
              <p className="text-sm font-semibold">
                {clientDetail.phone_number ?? "Sin dato"}
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Ubicación:</p>
              <p className="text-sm font-semibold">
                {clientDetail.location ?? "Sin dato"}
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between gap-4">
              <p>Proyectos asociados:</p>
              <p className="text-sm font-semibold">
                {clientDetail.projects.length}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <Link href="/projects">Ver proyectos</Link>
            </Button>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700" size="icon">
                <LucidePencil />
              </Button>
              <Button variant="destructive" size="icon">
                <Trash2 />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

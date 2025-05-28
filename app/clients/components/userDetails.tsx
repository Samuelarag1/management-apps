import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import IMClients from "@/Models/Clients";
import { LucidePencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ClientModalProps {
  clientDetail: IMClients | undefined;
  setClientDetail: (client: IMClients | undefined) => void;
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

  if (!clientDetail) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div ref={cardRef}>
        <Card className="w-96">
          <CardHeader>
            Detalle de {clientDetail.name}
            <CardDescription>
              <p>{clientDetail.alias}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge
              variant={
                clientDetail.status === "Activo"
                  ? "default"
                  : clientDetail.status === "Inactivo"
                  ? "secondary"
                  : "outline"
              }
              className="mt-0 mb-2"
            >
              {clientDetail.status}
            </Badge>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Nombre:</p>
              <p className="text-sm font-semibold">{clientDetail.name}</p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Empresa:</p>
              <p className="text-sm font-semibold">{clientDetail.alias}</p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Email:</p>
              <p className="text-sm font-semibold">{clientDetail.email}</p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Numero de telefono:</p>
              <p className="text-sm font-semibold">
                {clientDetail.phone_number}
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Ubicacion:</p>
              <p className="text-sm font-semibold">{clientDetail.location}</p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Proyectos:</p>

              <div className="flex items-center">
                <p className="text-sm font-semibold">
                  {clientDetail.projects?.length}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="bg-blue-400 hover:bg-blue-500">
              <Link href="/projects">Proyectos</Link>
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

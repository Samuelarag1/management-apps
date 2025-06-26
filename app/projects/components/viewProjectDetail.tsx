"use client";
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
import { LucidePencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ClientModalProps {
  projectDetail: IMProjects | undefined;
  setProjectDetail: (client: IMProjects | undefined) => void;
}

// ERROR: The component name started with a lowercase 'v'.
// FIX: Rename 'viewProjectDetail' to 'ViewProjectDetail'.
// Component names in React MUST start with an uppercase letter to use Hooks.
export function ViewProjectDetail({
  projectDetail,
  setProjectDetail,
}: ClientModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect handles closing the modal when clicking outside or pressing 'Escape'.
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

    // Cleanup function to remove event listeners when the component unmounts.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setProjectDetail]);

  // If there is no project detail, render nothing.
  if (!projectDetail) return null;

  return (
    // Modal container
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={cardRef}>
        <Card className="w-96">
          <CardHeader>
            Detalle de {projectDetail.name}
            <CardDescription>
              <p>Proyecto de: {projectDetail.client?.name}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge
              className={
                projectDetail.status === "completo"
                  ? "bg-green-800 text-white"
                  : projectDetail.status === "activo"
                  ? "default"
                  : projectDetail.status === "descontinuado"
                  ? "destructive"
                  : "default"
              }
            >
              {projectDetail.status &&
                projectDetail.status.charAt(0).toUpperCase() +
                  projectDetail.status.slice(1)}
            </Badge>
            <hr className="my-4" />
            <div className="flex w-full items-center justify-between">
              <p>Nombre:</p>
              <p className="text-sm font-semibold">{projectDetail.name}</p>
            </div>
            <hr className="my-4" />
            {/* <div className="flex w-full items-center justify-between">
              <p>Empresa:</p>
              <p className="text-sm font-semibold">{projectDetail.alias}</p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Email:</p>
              <p className="text-sm font-semibold">{projectDetail.email}</p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Numero de telefono:</p>
              <p className="text-sm font-semibold">
                {projectDetail.phone_number}
              </p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Ubicacion:</p>
              <p className="text-sm font-semibold">{projectDetail.location}</p>
            </div>
            <hr />
            <div className="flex w-full items-center justify-between">
              <p>Proyectos:</p>

              <div className="flex items-center">
                <p className="text-sm font-semibold">
                  {projectDetail.projects?.length}
                </p>
              </div>
            </div> */}
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

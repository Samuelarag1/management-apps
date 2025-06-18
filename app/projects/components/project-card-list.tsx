"use client";

import { Project } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardListProps {
  titulo: string;
  descripcion: string;
  proyectos: Project[];
  mostrarPresupuesto?: boolean;
  onDelete?: (id: string) => void;
}

export function ProjectCardList({
  titulo,
  descripcion,
  proyectos,
  mostrarPresupuesto = false,
  onDelete,
}: ProjectCardListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">{titulo}</CardTitle>
        <p className="text-muted-foreground text-sm">{descripcion}</p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {proyectos.map((proyecto) => (
          <ProjectCardList
            key={proyecto.id}
            proyecto={proyecto}
            mostrarPresupuesto={mostrarPresupuesto}
            onDelete={onDelete}
          />
        ))}
      </CardContent>
    </Card>
  );
}

import { getProjectStatusClassName, getProjectStatusLabel } from "@/lib/status";
import type { ProjectRecord } from "@/types/entities";
import { formatDate, daysUntilNextYear } from "@/utils/dateUtils";
import { formatPrice } from "@/utils/numberUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface ProjectCardListProps {
  titulo: string;
  descripcion: string;
  proyectos: ProjectRecord[];
  onDelete?: (id: string) => Promise<void>;
  onViewProject?: (id: string) => void;
}

function DomainRenewal({ value }: { value: ProjectRecord["domain"] }) {
  const remainingDays = daysUntilNextYear(value);

  if (!value) {
    return <span className="text-muted-foreground">Sin dominio</span>;
  }

  return (
    <div>
      <p>{formatDate(value)}</p>
      <strong>
        {remainingDays === null ? "Sin cálculo" : `Faltan ${remainingDays} días`}
      </strong>
    </div>
  );
}

const ProjectCardList = ({
  titulo,
  descripcion,
  proyectos,
  onDelete,
  onViewProject,
}: ProjectCardListProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{titulo}</CardTitle>
      <CardDescription>{descripcion}</CardDescription>
    </CardHeader>

    <CardContent>
      {proyectos.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No hay proyectos para mostrar en esta sección.
        </p>
      ) : null}

      <div className="hidden rounded-md border md:block">
        <div className="grid grid-cols-8 gap-4 p-4 font-medium">
          <div className="col-span-2">Proyecto</div>
          <div>Cliente</div>
          <div>Estado</div>
          <div>Fecha de finalización</div>
          <div>Precio final</div>
          <div>Dominio</div>
          <div>Acciones</div>
        </div>
        <div className="divide-y">
          {proyectos.map((proyecto) => (
            <div
              key={proyecto.id}
              className="grid grid-cols-8 items-center gap-4 p-4"
            >
              <div className="col-span-2 font-medium">{proyecto.name}</div>
              <div>{proyecto.client?.alias ?? proyecto.client?.name ?? "-"}</div>
              <div>
                <Badge className={getProjectStatusClassName(proyecto.status)}>
                  {getProjectStatusLabel(proyecto.status)}
                </Badge>
              </div>
              <div>{formatDate(proyecto.finish_date)}</div>
              <div>{formatPrice(proyecto.price)}</div>
              <DomainRenewal value={proyecto.domain} />
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Acciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onViewProject?.(proyecto.id)}
                    >
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>Editar proyecto</DropdownMenuItem>
                    <DropdownMenuItem disabled>Ver tareas</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => void onDelete?.(proyecto.id)}
                    >
                      Eliminar proyecto
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 md:hidden">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.id}
            className="flex flex-col gap-2 rounded-md border p-4"
          >
            <div className="text-lg font-semibold">{proyecto.name}</div>
            <div>
              <span className="font-medium">Cliente:</span>{" "}
              {proyecto.client?.alias ?? proyecto.client?.name ?? "-"}
            </div>
            <div>
              <span className="font-medium">Estado:</span>{" "}
              <Badge className={getProjectStatusClassName(proyecto.status)}>
                {getProjectStatusLabel(proyecto.status)}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Finaliza:</span>{" "}
              {formatDate(proyecto.finish_date)}
            </div>
            <div>
              <span className="font-medium">Precio:</span>{" "}
              {formatPrice(proyecto.price)}
            </div>
            <div>
              <span className="font-medium">Dominio:</span>{" "}
              <DomainRenewal value={proyecto.domain} />
            </div>
            <div className="mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Acciones
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onViewProject?.(proyecto.id)}
                  >
                    Ver detalles
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>Editar proyecto</DropdownMenuItem>
                  <DropdownMenuItem disabled>Ver tareas</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => void onDelete?.(proyecto.id)}
                  >
                    Eliminar proyecto
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ProjectCardList;

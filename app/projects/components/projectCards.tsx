import { getProjectStatusClassName, getProjectStatusLabel } from "@/lib/status";
import type { ProjectRecord } from "@/types/entities";
import { formatDate, daysUntilNextYear, nextRenewalDate } from "@/utils/dateUtils";
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
  onEditProject?: (id: string) => void;
}

function domainUrgencyClass(days: number | null): string {
  if (days === null) return "text-muted-foreground";
  if (days <= 30) return "text-destructive font-semibold";
  if (days <= 90) return "text-amber-600 dark:text-amber-400 font-medium";
  return "text-muted-foreground";
}

function DomainRenewal({ value }: { value: ProjectRecord["domain"] }) {
  if (!value) return <span className="text-muted-foreground text-xs">Sin dominio</span>;

  const days = daysUntilNextYear(value);
  const renewal = nextRenewalDate(value);
  const urgencyClass = domainUrgencyClass(days);

  return (
    <div className="text-xs leading-snug">
      <p className="text-muted-foreground">{renewal ? formatDate(renewal) : "—"}</p>
      <p className={urgencyClass}>
        {days !== null ? (days === 0 ? "¡Vence hoy!" : `${days}d`) : "—"}
      </p>
    </div>
  );
}

function ActionsDropdown({
  proyecto,
  onViewProject,
  onEditProject,
  onDelete,
}: {
  proyecto: ProjectRecord;
  onViewProject?: (id: string) => void;
  onEditProject?: (id: string) => void;
  onDelete?: (id: string) => Promise<void>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Acciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewProject?.(proyecto.id)}>
          Ver detalles
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEditProject?.(proyecto.id)}>
          Editar proyecto
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => void onDelete?.(proyecto.id)}
        >
          Eliminar proyecto
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const ProjectCardList = ({
  titulo,
  descripcion,
  proyectos,
  onDelete,
  onViewProject,
  onEditProject,
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
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden rounded-md border lg:block">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] gap-3 p-3 text-sm font-medium text-muted-foreground">
              <div>Proyecto</div>
              <div>Cliente</div>
              <div>Estado</div>
              <div>Entrega</div>
              <div>Precio</div>
              <div>Dominio</div>
              <div />
            </div>
            <div className="divide-y">
              {proyectos.map((proyecto) => (
                <div
                  key={proyecto.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-3 p-3 text-sm"
                >
                  <div className="font-medium truncate">{proyecto.name}</div>
                  <div className="text-muted-foreground truncate">
                    {proyecto.client?.alias ?? proyecto.client?.name ?? "—"}
                  </div>
                  <div>
                    <Badge className={getProjectStatusClassName(proyecto.status)}>
                      {getProjectStatusLabel(proyecto.status)}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground">{formatDate(proyecto.finish_date)}</div>
                  <div className="font-medium">{formatPrice(proyecto.price)}</div>
                  <DomainRenewal value={proyecto.domain} />
                  <ActionsDropdown
                    proyecto={proyecto}
                    onViewProject={onViewProject}
                    onEditProject={onEditProject}
                    onDelete={onDelete}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tablet — simplified table */}
          <div className="hidden rounded-md border md:block lg:hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-3 p-3 text-sm font-medium text-muted-foreground">
              <div>Proyecto</div>
              <div>Cliente</div>
              <div>Estado</div>
              <div />
            </div>
            <div className="divide-y">
              {proyectos.map((proyecto) => (
                <div
                  key={proyecto.id}
                  className="grid grid-cols-[2fr_1fr_1fr_auto] items-center gap-3 p-3 text-sm"
                >
                  <div>
                    <p className="font-medium truncate">{proyecto.name}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(proyecto.finish_date)}</p>
                  </div>
                  <div className="text-muted-foreground truncate">
                    {proyecto.client?.alias ?? "—"}
                  </div>
                  <div>
                    <Badge className={getProjectStatusClassName(proyecto.status)}>
                      {getProjectStatusLabel(proyecto.status)}
                    </Badge>
                  </div>
                  <ActionsDropdown
                    proyecto={proyecto}
                    onViewProject={onViewProject}
                    onEditProject={onEditProject}
                    onDelete={onDelete}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {proyectos.map((proyecto) => (
              <div key={proyecto.id} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold leading-tight">{proyecto.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {proyecto.client?.alias ?? proyecto.client?.name ?? "Sin cliente"}
                    </p>
                  </div>
                  <Badge className={getProjectStatusClassName(proyecto.status)}>
                    {getProjectStatusLabel(proyecto.status)}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Entrega</p>
                    <p>{formatDate(proyecto.finish_date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Precio</p>
                    <p className="font-medium">{formatPrice(proyecto.price)}</p>
                  </div>
                  {proyecto.domain && (
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground">Dominio</p>
                      <DomainRenewal value={proyecto.domain} />
                    </div>
                  )}
                </div>
                <ActionsDropdown
                  proyecto={proyecto}
                  onViewProject={onViewProject}
                  onEditProject={onEditProject}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </CardContent>
  </Card>
);

export default ProjectCardList;

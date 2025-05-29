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
import IMProjects from "@/Models/Projects";
import { MoreHorizontal } from "lucide-react";
import { formatDate, daysUntilNextYear } from "@/utils/dateUtils";
import { formatPrice } from "@/utils/numberUtils";

interface ProjectCardListProps {
  titulo: string;
  descripcion: string;
  proyectos: IMProjects[];
  mostrarPresupuesto?: boolean;
  onDelete?: (id: string) => void;
}

const ProjectCardList = ({
  titulo,
  descripcion,
  proyectos,
  mostrarPresupuesto = false,
  onDelete,
}: ProjectCardListProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{titulo}</CardTitle>
      <CardDescription>{descripcion}</CardDescription>
    </CardHeader>

    <CardContent>
      {/* Desktop Table */}
      <div className="hidden md:block rounded-md border">
        <div className="grid grid-cols-8 gap-4 p-4 font-medium">
          <div className="col-span-2">Proyecto</div>
          <div>Cliente</div>
          <div>Estado</div>
          <div>Fecha de Finalización</div>
          <div>Precio Final</div>
          <div>Dominio</div>
          <div>Acciones</div>
        </div>
        <div className="divide-y">
          {proyectos?.map((proyecto) => (
            <div
              key={proyecto.id}
              className="grid grid-cols-8 gap-4 p-4 items-center"
            >
              <div className="col-span-2 font-medium">{proyecto.name}</div>
              <div>{proyecto.Clients?.name}</div>
              <div>
                <Badge
                  className={
                    proyecto.status === "Completado"
                      ? "bg-green-800 text-white"
                      : proyecto.status === "En progreso"
                      ? "default"
                      : proyecto.status === "Planificación"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {proyecto.status}
                </Badge>
              </div>
              <div>{formatDate(proyecto.finish_date)}</div>
              <div>{formatPrice(proyecto.price)}</div>
              <div>
                <p>{formatDate(proyecto.domain)}</p>
                <strong>
                  Faltan: {daysUntilNextYear(proyecto.domain)} días
                </strong>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Acciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    {!mostrarPresupuesto ? (
                      <>
                        <DropdownMenuItem>Editar proyecto</DropdownMenuItem>
                        <DropdownMenuItem>Ver tareas</DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem>Duplicar proyecto</DropdownMenuItem>
                        <DropdownMenuItem>Generar informe</DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      {mostrarPresupuesto
                        ? "Archivar proyecto"
                        : "Eliminar proyecto"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden space-y-4">
        {proyectos?.map((proyecto) => (
          <div
            key={proyecto.id}
            className="border rounded-md p-4 flex flex-col gap-2"
          >
            <div className="text-lg font-semibold">{proyecto.name}</div>
            <div>
              <span className="font-medium">Cliente:</span>{" "}
              {proyecto.Clients?.name}
            </div>
            <div>
              <span className="font-medium">Estado:</span>{" "}
              <Badge
                className={
                  proyecto.status === "Completado"
                    ? "bg-green-800 text-white"
                    : proyecto.status === "En progreso"
                    ? "default"
                    : proyecto.status === "Planificación"
                    ? "secondary"
                    : "destructive"
                }
              >
                {proyecto.status}
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
              {formatDate(proyecto.domain)} –{" "}
              <strong>{daysUntilNextYear(proyecto.domain)} días</strong>
            </div>
            <div className="mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Acciones
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                  {!mostrarPresupuesto ? (
                    <>
                      <DropdownMenuItem>Editar proyecto</DropdownMenuItem>
                      <DropdownMenuItem>Ver tareas</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem>Duplicar proyecto</DropdownMenuItem>
                      <DropdownMenuItem>Generar informe</DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete?.(proyecto.id)}
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

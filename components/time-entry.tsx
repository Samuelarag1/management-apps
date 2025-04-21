import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export function TimeEntryList() {
  const timeEntries = [
    {
      id: 1,
      project: "Rediseño Web",
      task: "Diseño de interfaz",
      description: "Trabajando en la página de inicio",
      date: "5 Mayo 2025",
      duration: "02:30:00",
    },
    {
      id: 2,
      project: "App Móvil",
      task: "Desarrollo",
      description: "Implementación de autenticación",
      date: "5 Mayo 2025",
      duration: "01:45:00",
    },
    {
      id: 3,
      project: "Campaña Marketing",
      task: "Reunión",
      description: "Reunión con el cliente para revisar estrategia",
      date: "4 Mayo 2025",
      duration: "01:00:00",
    },
    {
      id: 4,
      project: "Rediseño Web",
      task: "Investigación",
      description: "Análisis de competencia",
      date: "3 Mayo 2025",
      duration: "03:15:00",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-6 gap-4 p-4 font-medium">
          <div className="col-span-2">Proyecto / Tarea</div>
          <div className="col-span-2">Descripción</div>
          <div>Duración</div>
          <div>Acciones</div>
        </div>
        <div className="divide-y">
          {timeEntries.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-6 gap-4 p-4 items-center"
            >
              <div className="col-span-2">
                <div className="font-medium">{entry.project}</div>
                <div className="text-sm text-muted-foreground">
                  {entry.task}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-sm">{entry.description}</div>
                <div className="text-xs text-muted-foreground">
                  {entry.date}
                </div>
              </div>
              <div>{entry.duration}</div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Eliminar</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

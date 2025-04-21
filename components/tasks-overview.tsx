import { Checkbox } from "@/components/ui/checkbox";

export function TasksOverview() {
  const tasks = [
    {
      name: "Diseñar página de inicio",
      project: "Rediseño Web",
      deadline: "10 Mayo",
      priority: "Alta",
    },
    {
      name: "Implementar autenticación",
      project: "App Móvil",
      deadline: "15 Mayo",
      priority: "Media",
    },
    {
      name: "Crear contenido para redes",
      project: "Campaña Marketing",
      deadline: "8 Mayo",
      priority: "Alta",
    },
    {
      name: "Configurar pasarela de pago",
      project: "Tienda Online",
      deadline: "5 Mayo",
      priority: "Alta",
    },
  ];

  return (
    <div className="space-y-4">
      {tasks.map((task, i) => (
        <div key={i} className="flex items-start gap-2">
          <Checkbox id={`task-${i}`} />
          <div className="grid gap-1">
            <label
              htmlFor={`task-${i}`}
              className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {task.name}
            </label>
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground">{task.project}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-muted-foreground">{task.deadline}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span
                className={`${
                  task.priority === "Alta"
                    ? "text-red-500"
                    : task.priority === "Media"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

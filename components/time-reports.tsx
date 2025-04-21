export function TimeReports() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-sm font-medium text-muted-foreground">
            Total de Horas
          </div>
          <div className="mt-2 text-3xl font-bold">42:15:00</div>
          <div className="mt-1 text-xs text-muted-foreground">Este mes</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm font-medium text-muted-foreground">
            Proyecto con Más Horas
          </div>
          <div className="mt-2 text-xl font-bold">Rediseño Web</div>
          <div className="mt-1 text-xs text-muted-foreground">
            18:45:00 horas (44%)
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm font-medium text-muted-foreground">
            Tarea con Más Horas
          </div>
          <div className="mt-2 text-xl font-bold">Desarrollo</div>
          <div className="mt-1 text-xs text-muted-foreground">
            15:30:00 horas (37%)
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-3 gap-4 p-4 font-medium">
          <div>Proyecto</div>
          <div>Horas</div>
          <div>Porcentaje</div>
        </div>
        <div className="divide-y">
          {[
            { name: "Rediseño Web", hours: "18:45:00", percentage: 44 },
            { name: "App Móvil", hours: "12:30:00", percentage: 30 },
            { name: "Campaña Marketing", hours: "08:15:00", percentage: 19 },
            { name: "Tienda Online", hours: "02:45:00", percentage: 7 },
          ].map((project, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="font-medium">{project.name}</div>
              <div>{project.hours}</div>
              <div className="flex items-center gap-2">
                <div className="w-full max-w-[100px] overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${project.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {project.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-3 gap-4 p-4 font-medium">
          <div>Tarea</div>
          <div>Horas</div>
          <div>Porcentaje</div>
        </div>
        <div className="divide-y">
          {[
            { name: "Desarrollo", hours: "15:30:00", percentage: 37 },
            { name: "Diseño", hours: "10:45:00", percentage: 25 },
            { name: "Reuniones", hours: "08:30:00", percentage: 20 },
            { name: "Investigación", hours: "07:30:00", percentage: 18 },
          ].map((task, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 p-4 items-center">
              <div className="font-medium">{task.name}</div>
              <div>{task.hours}</div>
              <div className="flex items-center gap-2">
                <div className="w-full max-w-[100px] overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${task.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{task.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";

export function CalendarView() {
  // Datos de ejemplo para el calendario
  const days = Array.from({ length: 35 }, (_, i) => {
    const day = i - 3; // Ajuste para empezar el mes en miércoles (3 días antes)
    return {
      date: day > 0 && day <= 31 ? day : null, // Solo días del mes actual (mayo tiene 31 días)
      isCurrentMonth: day > 0 && day <= 31,
      events:
        day === 5
          ? [
              {
                id: 1,
                name: "Entrega Diseño",
                project: "Rediseño Web",
                time: "10:00",
              },
              {
                id: 2,
                name: "Reunión Cliente",
                project: "App Móvil",
                time: "15:30",
              },
            ]
          : day === 10
          ? [
              {
                id: 3,
                name: "Entrega Final",
                project: "Tienda Online",
                time: "12:00",
              },
            ]
          : day === 15
          ? [
              {
                id: 4,
                name: "Revisión Proyecto",
                project: "Campaña Marketing",
                time: "11:00",
              },
            ]
          : day === 22
          ? [
              {
                id: 5,
                name: "Presentación",
                project: "App Móvil",
                time: "16:00",
              },
            ]
          : [],
    };
  });

  // Nombres de los días de la semana
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-px">
        {weekDays.map((day, i) => (
          <div key={i} className="py-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
        {days.map((day, i) => (
          <div
            key={i}
            className={`min-h-[120px] border-t p-2 ${
              !day.isCurrentMonth
                ? "bg-muted/50"
                : day.date === 15
                ? "bg-primary/5"
                : ""
            }`}
          >
            {day.date && (
              <>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${
                      day.date === 15
                        ? "rounded-full bg-primary px-2 text-primary-foreground"
                        : ""
                    }`}
                  >
                    {day.date}
                  </span>
                  {day.events.length > 0 && (
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <span className="sr-only">Añadir evento</span>
                      <span className="text-xs">+</span>
                    </Button>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  {day.events.map((event) => (
                    <div
                      key={event.id}
                      className="rounded bg-primary/10 px-2 py-1 text-xs"
                    >
                      <div className="font-medium">{event.name}</div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>{event.project}</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

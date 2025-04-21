import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  CheckSquare,
  CreditCard,
  Clock,
  CalendarDays,
  Settings,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/40 lg:flex">
      <nav className="grid gap-2 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/projects"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Briefcase className="h-5 w-5" />
          Proyectos
        </Link>
        <Link
          href="/clients"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Users className="h-5 w-5" />
          Clientes
        </Link>
        <Link
          href="/tasks"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <CheckSquare className="h-5 w-5" />
          Tareas
        </Link>
        <Link
          href="/invoices"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <CreditCard className="h-5 w-5" />
          Facturación
        </Link>
        <Link
          href="/time"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Clock className="h-5 w-5" />
          Tiempo
        </Link>
        <Link
          href="/calendar"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <CalendarDays className="h-5 w-5" />
          Calendario
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
          Configuración
        </Link>
      </nav>
    </aside>
  );
}

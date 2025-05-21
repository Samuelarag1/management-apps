"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  CreditCard,
  Clock,
  CalendarDays,
  Settings,
  Briefcase,
} from "lucide-react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/40 lg:flex">
      <nav className="grid gap-2 p-4">
        <Link
          href="/"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground ${
            path == "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/projects"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground ${
            path == "/projects" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Briefcase className="h-5 w-5" />
          <span>Proyectos</span>
        </Link>
        <Link
          href="/clients"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground ${
            path == "/clients" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Users className="h-5 w-5" />
          Clientes
        </Link>{" "}
        <Link
          href="/tasks"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground ${
            path == "/tasks" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <CheckSquare className="h-5 w-5" />
          Tareas
        </Link>{" "}
        <Link
          href="/invoices"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground ${
            path == "/invoices" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <CreditCard className="h-5 w-5" />
          Facturación
        </Link>{" "}
        <Link
          href="/time"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground ${
            path == "/time" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Clock className="h-5 w-5" />
          Registro de Trabajo
        </Link>{" "}
        <Link
          href="/calendar"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground ${
            path == "/calendar" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <CalendarDays className="h-5 w-5" />
          Calendario
        </Link>
        <Link
          href="/profile"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground ${
            path == "/profile" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Settings className="h-5 w-5" />
          Configuración
        </Link>
      </nav>
    </aside>
  );
}

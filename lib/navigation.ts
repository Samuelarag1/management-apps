import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  CalendarDays,
  CheckSquare,
  Clock,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
  Wrench,
  Hammer,
} from "lucide-react";

export interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Proyectos", icon: Briefcase },
  { href: "/clients", label: "Clientes", icon: Users },
  { href: "/maintenance", label: "Mantenimientos", icon: Wrench },
  { href: "/work", label: "Trabajos", icon: Hammer },
  { href: "/invoices", label: "Facturación", icon: CreditCard },
  { href: "/tasks", label: "Tareas", icon: CheckSquare },
  { href: "/time", label: "Registro de tiempo", icon: Clock },
  { href: "/calendar", label: "Calendario", icon: CalendarDays },
  { href: "/profile", label: "Configuración", icon: Settings },
];

// Dashboard, Proyectos, Clientes, Mantenimientos, Trabajos
export const mobileNavigation = primaryNavigation.slice(0, 5);

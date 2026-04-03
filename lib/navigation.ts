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
  { href: "/tasks", label: "Tareas", icon: CheckSquare },
  { href: "/invoices", label: "Facturación", icon: CreditCard },
  { href: "/time", label: "Registro de trabajo", icon: Clock },
  { href: "/calendar", label: "Calendario", icon: CalendarDays },
  { href: "/profile", label: "Configuración", icon: Settings },
];

export const mobileNavigation = primaryNavigation.slice(0, 5);

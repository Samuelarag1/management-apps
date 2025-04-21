import Link from "next/link";
import {
  Briefcase,
  CheckSquare,
  CreditCard,
  LayoutDashboard,
  Users,
} from "lucide-react";

export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background lg:hidden">
      <div className="grid h-16 grid-cols-5">
        <Link
          href="#"
          className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-primary"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground"
        >
          <Briefcase className="h-5 w-5" />
          <span>Proyectos</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground"
        >
          <CheckSquare className="h-5 w-5" />
          <span>Tareas</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground"
        >
          <CreditCard className="h-5 w-5" />
          <span>Facturas</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground"
        >
          <Users className="h-5 w-5" />
          <span>Clientes</span>
        </Link>
      </div>
    </div>
  );
}

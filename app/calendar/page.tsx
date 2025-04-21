import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { CalendarView } from "@/components/calendar-view";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CalendarioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pb-16 lg:pb-0">
          <div className="container mx-auto p-4 md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Calendario
                </h1>
                <p className="text-muted-foreground">
                  Gestiona tus eventos y plazos de entrega
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Mes anterior</span>
                  </Button>
                  <div className="mx-2 text-sm font-medium">Mayo 2025</div>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Mes siguiente</span>
                  </Button>
                </div>
                <Select defaultValue="month">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Vista" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Día</SelectItem>
                    <SelectItem value="week">Semana</SelectItem>
                    <SelectItem value="month">Mes</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Evento
                </Button>
              </div>
            </div>

            <Card className="mt-6">
              <CardContent className="p-0 sm:p-6">
                <CalendarView />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

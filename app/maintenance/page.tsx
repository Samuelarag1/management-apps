"use client";

import { createClient } from "@/lib/supabase/client";
import type { MaintenanceRecord, MaintenanceStatus } from "@/types/entities";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Play, Pause } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateMaintenance } from "./components/createMaintenance";
import { EditMaintenance } from "./components/editMaintenance";
import { useDeferredValue, useEffect, useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/utils/numberUtils";

const STATUS_LABELS: Record<MaintenanceStatus, string> = {
  activo: "Activo",
  pausado: "Pausado",
  cancelado: "Cancelado",
};

function statusVariant(
  status: MaintenanceStatus
): "default" | "secondary" | "destructive" | "outline" {
  if (status === "activo") return "default";
  if (status === "pausado") return "secondary";
  return "destructive";
}

function MaintenanceRow({
  item,
  onToggle,
  onDelete,
  onEdit,
}: {
  item: MaintenanceRecord;
  onToggle: (id: string, status: MaintenanceStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (item: MaintenanceRecord) => void;
}) {
  const isActive = item.status === "activo";

  return (
    <div className="grid grid-cols-7 gap-4 p-4 items-center text-sm">
      <div className="col-span-2">
        <p className="font-medium">{item.name}</p>
        <p className="text-muted-foreground text-xs">
          {item.clients?.alias ?? "Sin cliente"}
        </p>
      </div>
      <div className="text-muted-foreground">{item.projects?.name ?? "—"}</div>
      <div className="font-semibold">{formatPrice(item.amount)}<span className="text-xs font-normal text-muted-foreground">/mes</span></div>
      <div className="text-muted-foreground">Día {item.billing_day}</div>
      <div>
        <Badge variant={statusVariant(item.status)}>
          {STATUS_LABELS[item.status]}
        </Badge>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Acciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(item)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {isActive ? (
              <DropdownMenuItem onClick={() => onToggle(item.id, "pausado")}>
                <Pause className="mr-2 h-4 w-4" />
                Pausar
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onToggle(item.id, "activo")}>
                <Play className="mr-2 h-4 w-4" />
                Activar
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(item.id)}
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function MaintenanceTable({
  title,
  description,
  items,
  onToggle,
  onDelete,
  onEdit,
  isLoading,
}: {
  title: string;
  description: string;
  items: MaintenanceRecord[];
  onToggle: (id: string, status: MaintenanceStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (item: MaintenanceRecord) => void;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay mantenimientos aquí.</p>
        ) : (
          <div className="rounded-md border">
            <div className="grid grid-cols-7 gap-4 p-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-2">Servicio</div>
              <div>Proyecto</div>
              <div>Monto</div>
              <div>Cobro</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>
            <div className="divide-y">
              {items.map((item) => (
                <MaintenanceRow
                  key={item.id}
                  item={item}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function MantenimientosPage() {
  const [items, setItems] = useState<MaintenanceRecord[]>([]);
  const [editingItem, setEditingItem] = useState<MaintenanceRecord>();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("maintenances")
          .select("*, clients(name, alias), projects(name)")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!cancelled) setItems((data ?? []) as MaintenanceRecord[]);
      } catch (error) {
        if (!cancelled)
          toast.error(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar los mantenimientos"
          );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggle = async (id: string, newStatus: MaintenanceStatus) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("maintenances")
        .update({ status: newStatus })
        .eq("id", id);
      if (error) throw error;
      setItems((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
      toast.success(
        newStatus === "activo" ? "Mantenimiento activado" : "Mantenimiento pausado"
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo actualizar"
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("maintenances").delete().eq("id", id);
      if (error) throw error;
      setItems((prev) => prev.filter((m) => m.id !== id));
      toast.success("Mantenimiento eliminado");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo eliminar"
      );
    }
  };

  const handleCreated = (m: MaintenanceRecord) => {
    setItems((prev) => [m, ...prev]);
  };

  const handleUpdated = (updated: MaintenanceRecord) => {
    setItems((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    setEditingItem(undefined);
  };

  const filtered = items.filter((m) => {
    const q = deferredSearch.trim().toLowerCase();
    if (!q) return true;
    return [m.name, m.clients?.alias ?? "", m.projects?.name ?? ""].some((v) =>
      v.toLowerCase().includes(q)
    );
  });

  const active = filtered.filter((m) => m.status === "activo");
  const paused = filtered.filter((m) => m.status === "pausado");
  const cancelled = filtered.filter((m) => m.status === "cancelado");

  const monthlyIncome = items
    .filter((m) => m.status === "activo")
    .reduce((sum, m) => sum + m.amount, 0);

  const activeCount = items.filter((m) => m.status === "activo").length;

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
                  Mantenimientos
                </h1>
                <p className="text-muted-foreground">
                  Servicios recurrentes que cobrás mes a mes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-[200px] lg:w-[300px]"
                  />
                </div>
                <CreateMaintenance onCreated={handleCreated} />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Activos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{activeCount}</div>
                  <p className="text-xs text-muted-foreground">
                    servicios corriendo
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ingreso mensual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {formatPrice(monthlyIncome)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    de mantenimientos activos
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pausados / Cancelados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {paused.length + cancelled.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {paused.length} pausados, {cancelled.length} cancelados
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="todos" className="mt-6">
              <TabsList>
                <TabsTrigger value="todos">
                  Todos ({filtered.length})
                </TabsTrigger>
                <TabsTrigger value="activos">
                  Activos ({active.length})
                </TabsTrigger>
                <TabsTrigger value="pausados">
                  Pausados ({paused.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="todos" className="space-y-4">
                <MaintenanceTable
                  title="Todos los mantenimientos"
                  description="Lista completa de servicios recurrentes"
                  items={filtered}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={setEditingItem}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="activos" className="space-y-4">
                <MaintenanceTable
                  title="Mantenimientos activos"
                  description="Servicios que se cobran actualmente"
                  items={active}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={setEditingItem}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="pausados" className="space-y-4">
                <MaintenanceTable
                  title="Mantenimientos pausados"
                  description="Servicios temporalmente suspendidos"
                  items={paused}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={setEditingItem}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
      <EditMaintenance
        maintenance={editingItem}
        open={!!editingItem}
        onOpenChange={(open) => { if (!open) setEditingItem(undefined); }}
        onUpdated={handleUpdated}
      />
    </div>
  );
}

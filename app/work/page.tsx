"use client";

import { createClient } from "@/lib/supabase/client";
import type { WorkItemRecord, WorkItemStatus } from "@/types/entities";
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
import { Search, MoreHorizontal } from "lucide-react";
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
import { CreateWorkItem, EditWorkItem } from "./components/workForm";
import { useDeferredValue, useEffect, useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/utils/numberUtils";
import { formatDate } from "@/utils/dateUtils";

const STATUS_LABELS: Record<WorkItemStatus, string> = {
  pendiente: "Pendiente",
  en_progreso: "En progreso",
  completado: "Completado",
  facturado: "Facturado",
};

function statusVariant(
  status: WorkItemStatus
): "default" | "secondary" | "outline" | "destructive" {
  if (status === "facturado") return "default";
  if (status === "completado") return "secondary";
  if (status === "en_progreso") return "outline";
  return "outline";
}

function WorkItemCard({
  item,
  onEdit,
  onDelete,
}: {
  item: WorkItemRecord;
  onEdit: (item: WorkItemRecord) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-3 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-medium text-sm">{item.title}</p>
          <Badge variant={statusVariant(item.status)} className="shrink-0">
            {STATUS_LABELS[item.status]}
          </Badge>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
          <span>{formatDate(item.work_date)}</span>
          {item.clients && <span>{item.clients.alias}</span>}
          {item.projects && <span>{item.projects.name}</span>}
          {item.hours && <span>{item.hours}h</span>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="font-semibold text-sm">{formatPrice(item.amount)}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Acciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(item)}>Editar</DropdownMenuItem>
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

function WorkList({
  title,
  description,
  items,
  onEdit,
  onDelete,
  isLoading,
}: {
  title: string;
  description: string;
  items: WorkItemRecord[];
  onEdit: (item: WorkItemRecord) => void;
  onDelete: (id: string) => void;
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
          <p className="text-sm text-muted-foreground">No hay trabajos aquí.</p>
        ) : (
          <div className="divide-y">
            {items.map((item) => (
              <WorkItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function TrabajosPage() {
  const [items, setItems] = useState<WorkItemRecord[]>([]);
  const [editingItem, setEditingItem] = useState<WorkItemRecord>();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const supabase = createClient();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase as any)
          .from("work_items")
          .select("*, clients(name, alias), projects(name)")
          .order("work_date", { ascending: false });

        if (error) throw error;
        if (!cancelled) setItems((data ?? []) as WorkItemRecord[]);
      } catch (error) {
        if (!cancelled)
          toast.error(
            error instanceof Error ? error.message : "No se pudieron cargar los trabajos"
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

  const handleDelete = async (id: string) => {
    try {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("work_items").delete().eq("id", id);
      if (error) throw error;
      setItems((prev) => prev.filter((m) => m.id !== id));
      toast.success("Trabajo eliminado");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo eliminar");
    }
  };

  const handleCreated = (item: WorkItemRecord) => {
    setItems((prev) => [item, ...prev]);
  };

  const handleUpdated = (updated: WorkItemRecord) => {
    setItems((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    setEditingItem(undefined);
  };

  const filtered = items.filter((m) => {
    const q = deferredSearch.trim().toLowerCase();
    if (!q) return true;
    return [m.title, m.clients?.alias ?? "", m.projects?.name ?? ""].some((v) =>
      v.toLowerCase().includes(q)
    );
  });

  const pending = filtered.filter((m) => m.status === "pendiente");
  const inProgress = filtered.filter((m) => m.status === "en_progreso");
  const completed = filtered.filter((m) => m.status === "completado");
  const invoiced = filtered.filter((m) => m.status === "facturado");

  const now = new Date();
  const thisMonth = items.filter((m) => {
    const d = new Date(m.work_date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const monthlyTotal = thisMonth.reduce((s, m) => s + m.amount, 0);
  const pendingTotal = items
    .filter((m) => m.status !== "facturado")
    .reduce((s, m) => s + m.amount, 0);
  const totalAll = items.reduce((s, m) => s + m.amount, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pb-16 lg:pb-0">
          <div className="container mx-auto p-4 md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Trabajos</h1>
                <p className="text-muted-foreground">
                  Trabajos puntuales realizados para clientes y proyectos
                </p>
              </div>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full appearance-none bg-background pl-8 shadow-none sm:w-[200px] lg:w-[280px]"
                  />
                </div>
                <CreateWorkItem onCreated={handleCreated} />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Este mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(monthlyTotal)}</div>
                  <p className="text-xs text-muted-foreground">{thisMonth.length} trabajo{thisMonth.length !== 1 ? "s" : ""}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Por facturar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(pendingTotal)}</div>
                  <p className="text-xs text-muted-foreground">no facturados aún</p>
                </CardContent>
              </Card>
              <Card className="col-span-2 md:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total acumulado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(totalAll)}</div>
                  <p className="text-xs text-muted-foreground">{items.length} trabajo{items.length !== 1 ? "s" : ""} registrados</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="todos" className="mt-6">
              <div className="overflow-x-auto pb-1">
                <TabsList className="w-max">
                  <TabsTrigger value="todos">Todos ({filtered.length})</TabsTrigger>
                  <TabsTrigger value="pendientes">Pendientes ({pending.length + inProgress.length})</TabsTrigger>
                  <TabsTrigger value="completados">Completados ({completed.length})</TabsTrigger>
                  <TabsTrigger value="facturados">Facturados ({invoiced.length})</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="todos" className="mt-4">
                <WorkList
                  title="Todos los trabajos"
                  description="Lista completa de trabajos registrados"
                  items={filtered}
                  onEdit={setEditingItem}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="pendientes" className="mt-4">
                <WorkList
                  title="Pendientes y en progreso"
                  description="Trabajos que aún no fueron completados"
                  items={[...pending, ...inProgress]}
                  onEdit={setEditingItem}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="completados" className="mt-4">
                <WorkList
                  title="Completados"
                  description="Trabajos terminados, listos para facturar"
                  items={completed}
                  onEdit={setEditingItem}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="facturados" className="mt-4">
                <WorkList
                  title="Facturados"
                  description="Trabajos ya facturados al cliente"
                  items={invoiced}
                  onEdit={setEditingItem}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
      <EditWorkItem
        item={editingItem}
        open={!!editingItem}
        onOpenChange={(open) => {
          if (!open) setEditingItem(undefined);
        }}
        onUpdated={handleUpdated}
      />
    </div>
  );
}

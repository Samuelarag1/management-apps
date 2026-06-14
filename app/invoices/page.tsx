"use client";

import { createClient } from "@/lib/supabase/client";
import type { InvoiceRecord, InvoiceStatus } from "@/types/entities";
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
import { Search, MoreHorizontal, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateInvoice } from "./components/createInvoice";
import { useDeferredValue, useEffect, useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/utils/numberUtils";

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  borrador: "Borrador",
  enviada: "Enviada",
  pagada: "Pagada",
  vencida: "Vencida",
};

function statusVariant(status: InvoiceStatus): "outline" | "default" | "secondary" | "destructive" {
  if (status === "pagada") return "outline";
  if (status === "enviada") return "default";
  if (status === "vencida") return "destructive";
  return "secondary";
}

function InvoiceRow({
  invoice,
  onMarkPaid,
  onDelete,
}: {
  invoice: InvoiceRecord;
  onMarkPaid: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-7 gap-4 p-4 items-center">
      <div className="font-medium text-sm">
        {invoice.invoice_number ?? "—"}
      </div>
      <div className="text-sm">{invoice.clients?.alias ?? "—"}</div>
      <div className="text-sm">{invoice.projects?.name ?? "—"}</div>
      <div className="text-sm">
        {new Date(invoice.issue_date + "T00:00:00").toLocaleDateString("es-AR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
      <div className="font-medium text-sm">{formatPrice(invoice.total)}</div>
      <div>
        <Badge variant={statusVariant(invoice.status)}>
          {STATUS_LABELS[invoice.status]}
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
            <DropdownMenuItem disabled>
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </DropdownMenuItem>
            {invoice.status !== "pagada" && (
              <DropdownMenuItem onClick={() => onMarkPaid(invoice.id)}>
                Registrar pago
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(invoice.id)}
            >
              Eliminar factura
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function InvoiceTable({
  title,
  description,
  invoices,
  onMarkPaid,
  onDelete,
  isLoading,
}: {
  title: string;
  description: string;
  invoices: InvoiceRecord[];
  onMarkPaid: (id: string) => void;
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
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay facturas aquí.</p>
        ) : (
          <div className="rounded-md border">
            <div className="grid grid-cols-7 gap-4 p-4 font-medium text-sm text-muted-foreground">
              <div>N° Factura</div>
              <div>Cliente</div>
              <div>Proyecto</div>
              <div>Fecha</div>
              <div>Total</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>
            <div className="divide-y">
              {invoices.map((invoice) => (
                <InvoiceRow
                  key={invoice.id}
                  invoice={invoice}
                  onMarkPaid={onMarkPaid}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function FacturasPage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadInvoices() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("invoices")
          .select("*, clients(name, alias), projects(name)")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!cancelled) setInvoices((data ?? []) as InvoiceRecord[]);
      } catch (error) {
        if (!cancelled)
          toast.error(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar las facturas"
          );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadInvoices();
    return () => { cancelled = true; };
  }, []);

  const handleMarkPaid = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("invoices")
        .update({ status: "pagada" })
        .eq("id", id);
      if (error) throw error;
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === id ? { ...inv, status: "pagada" } : inv))
      );
      toast.success("Pago registrado");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo registrar el pago"
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("invoices").delete().eq("id", id);
      if (error) throw error;
      setInvoices((prev) => prev.filter((inv) => inv.id !== id));
      toast.success("Factura eliminada");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo eliminar la factura"
      );
    }
  };

  const handleCreated = (invoice: InvoiceRecord) => {
    setInvoices((prev) => [invoice, ...prev]);
  };

  const filtered = invoices.filter((inv) => {
    const q = deferredSearch.trim().toLowerCase();
    if (!q) return true;
    return [
      inv.invoice_number ?? "",
      inv.clients?.alias ?? "",
      inv.projects?.name ?? "",
    ].some((v) => v.toLowerCase().includes(q));
  });

  const pending = filtered.filter((inv) => inv.status === "enviada" || inv.status === "borrador");
  const paid = filtered.filter((inv) => inv.status === "pagada");
  const overdue = filtered.filter((inv) => inv.status === "vencida");

  const totalFacturado = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalCobrado = invoices
    .filter((inv) => inv.status === "pagada")
    .reduce((sum, inv) => sum + inv.total, 0);
  const totalPendiente = invoices
    .filter((inv) => inv.status !== "pagada")
    .reduce((sum, inv) => sum + inv.total, 0);

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
                  Facturación
                </h1>
                <p className="text-muted-foreground">
                  Gestiona tus facturas y pagos
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar factura..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-[200px] lg:w-[300px]"
                  />
                </div>
                <CreateInvoice onCreated={handleCreated} />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Facturado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPrice(totalFacturado)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {invoices.length} facturas en total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pagos Recibidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPrice(totalCobrado)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {paid.length} facturas pagadas
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pendiente de Cobro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPrice(totalPendiente)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {overdue.length} vencidas / {pending.length} por cobrar
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Facturas Emitidas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{invoices.length}</div>
                  <p className="text-xs text-muted-foreground">En total</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="todas" className="mt-6">
              <TabsList>
                <TabsTrigger value="todas">
                  Todas ({filtered.length})
                </TabsTrigger>
                <TabsTrigger value="pendientes">
                  Pendientes ({pending.length})
                </TabsTrigger>
                <TabsTrigger value="pagadas">
                  Pagadas ({paid.length})
                </TabsTrigger>
                <TabsTrigger value="vencidas">
                  Vencidas ({overdue.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="todas" className="space-y-4">
                <InvoiceTable
                  title="Todas las Facturas"
                  description="Lista de todas tus facturas y su estado actual"
                  invoices={filtered}
                  onMarkPaid={handleMarkPaid}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="pendientes" className="space-y-4">
                <InvoiceTable
                  title="Facturas Pendientes"
                  description="Facturas en borrador o enviadas aún sin pagar"
                  invoices={pending}
                  onMarkPaid={handleMarkPaid}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="pagadas" className="space-y-4">
                <InvoiceTable
                  title="Facturas Pagadas"
                  description="Facturas con pago recibido"
                  invoices={paid}
                  onMarkPaid={handleMarkPaid}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value="vencidas" className="space-y-4">
                <InvoiceTable
                  title="Facturas Vencidas"
                  description="Facturas con fecha de pago vencida"
                  invoices={overdue}
                  onMarkPaid={handleMarkPaid}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

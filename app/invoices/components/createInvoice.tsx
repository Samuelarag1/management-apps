"use client";

import { createClient } from "@/lib/supabase/client";
import type { ClientRecord, InvoiceRecord, ProjectRecord } from "@/types/entities";
import SpinnerOverlay from "@/components/spinner-overlay";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface InvoiceFormValues {
  invoice_number: string;
  client_id: string;
  project_id: string;
  status: "borrador" | "enviada" | "pagada" | "vencida";
  issue_date: string;
  due_date: string;
  concept: string;
  amount: number;
  tax_rate: number;
  notes: string;
}

const today = new Date().toISOString().split("T")[0];

const defaultValues: InvoiceFormValues = {
  invoice_number: "",
  client_id: "",
  project_id: "",
  status: "borrador",
  issue_date: today,
  due_date: "",
  concept: "",
  amount: 0,
  tax_rate: 0,
  notes: "",
};

interface CreateInvoiceProps {
  onCreated: (invoice: InvoiceRecord) => void;
}

export function CreateInvoice({ onCreated }: CreateInvoiceProps) {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<InvoiceFormValues>({ defaultValues });

  const amount = watch("amount") || 0;
  const taxRate = watch("tax_rate") || 0;
  const total = amount + (amount * taxRate) / 100;

  useEffect(() => {
    if (!open) return;

    const supabase = createClient();
    Promise.all([
      supabase.from("clients").select("id, name, alias, email, status, phone_number, location, projects(id, name, status, finish_date)").order("name"),
      supabase.from("projects").select("id, name, status, description, price, pre_payment, finish_date, initial_date, hosting, domain, cloud_storage, cloud_storage_date, client_id, clients(id, name, alias)").order("name"),
    ]).then(([{ data: c }, { data: p }]) => {
      setClients((c ?? []) as ClientRecord[]);
      type RawProj = {
        id: string; name: string; description: string | null; price: number | null;
        status: string; pre_payment: number | null; finish_date: string | null;
        initial_date: string | null; hosting: string | null; domain: string | null;
        cloud_storage: boolean; cloud_storage_date: string | null; client_id: string | null;
        clients: { id: string; name: string; alias: string } | null;
      };
      setProjects(
        ((p ?? []) as unknown as RawProj[]).map((proj) => ({
          ...proj,
          status: proj.status as ProjectRecord["status"],
          client: proj.clients
            ? { id: proj.clients.id, name: proj.clients.name, alias: proj.clients.alias }
            : null,
        }))
      );
    });
  }, [open]);

  const onSubmit: SubmitHandler<InvoiceFormValues> = async (data) => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");

      const subtotal = Number(data.amount);
      const taxAmount = (subtotal * Number(data.tax_rate)) / 100;
      const totalAmount = subtotal + taxAmount;

      const { data: invoice, error } = await supabase
        .from("invoices")
        .insert({
          user_id: user.id,
          invoice_number: data.invoice_number || null,
          client_id: data.client_id || null,
          project_id: data.project_id || null,
          status: data.status,
          issue_date: data.issue_date,
          due_date: data.due_date || null,
          subtotal,
          tax_rate: Number(data.tax_rate),
          total: totalAmount,
          notes: data.notes || null,
          items: data.concept
            ? [{ description: data.concept, quantity: 1, unit_price: subtotal, total: subtotal }]
            : [],
        })
        .select("*, clients(name, alias), projects(name)")
        .single();

      if (error) throw error;

      onCreated(invoice as InvoiceRecord);
      toast.success("Factura creada exitosamente");
      setOpen(false);
      reset(defaultValues);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al crear la factura"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(defaultValues); }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Factura
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        {isSubmitting ? <SpinnerOverlay /> : null}
        <DialogHeader>
          <DialogTitle>Nueva factura</DialogTitle>
          <DialogDescription>
            Registrá los datos de la factura a emitir.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invoice_number">N° de Factura</Label>
              <Input
                id="invoice_number"
                {...register("invoice_number")}
                placeholder="INV-001"
              />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="enviada">Enviada</SelectItem>
                      <SelectItem value="pagada">Pagada</SelectItem>
                      <SelectItem value="vencida">Vencida</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Controller
                name="client_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.alias}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Proyecto</Label>
              <Controller
                name="project_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sin proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="issue_date">Fecha de emisión</Label>
              <Input id="issue_date" type="date" {...register("issue_date")} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due_date">Fecha de vencimiento</Label>
              <Input id="due_date" type="date" {...register("due_date")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="concept">Concepto</Label>
            <Input
              id="concept"
              {...register("concept")}
              placeholder="Desarrollo web / diseño / consultoría..."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Subtotal</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                {...register("amount", { valueAsNumber: true })}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax_rate">IVA / Impuesto (%)</Label>
              <Input
                id="tax_rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                {...register("tax_rate", { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
          </div>
          {total > 0 && (
            <div className="rounded-md bg-muted px-4 py-2 text-sm">
              Total: <span className="font-bold">${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Condiciones de pago, datos bancarios..."
              rows={2}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear factura"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

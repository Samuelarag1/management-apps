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
import { Search, Plus, MoreHorizontal, Download, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function FacturasPage() {
  const facturas = [
    {
      id: "INV-001",
      cliente: "Acme Inc",
      proyecto: "Rediseño Web",
      fecha: "01 Abril 2025",
      vencimiento: "01 Mayo 2025",
      monto: "$1,200",
      estado: "Pagada",
    },
    {
      id: "INV-002",
      cliente: "TechCorp",
      proyecto: "App Móvil",
      fecha: "15 Abril 2025",
      vencimiento: "15 Mayo 2025",
      monto: "$850",
      estado: "Pendiente",
    },
    {
      id: "INV-003",
      cliente: "GlobalBiz",
      proyecto: "Campaña Marketing",
      fecha: "22 Abril 2025",
      vencimiento: "22 Mayo 2025",
      monto: "$1,500",
      estado: "Pagada",
    },
    {
      id: "INV-004",
      cliente: "LocalShop",
      proyecto: "Tienda Online",
      fecha: "30 Abril 2025",
      vencimiento: "30 Mayo 2025",
      monto: "$700",
      estado: "Vencida",
    },
    {
      id: "INV-005",
      cliente: "Innovate Labs",
      proyecto: "Identidad Corporativa",
      fecha: "05 Abril 2025",
      vencimiento: "05 Mayo 2025",
      monto: "$1,800",
      estado: "Pagada",
    },
  ];

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
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-[200px] lg:w-[300px]"
                  />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Factura
                </Button>
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
                  <div className="text-2xl font-bold">$6,050</div>
                  <p className="text-xs text-muted-foreground">
                    +12% respecto al mes anterior
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
                  <div className="text-2xl font-bold">$4,500</div>
                  <p className="text-xs text-muted-foreground">
                    74% del total facturado
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
                  <div className="text-2xl font-bold">$1,550</div>
                  <p className="text-xs text-muted-foreground">
                    26% del total facturado
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
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Este mes</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="todas" className="mt-6">
              <TabsList>
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
                <TabsTrigger value="pagadas">Pagadas</TabsTrigger>
                <TabsTrigger value="vencidas">Vencidas</TabsTrigger>
              </TabsList>
              <TabsContent value="todas" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Todas las Facturas</CardTitle>
                    <CardDescription>
                      Lista de todas tus facturas y su estado actual
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                        <div>Nº Factura</div>
                        <div>Cliente</div>
                        <div>Proyecto</div>
                        <div>Fecha</div>
                        <div>Monto</div>
                        <div>Estado</div>
                        <div>Acciones</div>
                      </div>
                      <div className="divide-y">
                        {facturas.map((factura) => (
                          <div
                            key={factura.id}
                            className="grid grid-cols-7 gap-4 p-4 items-center"
                          >
                            <div className="font-medium">{factura.id}</div>
                            <div>{factura.cliente}</div>
                            <div>{factura.proyecto}</div>
                            <div>{factura.fecha}</div>
                            <div>{factura.monto}</div>
                            <div>
                              <Badge
                                variant={
                                  factura.estado === "Pagada"
                                    ? "outline"
                                    : factura.estado === "Pendiente"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {factura.estado}
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
                                  <DropdownMenuItem>
                                    Ver detalles
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Descargar PDF
                                  </DropdownMenuItem>
                                  {factura.estado !== "Pagada" && (
                                    <DropdownMenuItem>
                                      Registrar pago
                                    </DropdownMenuItem>
                                  )}
                                  {factura.estado === "Pendiente" && (
                                    <DropdownMenuItem>
                                      <Send className="mr-2 h-4 w-4" />
                                      Enviar recordatorio
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Eliminar factura
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pendientes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Facturas Pendientes</CardTitle>
                    <CardDescription>
                      Facturas pendientes de pago
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                        <div>Nº Factura</div>
                        <div>Cliente</div>
                        <div>Proyecto</div>
                        <div>Fecha</div>
                        <div>Monto</div>
                        <div>Estado</div>
                        <div>Acciones</div>
                      </div>
                      <div className="divide-y">
                        {facturas
                          .filter((factura) => factura.estado === "Pendiente")
                          .map((factura) => (
                            <div
                              key={factura.id}
                              className="grid grid-cols-7 gap-4 p-4 items-center"
                            >
                              <div className="font-medium">{factura.id}</div>
                              <div>{factura.cliente}</div>
                              <div>{factura.proyecto}</div>
                              <div>{factura.fecha}</div>
                              <div>{factura.monto}</div>
                              <div>
                                <Badge variant="default">
                                  {factura.estado}
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
                                    <DropdownMenuItem>
                                      Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="mr-2 h-4 w-4" />
                                      Descargar PDF
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Registrar pago
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Send className="mr-2 h-4 w-4" />
                                      Enviar recordatorio
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      Eliminar factura
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pagadas" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Facturas Pagadas</CardTitle>
                    <CardDescription>
                      Facturas con pago recibido
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                        <div>Nº Factura</div>
                        <div>Cliente</div>
                        <div>Proyecto</div>
                        <div>Fecha</div>
                        <div>Monto</div>
                        <div>Estado</div>
                        <div>Acciones</div>
                      </div>
                      <div className="divide-y">
                        {facturas
                          .filter((factura) => factura.estado === "Pagada")
                          .map((factura) => (
                            <div
                              key={factura.id}
                              className="grid grid-cols-7 gap-4 p-4 items-center"
                            >
                              <div className="font-medium">{factura.id}</div>
                              <div>{factura.cliente}</div>
                              <div>{factura.proyecto}</div>
                              <div>{factura.fecha}</div>
                              <div>{factura.monto}</div>
                              <div>
                                <Badge variant="outline">
                                  {factura.estado}
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
                                    <DropdownMenuItem>
                                      Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="mr-2 h-4 w-4" />
                                      Descargar PDF
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Generar recibo
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      Eliminar factura
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="vencidas" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Facturas Vencidas</CardTitle>
                    <CardDescription>
                      Facturas con fecha de pago vencida
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                        <div>Nº Factura</div>
                        <div>Cliente</div>
                        <div>Proyecto</div>
                        <div>Fecha</div>
                        <div>Monto</div>
                        <div>Estado</div>
                        <div>Acciones</div>
                      </div>
                      <div className="divide-y">
                        {facturas
                          .filter((factura) => factura.estado === "Vencida")
                          .map((factura) => (
                            <div
                              key={factura.id}
                              className="grid grid-cols-7 gap-4 p-4 items-center"
                            >
                              <div className="font-medium">{factura.id}</div>
                              <div>{factura.cliente}</div>
                              <div>{factura.proyecto}</div>
                              <div>{factura.fecha}</div>
                              <div>{factura.monto}</div>
                              <div>
                                <Badge variant="destructive">
                                  {factura.estado}
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
                                    <DropdownMenuItem>
                                      Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="mr-2 h-4 w-4" />
                                      Descargar PDF
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Registrar pago
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Send className="mr-2 h-4 w-4" />
                                      Enviar recordatorio
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      Eliminar factura
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

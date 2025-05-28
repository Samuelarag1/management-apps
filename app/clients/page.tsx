"use client";
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
import { Search, Mail, Phone, MapPin, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ModalClients } from "./components/createUser";
import { useEffect, useState } from "react";
import IMClients from "@/Models/Clients";
import { Skeleton } from "@/components/ui/skeleton";
import SpinnerOverlay from "@/components/spinner-overlay";
import { ClientModal } from "./components/userDetails";

export default function ClientesPage() {
  const [clients, setClients] = useState<IMClients[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [clientDetail, setClientDetail] = useState<IMClients>();

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  const handleOnDelete = async (id: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Error al eliminar el cliente");
      }
      setClients((prev) => prev?.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id: number) => {
    await fetch(`/api/clients/${id}`)
      .then((res) => res.json())
      .then((data) => setClientDetail(data));
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 pb-16 lg:pb-0">
            <div className="container mx-auto p-4 md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    Clientes
                  </h1>
                  <p className="text-muted-foreground">
                    Gestiona tus clientes y sus proyectos
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar cliente..."
                      className="w-full appearance-none bg-background pl-8 shadow-none md:w-[200px] lg:w-[300px]"
                    />
                  </div>

                  <ModalClients title="Nuevo Cliente" isCreating />
                </div>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Todos los Clientes</CardTitle>
                  <CardDescription>
                    Lista de todos tus clientes y sus datos de contacto
                  </CardDescription>
                </CardHeader>
                {!clients ? (
                  <CardContent>
                    {" "}
                    <div className="flex items-center justify-start gap-6">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent>
                    <div className="grid gap-6">
                      {clients?.map((cliente) => (
                        <div
                          key={cliente.id}
                          className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={`/placeholder.svg?height=48&width=48&text=`}
                              />
                              <AvatarFallback>
                                {cliente.name.split("")[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">
                                  {cliente.alias}
                                </h3>
                                <Badge
                                  variant={
                                    cliente.status === "Activo"
                                      ? "default"
                                      : cliente.status === "Inactivo"
                                      ? "secondary"
                                      : "outline"
                                  }
                                >
                                  {cliente.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {cliente.name}
                              </p>
                            </div>
                          </div>
                          <div className="ml-0 flex flex-1 flex-col gap-2 sm:ml-4 md:flex-row md:item s-center md:justify-between">
                            <div className="grid gap-1">
                              <div className="flex items-center text-sm">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{cliente.email}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{cliente.phone_number}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{cliente.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {cliente.projects?.length ? (
                                <div className="text-sm">
                                  <span className="font-medium">
                                    {cliente.projects?.length}
                                  </span>{" "}
                                  proyectos
                                </div>
                              ) : (
                                ""
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Acciones</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleViewDetails(cliente.id)
                                    }
                                  >
                                    Ver detalles
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Editar cliente
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Ver proyectos
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleOnDelete(cliente.id)}
                                  >
                                    Eliminar cliente
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
      {loading ? <SpinnerOverlay /> : null}

      {/* {clientDetail ? (
        <>
          {" "}
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <Card>
              <CardContent>
                <CardHeader>Detalle de {clientDetail.name}</CardHeader>
              </CardContent>
            </Card>
          </div>
        </>
      ) : null} */}

      <ClientModal
        clientDetail={clientDetail}
        setClientDetail={setClientDetail}
      />
    </>
  );
}

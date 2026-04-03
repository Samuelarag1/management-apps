"use client";

import { fetchJson } from "@/lib/api-client";
import { getClientStatusClassName } from "@/lib/status";
import type { ClientRecord } from "@/types/entities";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ModalClients } from "./components/createUser";
import { useDeferredValue, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SpinnerOverlay from "@/components/spinner-overlay";
import { ClientModal } from "./components/userDetails";
import { toast } from "sonner";

export default function ClientesPage() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [clientDetail, setClientDetail] = useState<ClientRecord>();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadClients() {
      try {
        const data = await fetchJson<ClientRecord[]>("/api/clients");

        if (!cancelled) {
          setClients(data);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar los clientes"
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadClients();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredClients = clients.filter((client) => {
    const query = deferredSearch.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return [
      client.name,
      client.alias,
      client.email,
      client.location ?? "",
      client.phone_number ?? "",
    ].some((value) => value.toLowerCase().includes(query));
  });

  const handleOnDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      await fetchJson<{ message: string }>(`/api/clients/${id}`, {
        method: "DELETE",
      });

      setClients((prev) => prev.filter((client) => client.id !== id));
      setClientDetail((prev) => (prev?.id === id ? undefined : prev));
      toast.success("Cliente eliminado correctamente");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo eliminar el cliente"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreatedClient = (client: ClientRecord) => {
    setClients((prev) => [client, ...prev]);
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
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      className="w-full appearance-none bg-background pl-8 shadow-none md:w-[200px] lg:w-[300px]"
                    />
                  </div>

                  <ModalClients
                    title="Nuevo cliente"
                    onCreated={handleCreatedClient}
                  />
                </div>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Todos los clientes</CardTitle>
                  <CardDescription>
                    Lista de contactos, estado y proyectos asociados.
                  </CardDescription>
                </CardHeader>
                {isLoading ? (
                  <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-start gap-6"
                      >
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                ) : filteredClients.length === 0 ? (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      No hay clientes que coincidan con la búsqueda actual.
                    </p>
                  </CardContent>
                ) : (
                  <CardContent>
                    <div className="grid gap-6">
                      {filteredClients.map((client) => (
                        <div
                          key={client.id}
                          className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback>
                                {client.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">
                                  {client.alias}
                                </h3>
                                <Badge
                                  className={getClientStatusClassName(
                                    client.status
                                  )}
                                >
                                  {client.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {client.name}
                              </p>
                            </div>
                          </div>
                          <div className="ml-0 flex flex-1 flex-col gap-2 sm:ml-4 md:flex-row md:items-center md:justify-between">
                            <div className="grid gap-1">
                              <div className="flex items-center text-sm">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{client.email}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{client.phone_number ?? "Sin teléfono"}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{client.location ?? "Sin ubicación"}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm">
                                <span className="font-medium">
                                  {client.projects.length}
                                </span>{" "}
                                proyectos
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Acciones</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => setClientDetail(client)}
                                  >
                                    Ver detalles
                                  </DropdownMenuItem>
                                  <DropdownMenuItem disabled>
                                    Editar cliente
                                  </DropdownMenuItem>
                                  <DropdownMenuItem disabled>
                                    Ver proyectos
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleOnDelete(client.id)}
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
      {isDeleting ? <SpinnerOverlay /> : null}
      <ClientModal
        clientDetail={clientDetail}
        setClientDetail={setClientDetail}
      />
    </>
  );
}

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
import {
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ClientesPage() {
  const clientes = [
    {
      id: 1,
      nombre: "Acme Inc",
      contacto: "John Smith",
      email: "john@acmeinc.com",
      telefono: "+1 (555) 123-4567",
      ubicacion: "Nueva York, EE.UU.",
      proyectos: 3,
      estado: "Activo",
      avatar: "A",
    },
    {
      id: 2,
      nombre: "TechCorp",
      contacto: "Sarah Johnson",
      email: "sarah@techcorp.com",
      telefono: "+1 (555) 987-6543",
      ubicacion: "San Francisco, EE.UU.",
      proyectos: 1,
      estado: "Activo",
      avatar: "T",
    },
    {
      id: 3,
      nombre: "GlobalBiz",
      contacto: "Michael Chen",
      email: "michael@globalbiz.com",
      telefono: "+1 (555) 456-7890",
      ubicacion: "Chicago, EE.UU.",
      proyectos: 2,
      estado: "Activo",
      avatar: "G",
    },
    {
      id: 4,
      nombre: "LocalShop",
      contacto: "Emma Wilson",
      email: "emma@localshop.com",
      telefono: "+1 (555) 234-5678",
      ubicacion: "Austin, EE.UU.",
      proyectos: 1,
      estado: "Inactivo",
      avatar: "L",
    },
    {
      id: 5,
      nombre: "Innovate Labs",
      contacto: "David Kim",
      email: "david@innovatelabs.com",
      telefono: "+1 (555) 876-5432",
      ubicacion: "Boston, EE.UU.",
      proyectos: 0,
      estado: "Potencial",
      avatar: "I",
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
                <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
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
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Cliente
                </Button>
              </div>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Todos los Clientes</CardTitle>
                <CardDescription>
                  Lista de todos tus clientes y sus datos de contacto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {clientes.map((cliente) => (
                    <div
                      key={cliente.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`/placeholder.svg?height=48&width=48&text=${cliente.avatar}`}
                          />
                          <AvatarFallback>{cliente.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{cliente.nombre}</h3>
                            <Badge
                              variant={
                                cliente.estado === "Activo"
                                  ? "default"
                                  : cliente.estado === "Inactivo"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {cliente.estado}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {cliente.contacto}
                          </p>
                        </div>
                      </div>
                      <div className="ml-0 flex flex-1 flex-col gap-2 sm:ml-4 md:flex-row md:items-center md:justify-between">
                        <div className="grid gap-1">
                          <div className="flex items-center text-sm">
                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{cliente.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{cliente.telefono}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{cliente.ubicacion}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm">
                            <span className="font-medium">
                              {cliente.proyectos}
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
                              <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                              <DropdownMenuItem>
                                Editar cliente
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver proyectos</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
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
            </Card>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

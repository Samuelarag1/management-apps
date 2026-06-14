"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Bell, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProfileMeta {
  name?: string;
  company?: string;
  phone?: string;
  city?: string;
  country?: string;
  address?: string;
  bio?: string;
  tax_id?: string;
  legal_name?: string;
  billing_address?: string;
  billing_city?: string;
  billing_zip?: string;
  billing_country?: string;
  currency?: string;
  invoice_prefix?: string;
  invoice_next_number?: string;
  payment_terms?: string;
}

export default function PerfilPage() {
  const [userEmail, setUserEmail] = useState("");
  const [meta, setMeta] = useState<ProfileMeta>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email ?? "");
        setMeta((user.user_metadata as ProfileMeta) ?? {});
      }
      setIsLoading(false);
    });
  }, []);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ data: meta });
      if (error) throw error;
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo actualizar el perfil"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      toast.error("Ingresá una nueva contraseña");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      setIsSaving(true);
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success("Contraseña actualizada correctamente");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No se pudo cambiar la contraseña"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const initials = (meta.name ?? userEmail)
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (isLoading) return null;

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
                  Perfil y Configuración
                </h1>
                <p className="text-muted-foreground">
                  Gestiona tu información personal y preferencias
                </p>
              </div>
            </div>

            <Tabs defaultValue="profile" className="mt-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="profile">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="mr-2 h-4 w-4" />
                  Notificaciones
                </TabsTrigger>
                <TabsTrigger value="billing">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Facturación
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>
                      Actualiza tu información de perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                      <Avatar className="h-24 w-24">
                        <AvatarFallback className="text-2xl">
                          {initials || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium">{meta.name ?? "Sin nombre"}</h3>
                        <p className="text-sm text-muted-foreground">{userEmail}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input
                          id="name"
                          placeholder="Tu nombre"
                          value={meta.name ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({ ...m, name: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa / Marca</Label>
                        <Input
                          id="company"
                          placeholder="Tu empresa"
                          value={meta.company ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({ ...m, company: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userEmail}
                          disabled
                          className="opacity-60"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          placeholder="Tu teléfono"
                          value={meta.phone ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({ ...m, phone: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          placeholder="Tu ciudad"
                          value={meta.city ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({ ...m, city: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Input
                          id="country"
                          placeholder="Tu país"
                          value={meta.country ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({ ...m, country: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea
                          id="bio"
                          placeholder="Cuéntanos sobre ti"
                          value={meta.bio ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({ ...m, bio: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cambiar Contraseña</CardTitle>
                    <CardDescription>
                      Actualizá tu contraseña de acceso
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva Contraseña</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirmar Nueva Contraseña
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleChangePassword} disabled={isSaving}>
                      Actualizar Contraseña
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias de Notificaciones</CardTitle>
                    <CardDescription>
                      Próximamente disponible
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Actualizaciones de Proyectos</Label>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones de cambios en proyectos
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Tareas Pendientes</Label>
                        <p className="text-sm text-muted-foreground">
                          Recordatorios de tareas próximas a vencer
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Facturas y Pagos</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificaciones sobre facturas y cobros
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de Facturación</CardTitle>
                    <CardDescription>
                      Tus datos fiscales y configuración de facturas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tax-id">CUIT / NIF / ID Fiscal</Label>
                        <Input
                          id="tax-id"
                          placeholder="Tu identificación fiscal"
                          value={meta.tax_id ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({ ...m, tax_id: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="legal-name">
                          Nombre Legal / Razón Social
                        </Label>
                        <Input
                          id="legal-name"
                          placeholder="Nombre legal"
                          value={meta.legal_name ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({ ...m, legal_name: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-city">Ciudad</Label>
                        <Input
                          id="billing-city"
                          placeholder="Ciudad"
                          value={meta.billing_city ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({ ...m, billing_city: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-country">País</Label>
                        <Input
                          id="billing-country"
                          placeholder="País"
                          value={meta.billing_country ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({
                              ...m,
                              billing_country: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Moneda Predeterminada</Label>
                        <Input
                          id="currency"
                          placeholder="ARS / USD / EUR"
                          value={meta.currency ?? ""}
                          onChange={(e) =>
                            setMeta((m) => ({ ...m, currency: e.target.value }))
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Plantilla de Factura</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="invoice-prefix">Prefijo</Label>
                          <Input
                            id="invoice-prefix"
                            placeholder="INV-"
                            value={meta.invoice_prefix ?? ""}
                            onChange={(e) =>
                              setMeta((m) => ({
                                ...m,
                                invoice_prefix: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="next-number">Próximo Número</Label>
                          <Input
                            id="next-number"
                            placeholder="001"
                            value={meta.invoice_next_number ?? ""}
                            onChange={(e) =>
                              setMeta((m) => ({
                                ...m,
                                invoice_next_number: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="payment-terms">
                            Condiciones de Pago
                          </Label>
                          <Textarea
                            id="payment-terms"
                            placeholder="Pago a 30 días, transferencia bancaria..."
                            value={meta.payment_terms ?? ""}
                            onChange={(e) =>
                              setMeta((m) => ({
                                ...m,
                                payment_terms: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? "Guardando..." : "Guardar Información"}
                    </Button>
                  </CardFooter>
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

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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Upload, Bell, Shield, CreditCard } from "lucide-react";

export default function PerfilPage() {
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
                        <AvatarImage src="/placeholder.svg?height=96&width=96" />
                        <AvatarFallback>JP</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Foto de Perfil</h3>
                        <p className="text-sm text-muted-foreground">
                          Esta foto se mostrará en tu perfil y en tus facturas
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Upload className="mr-2 h-4 w-4" />
                            Cambiar Foto
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive"
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input
                          id="name"
                          placeholder="Tu nombre"
                          defaultValue="Juan Pérez"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa / Marca</Label>
                        <Input
                          id="company"
                          placeholder="Tu empresa"
                          defaultValue="JP Freelance"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          defaultValue="juan@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          placeholder="Tu teléfono"
                          defaultValue="+34 612 345 678"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          id="address"
                          placeholder="Tu dirección"
                          defaultValue="Calle Principal 123"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          placeholder="Tu ciudad"
                          defaultValue="Madrid"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Input
                          id="country"
                          placeholder="Tu país"
                          defaultValue="España"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea
                          id="bio"
                          placeholder="Cuéntanos sobre ti"
                          defaultValue="Desarrollador freelance con más de 5 años de experiencia en diseño web y desarrollo de aplicaciones móviles."
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Guardar Cambios</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Seguridad de la Cuenta</CardTitle>
                    <CardDescription>
                      Gestiona tu contraseña y la seguridad de tu cuenta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Contraseña Actual
                        </Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva Contraseña</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="confirm-password">
                          Confirmar Nueva Contraseña
                        </Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Autenticación de Dos Factores
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center">
                            <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Autenticación de Dos Factores</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Añade una capa adicional de seguridad a tu cuenta
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Actualizar Seguridad</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias de Notificaciones</CardTitle>
                    <CardDescription>
                      Configura cómo y cuándo quieres recibir notificaciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Notificaciones por Correo</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-projects">
                              Actualizaciones de Proyectos
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Recibe notificaciones cuando haya cambios en tus
                              proyectos
                            </p>
                          </div>
                          <Switch id="email-projects" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-tasks">
                              Tareas Pendientes
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Recibe recordatorios de tareas próximas a vencer
                            </p>
                          </div>
                          <Switch id="email-tasks" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-invoices">
                              Facturas y Pagos
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Recibe notificaciones sobre facturas pagadas o
                              pendientes
                            </p>
                          </div>
                          <Switch id="email-invoices" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">
                        Notificaciones en la Aplicación
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="app-projects">
                              Actualizaciones de Proyectos
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Muestra notificaciones en la aplicación para
                              cambios en proyectos
                            </p>
                          </div>
                          <Switch id="app-projects" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="app-tasks">Tareas Pendientes</Label>
                            <p className="text-sm text-muted-foreground">
                              Muestra recordatorios de tareas en la aplicación
                            </p>
                          </div>
                          <Switch id="app-tasks" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="app-invoices">
                              Facturas y Pagos
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Muestra notificaciones sobre facturas en la
                              aplicación
                            </p>
                          </div>
                          <Switch id="app-invoices" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Restablecer Valores</Button>
                    <Button>Guardar Preferencias</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de Facturación</CardTitle>
                    <CardDescription>
                      Gestiona tus datos fiscales y de facturación
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tax-id">NIF / CIF</Label>
                        <Input
                          id="tax-id"
                          placeholder="Tu identificación fiscal"
                          defaultValue="B12345678"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="legal-name">
                          Nombre Legal / Razón Social
                        </Label>
                        <Input
                          id="legal-name"
                          placeholder="Nombre legal"
                          defaultValue="JP Freelance Solutions S.L."
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="billing-address">
                          Dirección Fiscal
                        </Label>
                        <Input
                          id="billing-address"
                          placeholder="Dirección fiscal"
                          defaultValue="Calle Principal 123"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-city">Ciudad</Label>
                        <Input
                          id="billing-city"
                          placeholder="Ciudad"
                          defaultValue="Madrid"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-zip">Código Postal</Label>
                        <Input
                          id="billing-zip"
                          placeholder="Código postal"
                          defaultValue="28001"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-country">País</Label>
                        <Input
                          id="billing-country"
                          placeholder="País"
                          defaultValue="España"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Moneda Predeterminada</Label>
                        <Input
                          id="currency"
                          placeholder="Moneda"
                          defaultValue="EUR"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Plantilla de Factura</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="invoice-prefix">
                            Prefijo de Factura
                          </Label>
                          <Input
                            id="invoice-prefix"
                            placeholder="Prefijo"
                            defaultValue="INV-"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="next-number">Próximo Número</Label>
                          <Input
                            id="next-number"
                            placeholder="Número"
                            defaultValue="005"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="payment-terms">
                            Condiciones de Pago
                          </Label>
                          <Textarea
                            id="payment-terms"
                            placeholder="Condiciones de pago"
                            defaultValue="Pago a 30 días desde la fecha de emisión de la factura. Transferencia bancaria a la cuenta indicada."
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Guardar Información</Button>
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

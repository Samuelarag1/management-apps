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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Play, Pause, Clock, CalendarIcon, BarChart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TimeReports } from "@/components/time-reports";
import { TimeEntryList } from "@/components/time-entry";

export default function TiempoPage() {
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
                  Registro de Tiempo
                </h1>
                <p className="text-muted-foreground">
                  Registra y analiza el tiempo dedicado a tus proyectos
                </p>
              </div>
            </div>

            <Tabs defaultValue="tracker" className="mt-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="tracker">
                  <Clock className="mr-2 h-4 w-4" />
                  Cronómetro
                </TabsTrigger>
                <TabsTrigger value="entries">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Entradas
                </TabsTrigger>
                <TabsTrigger value="reports">
                  <BarChart className="mr-2 h-4 w-4" />
                  Informes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tracker" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Registrar Tiempo</CardTitle>
                    <CardDescription>
                      Inicia el cronómetro o ingresa el tiempo manualmente
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Proyecto
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar proyecto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="redesign">
                              Rediseño Web
                            </SelectItem>
                            <SelectItem value="app">App Móvil</SelectItem>
                            <SelectItem value="marketing">
                              Campaña Marketing
                            </SelectItem>
                            <SelectItem value="shop">Tienda Online</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Tarea
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tarea" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="design">Diseño</SelectItem>
                            <SelectItem value="development">
                              Desarrollo
                            </SelectItem>
                            <SelectItem value="meeting">Reunión</SelectItem>
                            <SelectItem value="research">
                              Investigación
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Descripción
                      </label>
                      <Textarea placeholder="Describe lo que estás haciendo..." />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Fecha
                        </label>
                        <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          {new Date().toLocaleDateString()}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Duración
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="00"
                            className="w-16 text-center"
                          />
                          <span className="flex items-center">:</span>
                          <Input
                            type="text"
                            placeholder="00"
                            className="w-16 text-center"
                          />
                          <span className="flex items-center">:</span>
                          <Input
                            type="text"
                            placeholder="00"
                            className="w-16 text-center"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Play className="mr-2 h-4 w-4" />
                        Iniciar
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Pause className="mr-2 h-4 w-4" />
                        Pausar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tiempo Hoy</CardTitle>
                    <CardDescription>
                      Resumen del tiempo registrado hoy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">03:45:12</div>
                          <div className="text-sm text-muted-foreground">
                            Total de hoy
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-semibold">01:30:45</div>
                          <div className="text-sm text-muted-foreground">
                            Tiempo actual
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>Rediseño Web</div>
                          <div>02:15:30</div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div>App Móvil</div>
                          <div>01:29:42</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="entries" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Entradas de Tiempo</CardTitle>
                    <CardDescription>
                      Historial de tiempo registrado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="w-full sm:w-auto">
                        <Calendar mode="single" className="rounded-md border" />
                      </div>
                      <div className="flex-1">
                        <TimeEntryList />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informes de Tiempo</CardTitle>
                    <CardDescription>
                      Análisis del tiempo por proyecto y tarea
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        <div className="w-full sm:w-[180px]">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Periodo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="today">Hoy</SelectItem>
                              <SelectItem value="week">Esta semana</SelectItem>
                              <SelectItem value="month">Este mes</SelectItem>
                              <SelectItem value="custom">
                                Personalizado
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-full sm:w-[180px]">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Proyecto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="redesign">
                                Rediseño Web
                              </SelectItem>
                              <SelectItem value="app">App Móvil</SelectItem>
                              <SelectItem value="marketing">
                                Campaña Marketing
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-full sm:w-[180px]">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Agrupar por" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="project">Proyecto</SelectItem>
                              <SelectItem value="task">Tarea</SelectItem>
                              <SelectItem value="day">Día</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="ml-auto">Generar Informe</Button>
                      </div>

                      <TimeReports />
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

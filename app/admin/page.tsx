"use client";
import { IoIosAddCircle } from "react-icons/io";
import { columns } from "./Columns";
import { DataTable } from "./data-table";
import { GoDot } from "react-icons/go";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
const FormSchema = z.object({
  project_name: z.string().min(1, "El nombre es requerido."),
  project_description: z.string().optional(),
  status: z.enum([
    "Diseñando",
    "Desarrollando",
    "Finalizado",
    "Archivado",
    "Pausado",
  ]),
  initial_date: z.date({
    required_error: "Selecciona una fecha válida.",
  }),
  finish_date: z.date({
    required_error: "Selecciona una fecha válida.",
  }),
  pre_payment: z.boolean().optional(),
  payment: z.number().int().optional(),
  payment_date: z.date().optional(),
  hosting: z.date({ required_error: "Selecciona una fecha válida." }),
  domain: z.date({ required_error: "Selecciona una fecha válida." }),
  cloud_storage: z.date({ required_error: "Selecciona una fecha válida." }),
});

export default function DemoPage() {
  type FormSchemaType = z.infer<typeof FormSchema>;
  const handleOnSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Formulario enviado:", data);
  };

  const form = useForm<FormSchemaType>({
    defaultValues: {
      project_name: "",
      project_description: "",
      status: "Diseñando",
      initial_date: new Date(),
      finish_date: new Date(),
      pre_payment: false,
      payment_date: new Date(),
      payment: 0,
      hosting: new Date(),
      domain: new Date(),
      cloud_storage: new Date(),
    },
  });
  return (
    <>
      <div className="h-screen py-10">
        <h3 className="text-center font-bold text-3xl">Proyectos</h3>
        <div className="container flex justify-between mx-auto mt-5 p-2">
          <input
            type="search"
            className="p-2 bg-gray-200 rounded-full shadow-md border-2 border-black focus:outline-black outline-black"
            placeholder="Buscar proyecto.."
          />
          <Dialog>
            <DialogTrigger>
              <div className="shadow-md rounded-full w-fit h-fit bg-black hover:scale-110 duration-300">
                <IoIosAddCircle size={50} color="white" />
              </div>
            </DialogTrigger>
            <DialogContent className="rounded-md w-full items-center flex flex-col">
              <DialogHeader>
                <DialogTitle>Agregar nuevo proyecto</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  className="space-y-8"
                  onSubmit={form.handleSubmit(handleOnSubmit)}
                >
                  <div className="flex w-full justify-between">
                    <FormField
                      control={form.control}
                      name="project_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del proyecto</FormLabel>
                          <FormControl>
                            <Input placeholder="Proyecto 1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Diseñando">
                                  Diseñando
                                </SelectItem>
                                <SelectItem value="Desarrollando">
                                  Desarrollando
                                </SelectItem>
                                <SelectItem value="Finalizado">
                                  Finalizado
                                </SelectItem>
                                <SelectItem value="Archivado">
                                  Archivado
                                </SelectItem>
                                <SelectItem value="Pausado">Pausado</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="project_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción del proyecto</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none"
                            placeholder="Describe los puntos clave"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-around gap-2">
                    <FormField
                      control={form.control}
                      name="initial_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Fecha de inicio</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Seleccionar fecha</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => field.onChange(date)}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="finish_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Fecha de Finalizacion</FormLabel>
                          <FormControl>
                            <Popover>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <PopoverTrigger>
                                  {field.value
                                    ? format(field.value, "PPP")
                                    : "Seleccionar fecha"}
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                      if (
                                        date &&
                                        date >= form.getValues("initial_date")
                                      ) {
                                        field.onChange(date);
                                      }
                                    }}
                                    disabled={(date) =>
                                      date < form.getValues("initial_date")
                                    }
                                  />
                                </PopoverContent>

                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-around gap-2">
                    <FormField
                      control={form.control}
                      name="hosting"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Renovacion del hosting</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Seleccionar fecha</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => field.onChange(date)}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="domain"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Renovacion de dominio</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Seleccionar fecha</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => field.onChange(date)}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full flex justify-between gap-2 items-center">
                    <FormField
                      control={form.control}
                      name="payment"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Precio Final</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa el precio acordado"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Guardar Proyecto</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="container mx-auto mt-2 p-2">
          <div className="flex items-center gap-2 justify-start">
            <div className="flex items-center justify-center text-sm lg:text-lg">
              <GoDot color="yellow" />
              <p>Pendiente: </p>
            </div>
            <div className="flex items-center justify-center text-sm lg:text-lg">
              <GoDot color="blue" />
              <p>Activo</p>
            </div>
            <div className="flex items-center justify-center text-sm lg:text-lg">
              <GoDot color="red" />
              <p>Cancelado</p>
            </div>
            <div className="flex items-center justify-center text-sm lg:text-lg">
              <GoDot color="green" />
              <p>Pagado</p>
            </div>
          </div>
          <DataTable columns={columns} data={[]} />
        </div>
        <footer className="absolute bottom-0 w-full bg-black text-white p-10">
          <p className="text-center text-sm">
            &copy; 2022 - Todos los derechos reservados
          </p>
        </footer>
      </div>
    </>
  );
}

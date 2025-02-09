"use client";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import { columns } from "./Columns";
import { DataTable } from "./data-table";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "../components/Navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const FormSchema = z.object({
  project_name: z.string().min(4, "El nombre es requerido."),
  project_description: z.string().optional(),
  // status: z.enum([
  //   "Diseñando",
  //   "Desarrollando",
  //   "Finalizado",
  //   "Archivado",
  //   "Pausado",
  // ]),
  // initial_date: z.date({
  //   required_error: "Selecciona una fecha válida.",
  // }),
  // finish_date: z.string().date(),
  // pre_payment: z.number().optional(),
  payment: z.number().int().optional(),
});

export default function DemoPage() {
  const [openForm, setOpenForm] = useState(false);
  const OnSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Formulario enviado:", data);
  };
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(FormSchema),
  });

  return (
    <>
      <Navbar />
      <div className="h-screen py-20">
        <h3 className="text-center font-bold text-3xl">Proyectos</h3>
        <div className="container flex justify-center mx-auto mt-5 p-2">
          <button
            className="hover:scale-110 duration-300 shadow-md rounded-full"
            onClick={() => setOpenForm(!openForm)}
          >
            <IoIosAddCircle size={50} />
          </button>
        </div>
        <div
          className={`${
            openForm ? "visible" : "hidden"
          } h-52 bg-red-300 w-40 flex flex-col items-center`}
        >
          <button
            className="hover:scale-110 duration-300 shadow-md rounded-full bg-white"
            onClick={() => setOpenForm(!openForm)}
          >
            <IoIosCloseCircle size={50} />
          </button>
          <div>
            <form onSubmit={handleSubmit(OnSubmit)}>
              <input type="text" {...register("project_name")} id="name" />

              <textarea {...register("project_description")} id="description" />

              <input type="number" {...register("payment")} id="" />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>

        <div className="container mx-auto mt-2 p-2">
          <DataTable columns={columns} data={[]} />
        </div>
        <footer className="absolute bottom-0 w-full bg-black text-white p-10">
          <p className="text-center text-sm">
            &copy; 2025 - Todos los derechos reservados
          </p>
        </footer>
      </div>
    </>
  );
}

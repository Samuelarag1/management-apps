"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GoEye, GoPencil, GoTrash } from "react-icons/go";

export type Payment = {
  id: string;
  project_name: string;
  amount: number;
  status:
    | "Diseñando"
    | "Desarrollando"
    | "Finalizado"
    | "Archivado"
    | "Pausado";
  initial_date: string;
  time_limit: string;
  finish_date: string;
  description: string;
  pre_payment: number;
  hosting: string;
  domain: string;
  cloud_storage: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "project_name",
    header: "Nombre del proyecto",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "initial_date",
    header: "Fecha de inicio",
  },
  {
    accessorKey: "finish_date",
    header: "Fecha de finalización",
  },
  {
    accessorKey: "amount",
    header: "Precio final",
  },
  {
    accessorKey: "pre_payment",
    header: "Pago anticipado",
  },
  {
    accessorKey: "hosting",
    header: "Renovación de hosting",
  },
  {
    accessorKey: "domain",
    header: "Renovación de dominio",
  },
  {
    accessorKey: "cloud_storage",
    header: "Almacenamiento en la nube",
  },
  {
    accessorKey: "progress",
    header: "Progreso",
  },
  {
    accessorKey: "id",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => alert(`Editando: ${row.original.project_name}`)}
            className="bg-blue-500 text-white p-2 rounded-full shadow-sm shadow-black border-2 border-black hover:scale-110 duration-300"
          >
            <GoPencil size={20} />
          </button>
          <button
            onClick={() => alert(`Eliminando: ${row.original.project_name}`)}
            className="bg-red-500 text-white p-2 rounded-full shadow-sm shadow-black border-2 border-black hover:scale-110 duration-300"
          >
            <GoTrash size={20} />
          </button>
          <button
            onClick={() => alert(`Más detalles: ${row.original.project_name}`)}
            className="bg-black text-white p-2 rounded-full shadow-sm shadow-black border-2 border-black hover:scale-110 duration-300"
          >
            <GoEye size={20} />
          </button>
        </div>
      );
    },
  },
];

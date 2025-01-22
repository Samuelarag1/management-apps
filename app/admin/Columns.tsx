"use client";

import { ColumnDef } from "@tanstack/react-table";

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
  email: string;
  initial_date: string;
  time_limit: string;
  finish_date: string;
  description: string;
  pre_payment: number;
  hosting: string;
  domain: string;
  cloud_storage: string;
  total: number;
  payment_date: string;
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
    accessorKey: "amount",
    header: "Precio acordado",
  },
  {
    accessorKey: "pre_payment",
    header: "Pago anticipado",
  },
  {
    accessorKey: "payment_date",
    header: "Fecha de pago",
  },
  {
    accessorKey: "finish_date",
    header: "Fecha de finalizacion",
  },
  {
    accessorKey: "hosting",
    header: "Renovacion de hosting",
  },
  {
    accessorKey: "domain",
    header: "Renovacion de dominio",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "id",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white p-2 rounded-full">
            Editar
          </button>
          <button className="bg-red-500 text-white p-2 rounded-full">
            Eliminar
          </button>
          <button className="bg-black text-white p-2 rounded-full">
            Detalles
          </button>
        </div>
      );
    },
  },
];

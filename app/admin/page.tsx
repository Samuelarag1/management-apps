import { IoIosAddCircle } from "react-icons/io";
import { Payment, columns } from "./Columns";
import { DataTable } from "./data-table";
import { GoDot } from "react-icons/go";
import Image from "next/image";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "Diseñando",
      email: "m@example.com",
      project_name: "Project 1",
      description: "Description 1",
      initial_date: "2022-01-01",
      time_limit: "2022-02-01",
      finish_date: "2022-03-01",
      pre_payment: 50,
      hosting: "2022-01-01",
      domain: "2022-01-01",
      cloud_storage: "2022-01-01",
      payment_date: "2022-01-01",
      total: 150,
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "Diseñando",
      email: "m@example.com",
      project_name: "Project 1",
      description: "Description 1",
      initial_date: "2022-01-01",
      time_limit: "2022-02-01",
      finish_date: "2022-03-01",
      pre_payment: 50,
      hosting: "2022-01-01",
      domain: "2022-01-01",
      cloud_storage: "2022-01-01",
      payment_date: "2022-01-01",
      total: 150,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      <div className="h-screen py-10">
        {/* <Image src="/samaragtech.png" width={50} height={50} alt="logo" /> */}
        {/* <Navigation/> */}
        <h3 className="text-center font-bold text-3xl">Proyectos</h3>
        <div className="container flex justify-between mx-auto mt-5 p-2">
          <input
            type="search"
            className="p-2 bg-gray-200 rounded-full shadow-md border-2 border-black focus:outline-black outline-black"
            placeholder="Buscar proyecto.."
          />
          <button className="shadow-md rounded-full w-fit h-fit bg-black hover:scale-110 duration-300">
            <IoIosAddCircle size={50} color="white" />
          </button>
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
          <DataTable columns={columns} data={data} />
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

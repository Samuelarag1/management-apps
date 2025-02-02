import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="py-20 bg-[#d9d9d9] h-full">
      <div className="w-full ml-2">
        <p className="font-semibold text-sm italic">Hola, Samuel.</p>
      </div>
      <div className="m-2">
        <h1 className="text-3xl text-center font-bold">Dashboard</h1>
      </div>
      <div className="flex w-full mt-5">
        <div className="flex w-full justify-around flex-wrap gap-2">
          <Card className="h-40 w-80 text-center justify-between flex flex-col shadow-md">
            <CardHeader>
              <CardTitle>
                <div className="flex gap-2 font-medium justify-center">
                  <p className="text-center font-bold text-xl">
                    Proyectos en curso e historicos
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={"/projects"}
                className="bg-black text-white shadow-md p-3 rounded-md"
              >
                Proyectos
              </Link>
            </CardContent>
          </Card>
          <Card className="h-40 w-80 text-center justify-between flex flex-col shadow-md border-2">
            <CardHeader>
              <CardTitle>
                <div className="flex gap-2 font-bold text-xl">
                  Estadisticas de los proyectos en curso
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={"/metrics"}
                className="bg-black text-white shadow-md p-3 rounded-md"
              >
                Metricas
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-2">
        <Card className="h-40 w-80 text-center justify-between flex flex-col shadow-md border-2">
          <CardHeader>
            <CardTitle>
              <div className="flex gap-2 justify-center font-bold text-xl">
                Pagos
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href={"/payments"}
              className="bg-black text-white shadow-md p-3 rounded-md"
            >
              Pagos
            </Link>
          </CardContent>
        </Card>
      </div>
      <footer className="absolute bottom-0 w-full text-black p-10">
        <p className="text-center text-sm">
          &copy; 2025 - Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;

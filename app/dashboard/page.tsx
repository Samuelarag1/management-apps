import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="py-20">
      <div className="m-2">
        <h1 className="text-3xl text-center font-bold">Dashboard</h1>
      </div>
      <div className="flex w-full">
        <div className="flex w-full justify-around flex-wrap gap-2">
          <Card className="h-40 w-80 text-center justify-between flex flex-col shadow-md">
            <CardHeader>
              <CardTitle>
                <div className="flex gap-2 font-medium justify-center">
                  <p className="text-center">Proyectos en curso e historicos</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={"/projects"}
                className="bg-black text-white shadow-md p-2 rounded-full hover:scale-110 duration-300"
              >
                Proyectos
              </Link>
            </CardContent>
          </Card>
          <Card className="h-40 w-80 text-center justify-between flex flex-col shadow-md">
            <CardHeader>
              <CardTitle>
                <div className="flex gap-2 font-medium justify-center">
                  Estadisticas de los proyectos en curso
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={"/metrics"}
                className="bg-black text-white shadow-md p-2 rounded-full hover:scale-110 duration-300"
              >
                Metricas
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full bg-black text-white p-10">
        <p className="text-center text-sm">
          &copy; 2022 - Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;

import React from "react";
import Navigation from "../components/Navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Dashboard() {
  return (
    <div className="py-20">
      <div>
        <h1>Dashboard</h1>

        <p>A donde queres ir ? </p>
      </div>
      <div className="flex w-full">
        <div className="">
          <Card className="h-40 w-80 text-center">
            <CardHeader>
              <CardTitle>Proyectos</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Aca podes ver los proyectos que tenes en curso
              </div>
            </CardFooter>
            <Button>Ir</Button>
          </Card>
          <Card className="h-40 w-80 text-center">
            <CardHeader>
              <CardTitle>Metricas</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Aca podes ver las estadisticas de los proyectos en curso
              </div>
            </CardFooter>
            <Button>Ir</Button>
          </Card>
        </div>
        <Card className="h-40 w-80 text-center">
          <CardHeader>
            <CardTitle>Proyectos</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Aca podes ver los proyectos que tenes en curso
            </div>
          </CardFooter>
          <Button>Ir</Button>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;

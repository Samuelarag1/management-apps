import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { MdRemoveRedEye } from "react-icons/md";
function Projects() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Proyectos</CardTitle>
        <CardDescription>
          Proyectos en orden cronologico de entrega o cambio realizado!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Proyecto 1</h2>
                <p>Descripcion del proyecto 1</p>
              </div>
              <button className="bg-white border-solid border-2 border-black rounded-full hover:scale-110 duration-300">
                <MdRemoveRedEye size={30} />
              </button>
            </div>
          </div>
          <Separator />
          <div>
            <h2 className="text-xl font-semibold">Proyecto 2</h2>
            <p>Descripcion del proyecto 2</p>
          </div>
          <Separator />
          <div>
            <h2 className="text-xl font-semibold">Proyecto 3</h2>
            <p>Descripcion del proyecto 3</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Projects;

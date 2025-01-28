import React from "react";
import Visitors from "../components/Visitors";
import Projects from "../components/Projects";
import { Counter } from "../components/Counter";

export default function Metrics() {
  return (
    <>
      <div className="py-20 h-[100%]">
        <div className="flex flex-col-reverse lg:flex-row w-full h-full p-2 gap-2 flex-wrap lg:flex-nowrap justify-center items-center">
          <div className="lg:w-[70%] lg:h-80 w-full h-62">
            <Projects />
          </div>
          <div className="lg:w-[30%] lg:h-80 w-full h-62">
            <Visitors />
          </div>
        </div>
        <Counter />
      </div>
      <footer className="w-full bg-black text-white p-10">
        <p className="text-center text-sm">
          &copy; 2022 - Todos los derechos reservados
        </p>
      </footer>
    </>
  );
}

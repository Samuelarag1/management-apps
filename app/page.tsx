"use client";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

export default function Home() {
  const [formData, setFormdata] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const loginSchema = z.object({
    email: z.string(),
    password: z
      .string()
      .min(5, "Contraseña Invalida")
      .max(50, "Contraseña Invalida"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formData, [e?.target?.name]: e?.target?.value });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);
      console.log("Formulario valido");
      setErrors({ email: "", password: "" });

      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email: string; password: string } = {
          email: "",
          password: "",
        };
        error.errors.forEach((err) => {
          fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-around items-center  w-screen h-screen  justify-around">
      <div className="flex flex-col lg:h-full items-center lg:justify-center justify-around gap-10">
        <div>
          <Image
            src={"/samaragtech.png"}
            alt="Logo enterprise"
            height={300}
            width={300}
            className="lg:w-full lg:h-full h-[100px] w-[100px] shadow-black shadow-lg rounded-full"
          />
        </div>
        <p className="font-semibold text-xl text-center">
          Panel de administracion de proyectos personales
        </p>
      </div>
      <form
        className="bg-white  shadow-2xl shadow-black lg:h-[700px] h-[500px] w-[350px] flex flex-col items-center rounded-[15px] justify-around"
        onSubmit={handleOnSubmit}
      >
        <h1 className="text-3xl font-bold">Inicia sesion</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <strong className="ml-2">Email</strong>
            <input
              name="email"
              type="text"
              placeholder="email@email.com"
              value={formData?.email}
              onChange={handleChange}
              className="bg-gray-300 p-2 rounded-full focus:outline-none text-black w-[300px] h-[50px]"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col">
            <strong className="ml-2">Contraseña</strong>
            <input
              name="password"
              type="password"
              placeholder="********"
              onChange={handleChange}
              value={formData?.password}
              className="bg-gray-300 p-2 rounded-full focus:outline-none text-black w-[300px] h-[50px]"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </div>
        </div>
        <div>
          <button
            className="bg-blue-950 p-2 rounded-full focus:outline-none text-white w-[300px] h-[50px] mt-5 shadow-lg shadow-black border-2 border-black"
            type="submit"
          >
            Iniciar sesion
          </button>
        </div>
      </form>
    </div>
  );
}

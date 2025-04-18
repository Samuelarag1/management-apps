"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoMailSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import Loader from "./components/Loader/Loader";
import { prisma } from "@/lib/prisma";
import { Project } from "@prisma/client";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormdata] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    description: "",
  });

  const loginSchema = z.object({
    email: z.string().email("Email invalido"),
    password: z
      .string()
      .min(5, "Contraseña Invalida")
      .max(50, "Contraseña Invalida"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({ ...formData, [e?.target?.name]: e?.target?.value });
    if (formData.email === "" || formData.password === "") {
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);
      console.log("Formulario valido");
      setErrors({ email: "", password: "" });

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "same-origin",
      });

      if (response.ok) {
        setMessage("Iniciando sesión...");
        setIsLoading(true);

        setTimeout(() => {
          setAlert({ message: "", type: "", description: "" });
          router.push("/dashboard");
        }, 3000);
      } else {
        setAlert({
          message: "Error al iniciar sesion",
          type: "error",
          description: "Los datos ingresados son incorrectos",
        });
        setTimeout(() => {
          setAlert({ message: "", type: "", description: "" });
        }, 3000);
      }
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

  const createProject = async (formData: FormData) => {
    "use server";
    try {
      const data = {
        name: formData.get("name"),
        description: formData.get("description") || undefined,
      };

      const validatedData = projectScheme.parse(data);

      // Simulación de creación en base de datos (reemplazar con lógica real)
      const newProject: Project = {
        id: crypto.randomUUID(),
        name: validatedData.name,
        description: validatedData.description,
        createdAt: new Date(),
      };

      // Retornar el nuevo proyecto creado
      return { success: true, project: newProject };
    } catch (error) {
      return { success: false, error: error.errors || "Error desconocido" };
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center bg-[#d9d9d9] py-20">
        <div className="absolute bottom-0  right-0 w-36 full h-36 bg-blue-500 rounded-tl-full" />
        <div>
          <h1 className="text-4xl font-bold text-[#4C417D]">Administra</h1>
          <p className="italic text-md ml-2">by Samuel Aragon</p>
        </div>
        <form
          className="flex flex-col items-center mt-40"
          onSubmit={handleOnSubmit}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="ml-2 font-bold">Email</p>
              <div className="relative w-full max-w-xs">
                <input
                  name="email"
                  type="email"
                  placeholder="email@email.com"
                  value={formData?.email}
                  onChange={handleChange}
                  className="py-2 pl-10 pr-4 bg-white rounded-md w-full h-[55px] placeholder:text-gray-600 shadow-md font-bold focus:outline-none "
                />
                <IoMailSharp
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-center">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col">
              <p className="ml-2 font-bold">Contrasena</p>
              <div className="relative w-full max-w-xs">
                <input
                  name="password"
                  type="password"
                  placeholder="********"
                  onChange={handleChange}
                  value={formData?.password}
                  className="w-full py-2 pl-10 pr-4 bg-white rounded-md  h-[55px] placeholder:text-gray-600 shadow-md font-bold focus:outline-none text-xl"
                />
                <RiLockPasswordFill
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
              </div>

              {errors.password && (
                <span className="text-red-500 text-center">
                  {errors.password}
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              className="bg-[#255B30] font-semibold h-12 w-full rounded-full text-gray-200 shadow-sm shadow-black border-2 border-green-950 mt-12 hover:scale-110 duration-300 active:scale-105"
              type="submit"
            >
              INGRESAR
            </button>
          </div>
        </form>
        {alert.message && (
          <div className="lg:absolute lg:right-2 lg:bottom-2 w-full p-2 lg:w-fit lg:p-0">
            <Alert variant={"default"}>
              <AlertTriangle size={20} color="red" />
              <AlertTitle className="lg:text-xl font-bold text-red-500">
                {alert.message}
              </AlertTitle>
              <AlertDescription className="lg:text-lg text-red-500">
                {alert.description}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
      <Loader isLoading={isLoading} message={message} />
    </>
  );
}

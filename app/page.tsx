import Image from "next/image";
import ThemeSwitcher from "./components/Switcher";
import { Separator } from "@radix-ui/react-separator";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-around items-center  w-screen h-screen  justify-around">
      <div>
        <Image
          src={"/samaragtech.png"}
          alt="Logo enterprise"
          height={300}
          width={300}
          className="lg:w-full lg:h-full h-[100px] w-[100px]"
        />
      </div>

      <Separator />
      <div className="bg-white  shadow-2xl shadow-black lg:h-[700px] h-[500px] w-[350px] flex flex-col items-center rounded-[15px]">
        <h1 className="text-3xl">Inicia sesion</h1>
        <div className="flex flex-col">
          <strong className="ml-2">Email</strong>
          <input
            type="text"
            placeholder="email@email.com"
            className="bg-gray-300 p-2 rounded-full focus:outline-none text-white w-[300px] h-[50px]"
          />
        </div>
        <div className="flex flex-col">
          <strong className="ml-2">Contrasena</strong>
          <input
            type="password"
            placeholder="********"
            className="bg-gray-300 p-2 rounded-full focus:outline-none text-white w-[300px] h-[50px]"
          />
        </div>
        <div>
          <button className="bg-green-800 p-2 rounded-full focus:outline-none text-white w-[300px] h-[50px] mt-5 shadow-lg shadow-black border-2 border-black">
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
}

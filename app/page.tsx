import Image from "next/image";

export default function Home() {
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
      <div className="bg-white  shadow-2xl shadow-black lg:h-[700px] h-[500px] w-[350px] flex flex-col items-center rounded-[15px] justify-around">
        <h1 className="text-3xl font-bold">Inicia sesion</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <strong className="ml-2">Email</strong>
            <input
              type="text"
              placeholder="email@email.com"
              className="bg-gray-300 p-2 rounded-full focus:outline-none text-black w-[300px] h-[50px]"
            />
          </div>
          <div className="flex flex-col">
            <strong className="ml-2">Contraseña</strong>
            <input
              type="password"
              placeholder="********"
              className="bg-gray-300 p-2 rounded-full focus:outline-none text-black w-[300px] h-[50px]"
            />
          </div>
        </div>
        <div>
          <button className="bg-blue-950 p-2 rounded-full focus:outline-none text-white w-[300px] h-[50px] mt-5 shadow-lg shadow-black border-2 border-black">
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
}

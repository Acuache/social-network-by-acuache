import { Icon } from "@iconify/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { UserProps } from '../../interface'
import { useCrearUsuarioYSesionMutate } from "../../stack/LoginStack";
import { Toaster } from "sonner";

export default function Form() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  function toggleShowPassword() {
    setShowPassword(prev => !prev)
  }

  const { mutate, isPending } = useCrearUsuarioYSesionMutate()

  const { register, formState: { errors }, handleSubmit, reset } = useForm<UserProps>()
  function onSubmit(data: UserProps) {
    mutate(data)
    reset()
  }

  return (
    <div className=" flex-2 flex items-center justify-center text-black">
      <Toaster />
      <form className="bg-white w-[80%] max-w-130  flex flex-col items-center p-5 lg:p-8" onSubmit={handleSubmit(onSubmit)}>

        <div className="size-15 bg-yellow-300 overflow-hidden rounded-full">
          <img className="w-full h-full object-cover" src="https://i.blogs.es/50a1c5/t4yxpvu/1366_2000.jpeg" alt="" />
        </div>
        <h1>Create Vertex Account</h1>
        <p className="text-center">Drive growth with inteliggent automation and effortless teamwork</p>

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="inputName" className="">Nombre:</label>
              <input
                id="inputName"
                type="text"
                placeholder="Juan"
                className="border border-gray-500 focus:outline-none focus:border-[#1d7a9b] p-2 rounded-lg focus:ring-1 focus:ring-[#1d7a9b]"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Campo requerido"
                  }
                })}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="inputLastName" className="">Apellido:</label>
              <input
                id="inputLastName"
                type="text"
                placeholder="Torres"
                className="border border-gray-500 focus:outline-none focus:border-[#1d7a9b] p-2 rounded-lg focus:ring-1 focus:ring-[#1d7a9b]"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Campo requerido"
                  }
                })}
              />
            </div>
          </div>


          <div className="w-full flex flex-col gap-1">
            <label htmlFor="inputEmail" className="">Correo:</label>
            <input
              id="inputEmail"
              type="text"
              placeholder="juanramirez001@gmail.com"
              className="border border-gray-500 focus:outline-none focus:border-[#1d7a9b] p-2 rounded-lg focus:ring-1 focus:ring-[#1d7a9b]"
              {...register("email", {
                required: {
                  value: true,
                  message: "Campo requerido"
                }
              })}
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="inputContraseña" className="">Contraseña:</label>
            <div className="relative">
              <input
                id="inputContraseña"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="******"
                className="w-full border border-gray-500 focus:outline-none focus:border-[#1d7a9b] p-2 rounded-lg focus:ring-1 focus:ring-[#1d7a9b]"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Campo requerido"
                  }
                })}
              />
              <Icon icon={`${showPassword ? "mdi:eye" : "mdi:eye-off"}`} className="size-5 absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" onClick={toggleShowPassword} />
            </div>
          </div>

          <button className="bg-[#26272e] hover:bg-[#26272e]/80 text-white py-2 rounded-full cursor-pointer font-semibold" type="submit" disabled={isPending}>Registrarse</button>

          <div className="relative">
            <div className="w-full h-[1px] bg-gray-500 absolute top-1/2 z-1"></div>
            <div className="bg-white z-2 relative w-fit m-auto px-3">
              <p className="text-gray-500 text-center ">O ingresar con</p>
            </div>
          </div>

          <div className="flex gap-5 flex-wrap justify-center">
            <button className="flex-1 flex gap-2 items-center justify-center border-2 border-gray-400 py-1 rounded-full shadow-lg shadow-gray-300 cursor-pointer hover:border-gray-600 hover:shadow-lg transition-all duration-200 px-5" type="button">
              <Icon icon="flat-color-icons:google" className="size-6" />
              <span className="text-md">Google</span>
            </button>
            <button className="flex-1 flex gap-2 items-center border-2 justify-center border-gray-400 py-1 rounded-full shadow-lg shadow-gray-300 cursor-pointer  hover:border-gray-600 hover:shadow-lg transition-all duration-200 px-5" type="button">
              <Icon icon="logos:facebook" className="size-6" />
              <span className="text-md">Facebook</span>
            </button>
            <button className="flex-1 flex gap-2 items-center border-2 justify-center border-gray-400 py-1 rounded-full shadow-lg shadow-gray-300 cursor-pointer  hover:border-gray-600 hover:shadow-lg transition-all duration-200 px-5" type="button">
              <Icon icon="mdi:github" className="size-6 text-black" />
              <span className="text-md">Github</span>
            </button>
          </div>
        </div>
        <div className="flex gap-2 mt-4 text-sm">
          {/* <p className="text-gray-400 text-center">¿No tienes una cuenta?</p>
          <span className="font-bold cursor-pointer">Registrate</span> */}
          <p className="text-gray-400 text-center">¿Ya tienes una cuenta?</p>
          <span className="font-bold cursor-pointer text-center">Iniciar sesión</span>
        </div>
      </form>

    </div>
  )
}
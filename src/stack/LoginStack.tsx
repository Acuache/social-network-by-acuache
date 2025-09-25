import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/AuthStore"
import type { UserProps } from '../interface'
import { toast } from "sonner"

export const useCrearUsuarioYSesionMutate = () => {
  const { crearUserYLogin } = useAuthStore()

  return useMutation({
    mutationKey: ["crear usuario y login"],
    mutationFn: async (data: UserProps) => {
      await crearUserYLogin(data)
    },
    onSuccess: () => {
      toast.success("Registro exitosamente")
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    }
  })
}
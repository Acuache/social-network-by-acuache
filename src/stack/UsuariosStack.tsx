import { useMutation, useQuery } from '@tanstack/react-query'
import { useGlobalStore, useSubscription, useUsuariosStore } from '../store'
import { toast } from 'sonner'

export const useMostrarUsuarioAuthQuery = () => {
  const { mostrarUsuarioAuth } = useUsuariosStore()
  const { user } = useSubscription()
  return useQuery({
    queryKey: ["usuario data"],
    queryFn: () => mostrarUsuarioAuth(user?.id)

  })
}

export const useEditarUsuarioMutate = () => {
  const { editarUsuarios, dataUsuarioAuth } = useUsuariosStore()
  const { fileUrl, setOpen } = useGlobalStore()
  return useMutation({
    mutationKey: ["update user"],
    mutationFn: () => editarUsuarios(dataUsuarioAuth!.id, fileUrl),
    onSuccess: () => {
      setOpen()
      toast.success("Actualizado correctamente.")
    },
    onError: (error) => toast.success("Algo falló " + error)
  })
}
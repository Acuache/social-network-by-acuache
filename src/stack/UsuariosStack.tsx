import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  const { editarUsuarios, dataUsuarioAuth, mostrarUsuarioAuth } = useUsuariosStore()
  const { fileUrl, setOpen } = useGlobalStore()
  const { user } = useSubscription()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["update user"],
    mutationFn: () => editarUsuarios(dataUsuarioAuth!.id, fileUrl),
    onSuccess: async () => {
      await mostrarUsuarioAuth(user?.id)
      queryClient.invalidateQueries({ queryKey: ["usuario data"] })
      queryClient.invalidateQueries({ queryKey: ["mostrar post"] })
      setOpen()
      toast.success("Actualizado correctamente.")
    },
    onError: (error) => toast.error("Algo falló " + error)
  })
}
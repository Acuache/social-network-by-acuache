import { useQuery } from '@tanstack/react-query'
import { useSubscription, useUsuariosStore } from '../store'

export const useMostrarUsuarioAuthQuery = () => {
  const { mostrarUsuarioAuth } = useUsuariosStore()
  const { user } = useSubscription()
  return useQuery({
    queryKey: ["usuario data"],
    queryFn: () => mostrarUsuarioAuth(user?.id)

  })
}
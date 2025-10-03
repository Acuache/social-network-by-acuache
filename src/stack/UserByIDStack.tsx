import { useQuery } from "@tanstack/react-query";
import { useUserByIDStore } from '../store'

export function useUserByIDQuery(id: number) {
  const { obtenerUsuarioByID } = useUserByIDStore()
  return useQuery({
    queryKey: ["usuario por id", id],
    queryFn: () => obtenerUsuarioByID(id),
  })
}
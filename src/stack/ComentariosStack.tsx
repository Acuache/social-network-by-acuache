import { useMutation, useQuery } from "@tanstack/react-query"
import { useComentariosStore, usePostStore, useUsuariosStore } from '../store'
import { useFormattedDate } from "../hooks"
import { toast } from "sonner"
export const useComentarioStackMutate = (object: string, setComentario: (a: string) => void) => {
  const { insertarComentario } = useComentariosStore()
  const { dataUsuarioAuth } = useUsuariosStore()
  const { itemSelect } = usePostStore()
  const fechaActual = useFormattedDate()
  return useMutation({
    mutationKey: ["insertar comentario"],
    mutationFn: async () => await insertarComentario({
      comentario: object,
      id_usuario: dataUsuarioAuth!.id,
      id_publicacion: itemSelect,
      fecha: fechaActual
    }),
    onError: (error) => (
      toast.error("Error en poner el comentario: " + error.message)
    ),
    onSuccess: () => {
      toast.success("Comentario agregado")
      setComentario("")
    }
  })
}

export const useMostrarComentarioStackQuery = () => {
  const { mostrarComentarios } = useComentariosStore()
  const { itemPost } = usePostStore()
  return useQuery({
    queryKey: ["mostrar comentarios", { id: itemPost.id }],
    queryFn: () => mostrarComentarios(itemPost.id)
  })
}
import { useMutation } from "@tanstack/react-query"
import { usePostStore, useUsuariosStore } from '../store'
import { useFormattedDate } from '../hooks'
import type { PublicacionesProps } from '../interface'
import { toast } from "sonner"

interface dataProps extends PublicacionesProps {
  file: File | undefined
}

export const useInsertarPostMutate = () => {
  const { insertarPost, file } = usePostStore()
  const { dataUsuarioAuth } = useUsuariosStore()
  const fechaActual = useFormattedDate()
  return useMutation({
    mutationKey: ["insertar post"],
    mutationFn: async (data: string) => {
      let type = "imagen"
      if (file && file.name) {
        const ext = file.name.split(".").pop()?.toLowerCase()
        if (ext === "mp4") type = "video"
      }
      const dataPublication: PublicacionesProps = {
        descripcion: data,
        foto: "-",
        fecha: fechaActual,
        id_usuario: dataUsuarioAuth!.id,
        type: type
      }
      await insertarPost(dataPublication, file!)
    },
    onError: (error) => {
      toast.error("Error al insertar post: " + error.message)
    },
    onSuccess: () => {
      toast.success("Publicado")
    }

  })
}
import { useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { usePostStore, useUsuariosStore } from '../store'
import { useFormattedDate } from '../hooks'
import type { PublicacionesProps } from '../interface'
import { toast } from "sonner"


export const useInsertarPostMutate = () => {
  const { insertarPost, file, setStateImage, setFile, setStateForm } = usePostStore()
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
      setFile(null)
      setStateImage()
      setStateForm()
    }
  })
}

export const useMostrarPostQuery = () => {
  const { dataUsuarioAuth } = useUsuariosStore()
  const { mostrarPost } = usePostStore()
  return useInfiniteQuery({
    queryKey: ["mostrar post", { id_usuario: dataUsuarioAuth?.id }],
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const data = await mostrarPost(dataUsuarioAuth!.id, pageParam, 10)
      return data
    },
    getNextPageParam: (lastPage: any[], allPages) => {
      if (!lastPage || lastPage.length < 10) return undefined
      return allPages.length * 10
    }
  })
}
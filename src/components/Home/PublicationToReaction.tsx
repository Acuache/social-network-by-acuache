import { Icon } from "@iconify/react";
import { useComentariosStore, usePostStore } from "../../store";
import { useLikePostMutate } from "../../stack/PostStack";

export default function PublicationToReaction({ id_post, like_usuario_actual, likes, comentario_count }: { id_post: number, like_usuario_actual: boolean, likes: number, comentario_count: number }) {
  const { setItemSelec } = usePostStore()
  const { mutate } = useLikePostMutate()
  const { setShowModal } = useComentariosStore()
  return (
    <>
      <div className="w-full flex gap-4 items-center justify-between">
        <button className=" cursor-pointer  p-2 rounded-full" onClick={() => { setItemSelec(id_post); mutate() }}>
          <Icon className={`${like_usuario_actual ? "text-red-700" : "text-gray-400 hover:bg-[#4EB8E933]"}`} icon={`${like_usuario_actual ? "mdi:heart" : "mdi:heart-outline"}`} width={26} height={26} />
        </button>

        <button className="flex gap-2 items-center px-4 text-gray-400 justify-center cursor-pointer hover:bg-[#4EB8E933] p-2 rounded-full" onClick={() => { setItemSelec(id_post), setShowModal(true) }}>
          <Icon className="" icon="mdi:comment-outline" width={26} height={26} />
          <span>Comentar</span>
        </button>

      </div>
      <div className="w-full flex items-center -mt-4 gap-4 px-2">
        {
          likes > 0 && (
            <span className="text-xs text-gray-400">{likes} me gusta</span>
          )
        }
        {
          comentario_count > 0 && (
            <span className="text-xs text-gray-400 hover:underline cursor-pointer">{comentario_count} comentarios</span>
          )
        }
      </div>
    </>
  )
}
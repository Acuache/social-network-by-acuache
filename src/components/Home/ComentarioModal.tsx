import { Icon } from "@iconify/react";
import { useComentarioStackMutate } from "../../stack";
import { useState } from "react";
import { useComentariosStore } from "../../store";
export default function ComentarioModal() {
  const { setShowModal } = useComentariosStore()
  const [comentario, setComentario] = useState("")
  const { mutate, } = useComentarioStackMutate(comentario, setComentario)
  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="dark: bg-neutral-900 rounded-xl w-full max-w-2xl max-h-[90dvh] overflow-hidden shadow-xl flex flex-col p-5">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-black dark:text-white">
            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRMVVWl_8HYbRBNt1xoEQJlXHzvF_ZsbcmnoHJPi_Gi_LyoJ8P1AEjfvdPAnq6iORVsL222nbF3xU4ACJ-gri9KkKebi8nYMCn-kinM3w" alt="" className="size-10 object-cover rounded-full" />
            <div className="flex items-center gap-2">
              <span className="font-bold lg:max-w-none lg:overflow-visible md:text-ellipsis max-w-[200px] truncate whitespace-nowrap overflow-hidden">Nombre usuario</span>
            </div>
          </div>
          <button className="cursor-pointer hover:opacity-60" onClick={() => setShowModal(false)}>
            <Icon icon="material-symbols:close" width="24" height="24" />
          </button>
        </header>
        <span>Descripcion</span>
        <div>
          imagen
        </div>
        <section className="flex items-center gap-2 p-4 bg-white dark:bg-neutral-900">
          <section className="w-full gap-2 flex flex-col">
            <section className="flex w-full gap-4">
              <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRMVVWl_8HYbRBNt1xoEQJlXHzvF_ZsbcmnoHJPi_Gi_LyoJ8P1AEjfvdPAnq6iORVsL222nbF3xU4ACJ-gri9KkKebi8nYMCn-kinM3w" alt="" className="size-10 rounded-full object-cover" />
              <input
                placeholder="Escriba un comentario"
                className="flex-1 bg-gray-100 dark:bg-neutral-800 text-sm rounded-2xl px-4 py-2 focus:outline-none resize-none"
                type="text"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              <button className="text-gray-500 hover:text-gray-700 relative">
                <Icon icon="mdi:emoticon-outline" width="24" height="24" />
              </button>
            </section>
            <section className="flex justify-end">
              <button className="flex gap-1 items-center px-4 py-2 rounded-full text-sm  text-gray-500 cursor-not-allowed" onClick={() => mutate()}>
                <Icon icon="iconamoon:send-fill" width="24" height="24" />
                Publicar
              </button>
            </section>
          </section>
        </section>
      </div>
    </div>
  )
}
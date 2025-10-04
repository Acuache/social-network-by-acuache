import { Icon } from "@iconify/react";
import { useComentarioStackMutate, useMostrarComentarioStackQuery } from "../../stack";
import { useState, useRef } from "react";
import { useComentariosStore, usePostStore, useUsuariosStore } from "../../store";
import EmojiPicker, { Theme } from 'emoji-picker-react';

import type { EmojiClickData } from 'emoji-picker-react';
import ComentarioCard from "./ComentarioCard";


export default function ComentarioModal() {
  const { setShowModal } = useComentariosStore()
  const [comentario, setComentario] = useState("")
  const { mutate, } = useComentarioStackMutate(comentario, setComentario)

  const refText = useRef<HTMLInputElement>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

  const addEmoji = (emojiData: EmojiClickData) => {
    const emojiChar = emojiData.emoji
    const textarea = refText.current
    if (!textarea) return
    const start = textarea.selectionStart ?? 0
    const end = textarea.selectionEnd ?? 0
    const originalText = textarea.value
    const newText = originalText.substring(0, start) + emojiChar + originalText.substring(end)
    setComentario(newText)
    setShowEmojiPicker(prev => !prev)

    // Actualizar la posición del cursor después del emoji
    setTimeout(() => {
      const newCursorPosition = start + emojiChar.length
      textarea.setSelectionRange(newCursorPosition, newCursorPosition)
      textarea.focus()
    }, 0)
  }

  const { dataUsuarioAuth: user } = useUsuariosStore()
  const { itemPost: post } = usePostStore()

  const { data } = useMostrarComentarioStackQuery()
  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-xl w-full max-w-2xl max-h-[90dvh] overflow-hidden shadow-xl flex flex-col p-5">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-black dark:text-white">
            <img src={"asd"} alt="" className="size-10 object-cover rounded-full" />
            <div className="flex items-center gap-2">
              <span className="font-bold lg:max-w-none lg:overflow-visible md:text-ellipsis max-w-[200px] truncate whitespace-nowrap overflow-hidden">{post?.name_user} {post?.lastname_user}</span>
            </div>
          </div>
          <button className="cursor-pointer hover:opacity-60 relative" onClick={() => setShowModal(false)}>
            <Icon icon="material-symbols:close" width="24" height="24" />
            {
              showEmojiPicker && (
                <div className="absolute -left-80 -top-5">
                  <EmojiPicker searchDisabled onEmojiClick={addEmoji} theme={Theme.AUTO} width={300} />
                </div>
              )
            }
          </button>
        </header>
        <span>{post?.descripcion}</span>
        <div>
          <img src={post?.foto} alt="" />
        </div>
        <section className="flex flex-col gap-4">
          {
            data?.map((item, index) => {
              return (
                <ComentarioCard key={index} {...item} />
              )
            })
          }
        </section>
        <section className="flex items-center gap-2 p-4 bg-white dark:bg-neutral-900">
          <section className="w-full gap-2 flex flex-col">
            <section className="flex w-full gap-4">
              <img src={user?.photo} alt="" className="size-10 rounded-full object-cover" />
              <input
                placeholder="Escriba un comentario"
                className="flex-1 bg-gray-100 dark:bg-neutral-800 text-sm rounded-2xl px-4 py-2 focus:outline-none resize-none"
                type="text"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                ref={refText}
              />
              <button className="text-gray-500 hover:text-gray-700 relative cursor-pointer" onClick={() => setShowEmojiPicker(prev => !prev)}>
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
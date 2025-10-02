import { Icon } from "@iconify/react";
import { useUsuariosStore } from '../../store'
import EmojiPicker, { Theme } from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';
import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { ImageSelector } from '../../hooks'
import { usePostStore } from '../../store'
import { useInsertarPostMutate } from '../../stack'
import { useForm } from 'react-hook-form'


interface FormData {
  description: string
}

export default function FormPost() {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const { dataUsuarioAuth: user } = useUsuariosStore()
  const refTextArea = useRef<HTMLTextAreaElement>(null)
  const [postText, setPostText] = useState<string>("")
  const addEmoji = (emojiData: EmojiClickData) => {
    const emojiChar = emojiData.emoji
    const textarea = refTextArea.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const originalText = textarea.value
    const newText = originalText.substring(0, start) + emojiChar + originalText.substring(end)
    setPostText(newText)
    setShowEmojiPicker(prev => !prev)

    // Actualizar la posición del cursor después del emoji
    setTimeout(() => {
      const newCursorPosition = start + emojiChar.length
      textarea.setSelectionRange(newCursorPosition, newCursorPosition)
      textarea.focus()
    }, 0)
  }
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
    setValue("description", e.target.value)
  };
  const { stateImage, setStateImage, file, setStateForm } = usePostStore()

  const { handleSubmit, setValue } = useForm<FormData>()
  const { mutate, isPending } = useInsertarPostMutate()

  function onSubmit(data: FormData) {
    mutate(data.description)
  }

  const puedePublicar = postText.trim().length > 0 || file !== null

  return (
    <section className="fixed w-full h-fill inset-0  dark:bg-black/50 backdrop-blur-sm z-11 flex justify-center items-center" >
      <div className="w-lg max-w-xl bg-[#f7faf9] dark:bg-[#171717] p-4 flex flex-col gap-4">
        <header className="flex justify-between items-center border-b-1 border-amber-50/30 pb-4">
          <p className="font-bold text-xl">Crear publicación</p>
          <Icon icon="material-symbols:close" className="size-7 cursor-pointer" onClick={setStateForm} />
        </header>
        <article className="flex flex-col gap-2">
          <header className="flex gap-2 items-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-DxLh4oV1NCm2a101jtYxOimBnLZNkiiBQ&s" alt="" className="size-12 object-cover rounded-full" />
            <span>{user!.name} {user!.lastname}</span>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea ref={refTextArea} value={postText} onChange={handleTextChange} className="w-full resize-none outline-none" rows={3} placeholder={`¿Qué estás pensando, ${user!.name}?`}></textarea>
            <div className="flex justify-between items-center">
              <button type="submit" className={`py-2 px-4 rounded-lg font-medium   text-white ${puedePublicar ? "bg-primary cursor-pointer hover:bg-primary/70" : "bg-gray-400 cursor-not-allowed"}`} disabled={!puedePublicar || isPending}>Publicar</button>
              <div className="relative" onClick={() => setShowEmojiPicker(prev => !prev)}>
                <button type="button" className="cursor-pointer hover:bg-gray-400/10 p-1 rounded-full">
                  <Icon icon="mdi:emoticon-outline" className="size-7 cursor-pointer dark:text-white/50 text-black/50" />
                </button>
                {
                  showEmojiPicker && (
                    <div className="absolute -left-80 -top-5">
                      <EmojiPicker searchDisabled onEmojiClick={addEmoji} theme={Theme.AUTO} width={300} />
                    </div>
                  )
                }
              </div>
            </div>
          </form>
          {
            stateImage && <ImageSelector />
          }
          <footer className="mt-4 flex items-center justify-between p-4 border border-gray-500/40 rounded-lg">
            <span className="text-sm">Agregar a tu publicación</span>
            <button
              type="button"
              onClick={setStateImage}
              className="hover:bg-gray-400/10 p-1 rounded-full"

            >
              <Icon icon="mdi:image" className="size-7 cursor-pointer dark:text-white/50 text-black/50" />
            </button>
          </footer>
        </article>
      </div>
    </section>
  )
}
import { useState } from "react"
import { ImageSelectorFoto } from "../../hooks"
import { useForm } from "react-hook-form"
import { useEditarUsuarioMutate } from "../../stack"
import { useGlobalStore } from "../../store"

const IMAGENES = [
  "https://winqusjulwbyubafginn.supabase.co/storage/v1/object/public/archivos/DeafultPhoto/man-1.jpg",
  "https://winqusjulwbyubafginn.supabase.co/storage/v1/object/public/archivos/DeafultPhoto/man-2.jpg",
  "https://winqusjulwbyubafginn.supabase.co/storage/v1/object/public/archivos/DeafultPhoto/woman-1.jpg",
  "https://winqusjulwbyubafginn.supabase.co/storage/v1/object/public/archivos/DeafultPhoto/woman-2.jpg"
]
export default function FormUpdateUser() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const isOpen = false

  const { setFileUrl } = useGlobalStore()
  const { mutate } = useEditarUsuarioMutate()
  const { handleSubmit } = useForm({})
  function onsubmit() {
    if (!selectedPhoto) return
    setFileUrl(selectedPhoto!)
    mutate()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Actualización de datos
        </h1>
        <h2 className="text-center text-lg mb-4">Eligue tu avatar</h2>
        <div className="flex flex-wrap gap-4 mb-4 items-center justify-center">
          {
            IMAGENES.map((url, index) => (
              <img
                className={`size-20 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity ${selectedPhoto === url && isOpen === false ? "ring-4 ring-white" : ""}`}
                onClick={() => {
                  setSelectedPhoto(url)
                }}
                src={url}
                alt={`imagen-${index}`}
                key={index}
              />
            ))
          }
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          {
            isOpen && <ImageSelectorFoto />
          }

          <button
            type="submit"
            className={`w-full py-3 rounded-full font-medium transition duration-200 ${selectedPhoto
              ? "bg-[#00AFF0] text-white hover:opacity-90 cursor-pointer"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            GUARDAR
          </button>

        </form>

      </div>
    </div>
  )
}
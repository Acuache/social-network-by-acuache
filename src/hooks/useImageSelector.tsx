import { useRef, useState } from "react"
import type { ChangeEvent, DragEvent } from "react"
import { usePostStore } from '../store'
import { toast } from "sonner"
import imageCompression from 'browser-image-compression';
import { Icon } from "@iconify/react";

export function useImageSelector() {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string>("")
  const [fileType, setFileType] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setFile: setFilePost } = usePostStore()
  const [isDragging, setIsDragging] = useState(false)
  const openFileSelector = () => {
    fileInputRef.current?.click()
  }
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return
    const sizeMB = selectedFile.size / (1024 * 1024)

    const type = selectedFile.type
    if (!type.startsWith("image/") && !type.startsWith("video/")) {
      toast.error("Solo se permite imagenes o videos.")
      return
    }
    if (type.startsWith("image/")) {
      if (sizeMB > 2) {
        toast.error("El archivo supera el límite de 2MB.")
        return
      }
      try {
        const options = {
          maxSizeMB: sizeMB > 1 ? 0.1 : 0.2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        const compressedFile = await imageCompression(selectedFile, options)
        const reader = new FileReader()
        reader.readAsDataURL(compressedFile)
        reader.onload = () => setFileUrl(reader.result as string)
        setFile(compressedFile)
        setFilePost(compressedFile)
        setFileType("image")
      } catch (error) {
        toast.error("Hubo un error en procesar la imagen")
      }
    } else {
      const videoURL = URL.createObjectURL(selectedFile)
      setFile(selectedFile)
      setFilePost(selectedFile)
      setFileUrl(videoURL)
      setFileType("video")
    }
  }
  const removeImage = () => {
    setFile(null);
    setFileUrl("");
    setFileType("");
    setFilePost(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    // Crear un evento sintético válido
    const syntheticEvent = {
      target: {
        files: e.dataTransfer.files
      }
    } as ChangeEvent<HTMLInputElement>;

    await handleImageChange(syntheticEvent);
  };

  return {
    file, fileUrl, fileType, fileInputRef, handleImageChange, openFileSelector, removeImage, isDragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop
  }
}

export const ImageSelector = () => {
  const { fileUrl, fileType, fileInputRef, handleImageChange, openFileSelector, removeImage, isDragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useImageSelector()

  return (
    <div className="relative w-full max-w-md bg-[#242526] rounded-lg shadow-xl overflow-hidden">
      <header className="relative h-12 flex items-center justify-center border-b border-gray-700">
        <h2 className="text-white font-medium">Agregar fotos/videos</h2>
        <button className="absolute right-4 text-gray-400 hover:text-white transition-colors duration-200">
          <Icon icon="mdi:close" className="text-xl" />
        </button>
      </header>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`p-8 flex flex-col items-center justify-center min-h-[200px] transition-colors duration-300 ${isDragging ? "bg-[#3a3b3c]" : "bg-[#242526]"}`}
      >
        {
          fileUrl ? (
            <div className="relative inline-block group">
              {
                fileType === "image" ? (
                  <img className="w-full max-w-[280px] max-h-[280px] rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]" src={fileUrl} alt="" />
                ) : (
                  <video className="w-full max-w-[280px] max-h-[280px] rounded-lg object-contain" src={fileUrl} controls />
                )
              }
              <button type="button" className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full border-none cursor-pointer flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 hover:bg-opacity-80" onClick={removeImage}>
                <Icon icon="mdi:close" className="text-white text-lg" />
              </button>
              <button
                type="button"
                className="absolute bottom-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full border-none cursor-pointer flex items-center justify-center transition duration-300 opacity-0 group-hover:opacity-100 hover:bg-opacity-80"
                onClick={openFileSelector}
              >
                <Icon
                  icon="lets-icons:edit-fill"
                  className="text-white text-lg"
                />
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-[#3a3b3c] flex items-center justify-center mb-4">
                <Icon
                  icon="mdi:video-image"
                  className="text-3xl text-[#e4e6eb]"
                />
              </div>
              <h3 className="text-white text-lg font-medium mb-1">
                Agregar fotos/videos
              </h3>
              <p className="text-gray-400 text-sm">o arrastra y suelta</p>
              <button
                onClick={openFileSelector}
                className="mt-6 px-4 py-2 bg-[#3a3b3c] text-white rounded-lg hover:bg-[#4a4b4c] transition-colors duration-200"
              >
                Seleccionar archivos
              </button>
            </>
          )
        }
      </div>
      <input
        type="file"
        accept="image/*, video/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

    </div >
  )
} 
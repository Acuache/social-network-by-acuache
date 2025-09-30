import { useRef, useState, type ReactHTMLElement } from "react"
import { usePostStore } from '../store'
import { toast } from "sonner"
export function useImageSelector() {
  const [file, setFile] = useState(null)
  const [fileUrl, setFileUrl] = useState("")
  const [fileType, setFileType] = useState("")
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const { setFile: setFilePost } = usePostStore()
  const openFileSelector = () => {
    fileInputRef.current?.click()
  }
  const handleImageChange = async (e: ReactHTMLElement) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return
    const sizeMB = selectedFile.size / (1024 * 1024)

    const type = selectedFile.type
    if (!type.starWith("image/") && !type.starWith("video/")) {
      toast.error("Solo se permite imagenes o videos.")
      return
    }
    if (type.starWith("image/")) {
      if (sizeMB > 2) {
        toast.error("El archivo supera el límite de 2MB.")
        return
      }

    }
  }
  return (
    <div>useImageSelector</div>
  )
}

export const ImageSelector = () => {
  return <div>
    Hola mundo
  </div>
} 
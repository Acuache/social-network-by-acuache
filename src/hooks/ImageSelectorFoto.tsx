import { Icon } from "@iconify/react";
import { useRef } from "react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { useGlobalStore } from "../store";

export const ImageSelectorFoto = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setFile, setFileUrl, fileUrl } = useGlobalStore()

  function openFileSelector() {
    fileInputRef.current?.click()
  }
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectFile = e.target.files?.[0]
    if (!selectFile) {
      return
    }
    if (!selectFile.type.startsWith("image/")) {
      return
    }
    try {
      const options = {
        maxSizeMB: selectFile.size > 1024 * 2024 ? 0.1 : 0.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(selectFile, options);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(compressedFile);
      setFile(compressedFile)
      fileReader.onload = () => {
        setFileUrl(fileReader.result as string);
      };
    } catch (error) {
      toast.error("Error al comprimir la imagen" + error)
    }
  }

  return (
    <div className="text-center mb-5">
      <div className="relative inline-block">
        <img src={fileUrl !== "" ? fileUrl : "https://i.ibb.co/39y0kysq/subir.png"} className="size-20 rounded-full object-cover transition-transform duration-300 hover:scale-105" />
        <button className="absolute top-2 left-14 w-7 h-7 bg-neutral-800 hover:bg-neutral-600 text-white rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer" onClick={openFileSelector}>
          <Icon icon="lets-icons:edit-fill" className="text-[18px]" />
        </button>
        <input ref={fileInputRef} accept="image/jpeg, image/png, /*" type="file" className="hidden" onChange={handleImageChange} />
      </div>
    </div>
  )
}
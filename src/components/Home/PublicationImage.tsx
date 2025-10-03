import { useRef } from 'react'
import { useImageExtractColor } from '../../hooks'

interface PublicationImageProp {
  foto: string
  type: string
}

export default function PublicationImage({ foto, type }: PublicationImageProp) {
  const imgRef = useRef<HTMLImageElement>(null)
  const bgColor = useImageExtractColor(imgRef, foto)

  return (
    <div
      className="rounded-lg overflow-hidden flex justify-center items-center"
      style={{ backgroundColor: bgColor }}
    >
      {
        type === "imagen" && foto && (

          <img
            ref={imgRef}
            className="w-max-[500px] max-h-[500px] object-contain"
            src={foto}
            alt=""
            crossOrigin="anonymous"
          />
        )
      }
      {
        type === "video" && (
          <video
            muted
            src={foto}
            controls
            className="w-max-[500px] max-h-[500px] object-contain"
            crossOrigin='anonymous'
          ></video>
        )
      }
    </div>
  )
}
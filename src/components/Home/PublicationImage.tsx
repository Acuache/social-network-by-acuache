import { useRef } from 'react'
import { useImageExtractColor } from '../../hooks'

interface PublicationImageProp {
  src: string
}

export default function PublicationImage({ src }: PublicationImageProp) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const bgColor = useImageExtractColor(imgRef, src)

  return (
    <div
      className="rounded-lg overflow-hidden flex justify-center items-center"
      style={{ backgroundColor: bgColor }}
    >
      <img
        ref={imgRef}
        className="w-max-[500px] max-h-[500px] object-contain"
        src={src}
        alt=""
        crossOrigin="anonymous"
      />
    </div>
  )
}
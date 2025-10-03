import { useRef, useEffect } from 'react'
import { useImageExtractColor } from '../../hooks'
import { useInView } from "react-intersection-observer";

interface PublicationImageProp {
  foto: string
  type: string
}

export default function PublicationImage({ foto, type }: PublicationImageProp) {
  const imgRef = useRef<HTMLImageElement>(null)
  const bgColor = useImageExtractColor(imgRef, foto)

  const videoRef = useRef<HTMLVideoElement>(null)

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  useEffect(() => {
    if (type === "video" && videoRef.current) {
      if (!inView) {
        videoRef.current.pause()
      }
    }
  }, [inView, type])

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
            ref={(el) => {
              videoRef.current = el
              inViewRef(el)
            }}
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
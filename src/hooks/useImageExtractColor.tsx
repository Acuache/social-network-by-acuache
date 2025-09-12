import { useEffect, useState } from "react"
import type { RefObject } from "react"
import { FastAverageColor } from 'fast-average-color';

interface useImageExtractColorFn {
  (imgRef: RefObject<HTMLImageElement>, src: string): void | string
}

export const useImageExtractColor: useImageExtractColorFn = (imgRef, src) => {
  const [bgColor, setBgColor] = useState<string>("#fff")
  useEffect(() => {

    const fac = new FastAverageColor();
    const img = imgRef.current
    if (!img) {
      fac.destroy()
      return
    }
    const handleLoad = async () => {
      try {
        const color = await fac.getColorAsync(img)
        setBgColor(color.hex)
      } catch {
        console.warn("No se puedo obtener el color por defecto, color por defecto #fff")
      }
    }

    if (img.complete) {
      handleLoad()
    } else {
      img.addEventListener("load", handleLoad)
      return () => img.removeEventListener("load", handleLoad)
    }
  }, [src])
  return bgColor
}
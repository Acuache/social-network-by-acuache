import { useEffect, useState, type RefObject } from "react";
import { FastAverageColor } from "fast-average-color";

type UseImageExtractColor = (imgRef: RefObject<HTMLImageElement>, src: string) => string;

export const useImageExtractColor: UseImageExtractColor = (imgRef, src) => {
  const [bgColor, setBgColor] = useState<string>("#000");

  useEffect(() => {
    const fac = new FastAverageColor();
    const img = imgRef.current;
    if (!img) {
      fac.destroy();
      return;
    }

    let mounted = true;

    const handleLoad = async () => {
      try {
        const color = await fac.getColorAsync(img);
        if (mounted) setBgColor(color.hex);
      } catch {
        console.warn("No se pudo obtener el color; usando #000 por defecto");
      }
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
    }

    return () => {
      mounted = false;
      img.removeEventListener("load", handleLoad);
      fac.destroy();
    };
  }, [imgRef, src]);

  return bgColor;
};
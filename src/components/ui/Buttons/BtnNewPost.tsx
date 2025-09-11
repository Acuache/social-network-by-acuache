import { Icon } from "@iconify/react";

export default function BtnNewPost() {
  return (
    <button className="size-10 sm:size-auto flex justify-center mt-4 bg-primary hover:bg-primary/90 font-semibold py-2 rounded-full items-center gap-2 transition cursor-pointer sm:px-4 sm:justify-start">
      <Icon icon="ic:baseline-add" width={24} height={24} />
      <span className="hidden sm:inline">NUEVA PUBLICACIÓN</span>
    </button>
  )
}
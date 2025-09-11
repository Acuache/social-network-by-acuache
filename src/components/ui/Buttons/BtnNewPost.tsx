import { Icon } from "@iconify/react";

export default function BtnNewPost() {
  return (
    <button className="flex mt-4 bg-primary hover:bg-primary/90 font-semibold p-2 px-4 rounded-full items-center gap-2 transition cursor-pointer">
      <Icon icon="ic:baseline-add" width={24} height={24} />
      <span>NUEVA PUBLICACIÓN</span>
    </button>
  )
}
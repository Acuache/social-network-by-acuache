import { Icon } from "@iconify/react";
export default function PublicationHeader({ id_usuario }: { id_usuario: number }) {

  return (
    <header className="flex justify-between">
      <div className="flex items-center gap-3">
        <img src="https://alfabetajuega.com/hero/2024/12/esta-fue-la-inspiracion-de-oda-para-crear-a-monkey-d.-luffy.jpg?width=768&aspect_ratio=16:9&format=nowebp" alt="" className="size-10 object-cover rounded-full" />
        <span className="font-bold
        ">User</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-sm">hace 8h</span>
        <Icon icon="mdi:dots-horizontal" />
      </div>
    </header>
  )
}
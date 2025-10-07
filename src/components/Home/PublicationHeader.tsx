import { Icon } from "@iconify/react";
export default function PublicationHeader({ name_user, lastname_user, photo }: { name_user: string, lastname_user: string, photo: string }) {
  // Manejar el caso cuando la foto es "-" o está vacía
  const photoUrl = photo && photo !== '-' ? photo : 'https://via.placeholder.com/150'

  return (
    <header className="flex justify-between">
      <div className="flex items-center gap-3">
        <img src={photoUrl} alt="" className="size-10 object-cover rounded-full" />
        <span className="font-bold
        ">{name_user} {lastname_user}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-sm">hace 8h</span>
        <Icon icon="mdi:dots-horizontal" />
      </div>
    </header>
  )
}
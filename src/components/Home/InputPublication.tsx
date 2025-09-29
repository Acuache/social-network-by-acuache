import { Icon } from "@iconify/react";
import { useUsuariosStore } from '../../store'
export default function InputPublication() {
  const { dataUsuarioAuth } = useUsuariosStore()
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-600">
      <div className="dark:bg-[#252728] dark:hover:bg-[#484849] text-md text-[#b8bbbf] p-2 rounded-full px-5 cursor-pointer">
        <p>¿Qué estás pensando , {dataUsuarioAuth?.name}?</p>
      </div>
      <div className="flex gap-4 text-gray-400">
        <Icon icon="mdi:image-outline" width="24" height="24" />
        <Icon icon="mdi:format-list-bulleted" width="24" height="24" />
        <Icon icon="mdi:gif" width="24" height="24" />
        <Icon icon="mdi:format-text" width="24" height="24" />
      </div>
    </div>
  )
}
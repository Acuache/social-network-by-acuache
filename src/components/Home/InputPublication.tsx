import { Icon } from "@iconify/react";
import { useUsuariosStore } from '../../store'
import { FormPost } from '../Home'
import { useState } from "react";
export default function InputPublication() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleClick = () => (
    setIsOpen(prev => !prev)
  )
  const { dataUsuarioAuth } = useUsuariosStore()
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-600">
      <div className="dark:bg-[#252728] dark:hover:bg-[#484849] text-md text-[#b8bbbf] p-2 rounded-full px-5 cursor-pointer transition-colors duration-300" onClick={handleClick}>
        <p>¿Qué estás pensando , {dataUsuarioAuth?.name}?</p>
      </div>
      {isOpen && (
        <FormPost handleClick={handleClick} />
      )}
      <div className="flex gap-4 text-gray-400">
        <Icon icon="mdi:image-outline" width="24" height="24" />
        <Icon icon="mdi:format-list-bulleted" width="24" height="24" />
        <Icon icon="mdi:gif" width="24" height="24" />
        <Icon icon="mdi:format-text" width="24" height="24" />
      </div>
    </div>
  )
}
import { Icon } from "@iconify/react";

export default function BtnLogout() {
  return (
    <button className="flex items-center gap-3 p-2 rounded-lg transition-all  hover:bg-gray-100 dark:hover:bg-primary/20 cursor-pointer">
      <Icon icon="tabler:logout" width="24" height="24" />
      <span className="hidden sm:inline">Cerrar sesión</span>
    </button>
  )
}
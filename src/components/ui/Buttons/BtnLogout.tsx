import { Icon } from "@iconify/react";
import { useAuthStore } from '../../../store'
export default function BtnLogout() {
  const { cerrarSession } = useAuthStore()
  return (
    <button className="flex items-center gap-3 p-2 rounded-lg transition-all  hover:bg-gray-100 dark:hover:bg-primary/20 cursor-pointer" onClick={cerrarSession}>
      <Icon icon="tabler:logout" width="24" height="24" />
      <span className="hidden sm:inline">Cerrar sesión</span>
    </button>
  )
}
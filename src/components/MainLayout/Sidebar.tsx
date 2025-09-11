import { NavLink } from "react-router-dom"
import { Icon } from "@iconify/react";
import { BtnToggleTheme, BtnLogout, BtnNewPost } from '../ui/Buttons'
const LINKS = [
  {
    label: "Inicio",
    icon: "ic:baseline-home",
    to: "/"
  },
  {
    label: "Notificaciones",
    icon: "ic:baseline-notifications",
    to: "/notificaciones"
  },
  {
    label: "Mensajes",
    icon: "ic:baseline-message",
    to: "/mensajes"
  },
  {
    label: "Colecciones",
    icon: "ic:baseline-collections-bookmark",
    to: "/colecciones"
  },
  {
    label: "Suscripciones",
    icon: "ic:baseline-person",
    to: "/suscripciones"
  },
  {
    label: "Añadir Tarjeta",
    icon: "ic:baseline-credit-card",
    to: "/tarjeta"
  },
  {
    label: "Mi perfil",
    icon: "ic:baseline-account-circle",
    to: "/miperfil"
  },
]
export default function Sidebar() {
  return (
    <div className="flex flex-col bg-white dark:bg-bg-dark h-full p-2 tansition-all duration-300 items-center sm:items-start">
      {/* Logo */}
      <div className="p-2">
        <div className="size-8 bg-red-400 ">
          {/* FOTO + NOMBRE */}
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-2 items-center flex-1">
        {
          LINKS.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) => `flex items-center gap-3 p-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-primary/10 dark:hover:text-primary transition-all w-full ${isActive ? "text-blue-600 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}
            >
              <Icon icon={link.icon} width={24} height={24} />
              <span className="hidden sm:inline">{link.label}</span>
            </NavLink>
          ))
        }
      </nav>

      {/* Btn mode theme */}
      <BtnToggleTheme />

      <BtnLogout />

      <BtnNewPost />
    </div>
  )
}
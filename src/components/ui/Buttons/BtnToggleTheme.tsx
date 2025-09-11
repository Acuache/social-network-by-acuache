import { Icon } from "@iconify/react";
import { useThemeStore } from "../../../store/ThemeStore"

export default function BtnToggleTheme() {
  const { theme, setTheme } = useThemeStore()
  return (
    <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary/20 transition-all duration-300 cursor-pointer" onClick={setTheme}>
      <span>
        {
          theme === "light" ?
            <Icon icon="line-md:moon-filled-to-sunny-filled-loop-transition" width="24" height="24" /> :
            <Icon icon="line-md:sunny-outline-to-moon-loop-transition" width="24" height="24" />
        }
      </span>
      <span className="hidden sm:inline"> Modo:
        {theme === "light" ? " Claro" : " Oscuro"}
      </span>
    </button>
  )
}
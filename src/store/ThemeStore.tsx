import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark"

interface ThemeState {
  theme: Theme
  setTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: () => set((state) => {
        const newTheme: Theme = state.theme === "light" ? "dark" : "light"
        document.documentElement.classList.remove(state.theme)
        document.documentElement.classList.add(newTheme)
        return { theme: newTheme }
      })
    }),
    {
      name: 'theme-storage-social-network'
    }
  )
)
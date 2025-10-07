import { create } from "zustand";
interface GlobalStoreState {
  file: any[]
  setFile: (p: any) => void
  fileUrl: string
  setFileUrl: (newUrl: string) => void
  open: boolean
  setOpen: () => void
  openModal: () => void
}
export const useGlobalStore = create<GlobalStoreState>((set) => ({
  file: [],
  setFile: (p: any) => set({ file: p }),
  fileUrl: "",
  setFileUrl: (newUrl: string) => set({ fileUrl: newUrl }),

  open: false,
  setOpen: () => set({ open: false }),
  openModal: () => set({ open: true })
}))
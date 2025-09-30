import { create } from "zustand";

export const usePostStore = create((set) => ({
  file: null,
  setFile: (newFile: string) => set({ file: newFile })
}))
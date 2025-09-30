import { create } from "zustand";

interface PostState {
  file: File | null;
  setFile: (newFile: File | null) => void;
}

export const usePostStore = create<PostState>((set) => ({
  file: null,
  setFile: (newFile: File | null) => set({ file: newFile })
}))
import { create } from "zustand";

interface PostState {
  file: File | null;
  setFile: (newFile: File | null) => void;
  stateImage: boolean
  setStateImage: () => void

}

export const usePostStore = create<PostState>((set) => ({
  file: null,
  setFile: (newFile: File | null) => set({ file: newFile }),
  stateImage: false,
  setStateImage: () => set((state) => ({ stateImage: !state.stateImage })),
}))
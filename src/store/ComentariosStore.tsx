import { create } from 'zustand'
import { supabase } from '../supabase/supabase.config';
import type { ComentarioProps } from '../interface'
interface PublicacionPost {
  id: number;
  descripcion: string;
  foto: string;
  fecha: string;
  id_usuario: number;
  name_user: string;
  email_user: string;
  likes: number;
  photo: string | null;
  es_nsfw: boolean;
  type: "video" | "image";
  comentario_count: number;
  like_usuario_actual: boolean;
}
interface ComentariosStoreState {
  showModal: boolean
  setShowModal: (boo: boolean) => void
  itemSelect: PublicacionPost | null
  setItemSelect: (object: PublicacionPost) => void
  insertarComentario: (object: ComentarioProps) => void
}


export const useComentariosStore = create<ComentariosStoreState>((set) => ({
  showModal: false,
  setShowModal: (boo: boolean) => set({ showModal: boo }),
  itemSelect: null,
  setItemSelect: (object: PublicacionPost) => (
    set({ itemSelect: object })
  ),
  insertarComentario: async (object: ComentarioProps) => {
    const { error } = await supabase.from("comentarios").insert(object)
    if (error) throw new Error(error.message)
  },
  mostrarComentarios: async (object: PublicacionPost) => {
    const { data, error } = await supabase.rpc("", object)
    if (error) throw new Error(error.message)
    return data
  }
}))
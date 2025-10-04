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
export interface Comentario {
  id: number;
  id_usuario: number;
  nombre_usuario: string;
  apellido_usuario: string;
  foto_usuario: string;
  comentario: string;
  fecha: string;
  respuestas_count: number;
}

interface ComentariosStoreState {
  showModal: boolean
  setShowModal: (boo: boolean) => void
  itemSelect: PublicacionPost | null
  setItemSelect: (object: PublicacionPost) => void
  insertarComentario: (object: ComentarioProps) => void
  mostrarComentarios: (id: number) => Promise<Comentario[]>
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
  mostrarComentarios: async (id: number) => {
    const { data, error } = await supabase.rpc("comentarios_con_respuestas", { _id_publicacion: id })
    if (error) throw new Error(error.message)
    return data
  }
}))
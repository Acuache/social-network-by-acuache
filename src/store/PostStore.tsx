import { create } from "zustand";
import { supabase } from '../supabase/supabase.config'
import type { PublicacionesProps } from '../interface'


export interface PublicacionConDetalles {
  id: number;
  descripcion: string;
  foto: string | null;
  fecha: string;
  id_usuario: number;
  name_user: string;
  email_user: string;
  likes: number;
  photo: string | null;
  es_nsfw: boolean;
  type: string;
  comentario_count: number;
  like_usuario_actual: boolean;
}


interface PostState {
  file: File | null;
  setFile: (newFile: File | null) => void;
  stateImage: boolean
  setStateImage: () => void
  stateForm: boolean
  setStateForm: () => void
  insertarPost: (objectData: PublicacionesProps, file: File) => void
  dataPost: PublicacionConDetalles | null,
  mostrarPost: (id: number, desde: number, limite: number) => Promise<PublicacionConDetalles[]>
  likePost: (p_post_id: number, p_user_id: number) => void
  itemSelect: any
  setItemSelec: (p: any) => void
  itemPost: any
  setItemPost: (p: any) => void
}




// 1* Insetar los datos a la tabla publicaciones
const InsertarPost = async (objectData: PublicacionesProps, file: File) => {

  const { data, error } = await supabase
    .from('publicaciones')
    .insert(objectData)
    .select()
    .maybeSingle()
  if (error) throw new Error(error.message)

  // 2* Rescatar la id del la fila ingresada para colocarle como nombre a nuestro archivo en la storage
  if (file) {
    const nuevo_id = data.id

    // 5* Despues de completar el paso 4, actualizamos la fila de la tabla publicacion
    const urlImagen = await subirArchivo(nuevo_id, file)
    const { error } = await supabase
      .from('publicaciones')
      .update({ foto: urlImagen?.publicUrl })
      .eq('id', nuevo_id)
    if (error) throw new Error(error.message)
  }
}

// 3* Subiendo el archivo
const subirArchivo = async (id: number, file: File) => {
  const { data, error } = await supabase
    .storage
    .from('archivos')
    .upload(`publicaciones/${id}.png`, file, {
      cacheControl: '3600',
      upsert: false
    })
  if (error) throw new Error(error.message)

  // 4* Rescatando el archivo(url) para actualizar la la columna foto de la tabla publicaciones
  if (data) {
    const { data } = supabase
      .storage
      .from('archivos')
      .getPublicUrl(`publicaciones/${id}.png`)
    return data
  }
}

export const usePostStore = create<PostState>((set) => ({
  file: null,
  setFile: (newFile: File | null) => set({ file: newFile }),
  stateImage: false,
  setStateImage: () => set((state) => ({ stateImage: !state.stateImage })),
  stateForm: false,
  setStateForm: () => set((state) => ({ stateForm: !state.stateForm })),
  insertarPost: async (objectData: PublicacionesProps, file: File) => {
    await InsertarPost(objectData, file)
  },
  dataPost: null,
  mostrarPost: async (id: number, desde: number, limite: number) => {
    const { data, error } = await supabase.rpc("publicaciones_con_detalles", { _id_usuario: id }).range(desde, desde + limite - 1)
    if (error) throw new Error(error.message)
    set({ dataPost: data })
    return data
  },
  likePost: async (p_post_id: number, p_user_id: number) => {
    const { error } = await supabase.rpc("toggle__like", { p_post_id, p_user_id })
    if (error) throw new Error(error.message)
  },

  itemSelect: null,
  setItemSelec: (p) => set({ itemSelect: p }),

  itemPost: null,
  setItemPost: (p) => set({ itemPost: p }),

}))
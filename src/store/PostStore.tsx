import { create } from "zustand";
import { supabase } from '../supabase/supabase.config'
import type { PublicacionesProps } from '../interface'

interface PostState {
  file: File | null;
  setFile: (newFile: File | null) => void;
  stateImage: boolean
  setStateImage: () => void
  insertarPost: (objectData: PublicacionesProps, file: File) => void
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
  insertarPost: async (objectData: PublicacionesProps, file: File) => {
    await InsertarPost(objectData, file)
  }
}))
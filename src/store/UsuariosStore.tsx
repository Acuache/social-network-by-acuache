import { create } from 'zustand'
import { supabase } from '../supabase/supabase.config'
import type { Usuario } from '../interface'


export interface UsuariosStoreState {
  dataUsuarioAuth: Usuario | null
  mostrarUsuarioAuth: (uuid: string) => Promise<Usuario>
  editarUsuarios: (id: number, photo: string) => Promise<void>
}

export const useUsuariosStore = create<UsuariosStoreState>((set) => ({
  dataUsuarioAuth: null,
  mostrarUsuarioAuth: async (uuid: string): Promise<Usuario> => {
    const { data, error } = await supabase
      .from('usuarios')
      .select()
      .eq('id_auth', uuid)
      .maybeSingle()

    if (error) throw new Error(error.message)

    set({ dataUsuarioAuth: data })
    return data as Usuario
  },
  editarUsuarios: async (id: number, photo: string) => {
    const { error } = await supabase
      .from('usuarios')
      .update({ photo: photo })
      .eq('id', id)
    if (error) throw new Error(error.message)
  }
}))
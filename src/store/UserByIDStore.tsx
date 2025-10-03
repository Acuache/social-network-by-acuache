import { create } from "zustand";
import { supabase } from '../supabase/supabase.config'
import type { Usuario } from '../interface'

interface UserByIDStoreProps {
  obtenerUsuarioByID: (idUser: number) => Promise<Usuario>
}

export const useUserByIDStore = create<UserByIDStoreProps>(() => ({
  obtenerUsuarioByID: async (idUser: number) => {
    const { data, error } = await supabase
      .from('usuario')
      .select()
      .eq('id', idUser)
      .maybeSingle()

    if (error) throw new Error(error.message);

    return data as Usuario
  }
}))
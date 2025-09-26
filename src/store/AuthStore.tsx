import { create } from "zustand";
import { supabase } from '../supabase/supabase.config'
import type { UserProps } from '../interface'



export const useAuthStore = create(() => ({
  crearUserYLogin: async ({ email, password, name, lastName }: UserProps) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          lastName: lastName,
        }
      }
    });

    if (error) {
      throw new Error(error.message)
    }

    return data;
  },
  cerrarSession: async () => {
    await supabase.auth.signOut()
  }
}))



interface SubscriptionState {
  user: any | null
}

export const useSubscription = create<SubscriptionState>((set) => {
  const store = {
    user: null,
  }

  const initializeUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      set({ user: session?.user })
    }
  }
  initializeUser()

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      set({ user: session.user })
    } else {
      set({ user: null })
    }
  })
  return store
})


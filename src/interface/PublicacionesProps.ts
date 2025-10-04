export interface PublicacionesProps {
  id?: number
  name_user?: string
  lastname_user?: string
  descripcion: string
  photo?: string
  foto: string
  fecha: string
  id_usuario: number
  likes?: number
  es_nsfw?: boolean
  type: string
  comentario_count?: number
  like_usuario_actual?: boolean
}
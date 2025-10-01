export interface PublicacionesProps {
  id?: number
  descripcion: string
  foto: string
  fecha: string
  id_usuario: number
  likes?: number
  es_nsfw?: boolean
  type: string
}
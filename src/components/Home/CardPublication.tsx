import { PublicationHeader, PublicationComment, PublicationImage, PublicationToReaction } from './'
import type { PublicacionesProps } from '../../interface'
export default function CardPublication({ id_usuario, descripcion, foto, type, like_usuario_actual, id, likes, comentario_count, name_user, photo, lastname_user }: PublicacionesProps) {
  const props = {
    id,
    descripcion,
    foto,
    id_usuario,
    name_user,
    lastname_user,
    likes,
    photo,
  }
  return (
    <article className="border-y-2  border-gray-500/50 p-4 flex flex-col gap-2.5">
      <PublicationHeader id_usuario={id_usuario} />
      <PublicationComment descripcion={descripcion} />
      <PublicationImage
        foto={foto}
        type={type}
      />
      <PublicationToReaction id_post={id!} like_usuario_actual={like_usuario_actual!} likes={likes!} comentario_count={comentario_count!} props={props} />
    </article>
  )
}
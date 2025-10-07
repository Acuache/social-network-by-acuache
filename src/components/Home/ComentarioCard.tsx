import { useRelativeTime } from "../../hooks";

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
export default function ComentarioCard({ id_usuario, nombre_usuario, apellido_usuario, foto_usuario, comentario, fecha }: Comentario) {
  // Manejar el caso cuando la foto es "-" o está vacía
  const photoUrl = foto_usuario && foto_usuario !== '-' ? foto_usuario : 'https://via.placeholder.com/150'

  return (
    <div className="pl-4">
      <div className="flex items-start gap-2 group relative w-full">
        <img src={photoUrl} alt={`foto user ${id_usuario}`} className="size-9 rounded-full object-cover" />
        <div className="flex-1 relative">
          <div className="relative bg-gray-100 dark:bg-neutral-800 p-2 rounded-xl text-sm w-fit max-w-[90%] flex gap-2">
            <section>
              <span className="font-semibold block text-xs">
                {nombre_usuario} {apellido_usuario}
              </span>
              <p>{comentario}</p>
              <div className="flex gap-3 mt-1 text-[10px] text-gray-500 relative">
                <span>{useRelativeTime(fecha)}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
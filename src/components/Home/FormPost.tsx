import { Icon } from "@iconify/react";
import { useUsuariosStore } from '../../store'
interface FormPostProps {
  handleClick: () => void
}
export default function FormPost({ handleClick }: FormPostProps) {
  const { dataUsuarioAuth: user } = useUsuariosStore()
  return (
    <section className="fixed w-full h-fill inset-0  dark:bg-black/50 backdrop-blur-sm z-11 flex justify-center items-center" >
      <div className="w-lg max-w-xl bg-[#f7faf9] dark:bg-[#171717] p-4 flex flex-col gap-4">
        <header className="flex justify-between items-center border-b-1 border-amber-50/30 pb-4">
          <p className="font-bold text-xl">Crear publicación</p>
          <Icon icon="material-symbols:close" className="size-7 cursor-pointer" onClick={handleClick} />
        </header>
        <article className="flex flex-col gap-2">
          <header className="flex gap-2 items-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-DxLh4oV1NCm2a101jtYxOimBnLZNkiiBQ&s" alt="" className="size-12 object-cover rounded-full" />
            <span>{user!.name} {user!.lastname}</span>
          </header>
          <form>
            <textarea name="" id="" className="w-full resize-none outline-none" rows={3} placeholder={`¿Qué estás pensando, ${user!.name}?`}></textarea>
          </form>
        </article>
      </div>
    </section>
  )
}
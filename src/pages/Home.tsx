import { useEffect, useRef } from 'react'
import { Header, InputPublication, CardPublication, ComentarioModal } from '../components/Home'
import { useUsuariosStore, useSubscription, useComentariosStore } from '../store'
import { Toaster } from 'sonner'
import { useMostrarPostQuery } from '../stack'
import { BeatLoaderComponent } from '../components/ui/spinners'
import { useSupabaseSubscription } from '../hooks'

export default function Home() {
  const { user } = useSubscription()
  const { mostrarUsuarioAuth } = useUsuariosStore()
  useEffect(() => {
    mostrarUsuarioAuth(user.id)
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMostrarPostQuery()

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const handleScroll = () => {
      if (element.scrollTop + element.clientHeight >= element.scrollHeight - 200 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
    if (element) {
      element.addEventListener("scroll", handleScroll)
      return () => element.removeEventListener("scroll", handleScroll)
    }

  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  useSupabaseSubscription({
    channelName: "public.publicaciones",
    options: {
      event: "*",
      schema: "public",
      table: "publicaciones"
    },
    queryKey: ["mostrar post"]
  })

  const { showModal } = useComentariosStore()
  return (
    <div className=" bg-transparent max-w-[1200px] text-black dark:text-white">
      <Toaster />
      {
        showModal && (
          <ComentarioModal />
        )
      }
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] h-dvh">
        <main className="flex flex-col h-dvh overflow-hidden border-x-1 border-gray-200 dark:border-gray-700">
          <Header />
          <div ref={scrollRef} className='overflow-y-auto'>
            <InputPublication />
            {
              data?.pages.map((page, pageIndex) => (
                page.map((item, index) => (
                  <CardPublication key={`${pageIndex} - ${index}`} {...item} />

                ))
              ))
            }
            {
              isFetchingNextPage && <BeatLoaderComponent />
            }
          </div>
        </main>
        <aside className="hidden xl:block">
          aside derecho
        </aside>
      </div>
    </div>
  )
}
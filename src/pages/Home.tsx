import { Header, InputPublication, CardPublication } from '../components/Home'
export default function Home() {
  return (
    <div className=" bg-transparent max-w-[1200px] text-black dark:text-white">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] h-dvh">
        <main className="flex flex-col h-dvh overflow-hidden border-x-1 border-gray-200 dark:border-gray-700">
          <Header />
          <div className='overflow-y-auto'>
            <InputPublication />
            <CardPublication />
          </div>
        </main>
        <aside className="hidden xl:block">
          aside derecho
        </aside>
      </div>
    </div>
  )
}
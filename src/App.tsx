import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MyRoutes from './routers/router'
import { useThemeStore } from './store/ThemeStore'

const queryClient = new QueryClient()

function App() {
  const { theme } = useThemeStore()
  document.documentElement.classList.toggle("dark", theme === "dark")
  return (
    <QueryClientProvider client={queryClient}>
      <MyRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}

export default App

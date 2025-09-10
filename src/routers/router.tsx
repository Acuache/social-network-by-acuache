import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages'
import { MainLayout } from '../layouts'
export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Login } from '../pages'
import { MainLayout } from '../layouts'
export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
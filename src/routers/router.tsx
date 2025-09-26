import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, ProtectedRoute, MiPerfil } from '../pages'
import { MainLayout } from '../layouts'
export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={
          <ProtectedRoute authenticated={false}>
            <Login />
          </ProtectedRoute>
        } />
        <Route path='/' element={
          <ProtectedRoute authenticated={true}>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="/miperfil" element={<MiPerfil />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
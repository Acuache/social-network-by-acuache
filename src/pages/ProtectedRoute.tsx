import { useSubscription } from '../store'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  authenticated: boolean
}

export default function ProtectedRoute({ children, authenticated }: ProtectedRouteProps) {
  const { user } = useSubscription()

  if (!authenticated) {
    if (!user) {
      return children
    } else {
      return <Navigate to="/" replace />
    }
  }

  if (authenticated) {
    if (user) {
      return children
    } else {
      return <Navigate to="/login" replace />
    }
  }

  return <Navigate to="/login" replace />
}
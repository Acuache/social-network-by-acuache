import { useMostrarUsuarioAuthQuery } from '../stack'
export default function MiPerfil() {

  const { data, isLoading, error } = useMostrarUsuarioAuthQuery()

  if (error) {
    return <span>Error {error.message}</span>
  }

  if (isLoading) {
    return <span>Cargando...</span>
  }


  return (
    <div>
      <p>{data!.name}</p>
      <p>{data!.lastname}</p>
      <p>{data!.email}</p>
    </div>
  )
}
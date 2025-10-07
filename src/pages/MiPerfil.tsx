import { useState } from 'react'
import { useMostrarUsuarioAuthQuery } from '../stack'
import { FormUpdateUser } from '../components/Home'
import { Icon } from '@iconify/react'

export default function MiPerfil() {
  const [showEditModal, setShowEditModal] = useState(false)
  const { data, isLoading, error } = useMostrarUsuarioAuthQuery()

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <Icon icon="material-symbols:error" className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-300">{error.message}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header del perfil */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl  mb-8 mt-30">
          {/* Información del perfil */}
          <div className="relative p-8 flex items-center justify-center sm:justify-start">
            {/* Foto de perfil */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end">
              <div className="relative">
                <img
                  src={data?.photo && data.photo !== '-' ? data.photo : 'https://via.placeholder.com/150'}
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
                />
              </div>
              <div className="my-auto text-center sm:text-left sm:ml-5">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {data!.name} {data!.lastname}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg mt-1">
                  {data!.email}
                </p>

              </div>
            </div>
          </div>
        </div>



        {/* Información adicional */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Icon icon="material-symbols:info" />
            Información del perfil
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Icon icon="material-symbols:person" className="text-xl text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nombre completo</p>
                  <p className="font-medium text-gray-900 dark:text-white">{data!.name} {data!.lastname}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Icon icon="material-symbols:email" className="text-xl text-green-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Correo electrónico</p>
                  <p className="font-medium text-gray-900 dark:text-white">{data!.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Icon icon="material-symbols:calendar-today" className="text-xl text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Miembro desde</p>
                  <p className="font-medium text-gray-900 dark:text-white">Octubre 2024</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Icon icon="material-symbols:verified" className="text-xl text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Estado</p>
                  <p className="font-medium text-gray-900 dark:text-white">Cuenta verificada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      {showEditModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowEditModal(false)}></div>
          <div className="relative z-10">
            <FormUpdateUser />
          </div>
        </div>
      )}
    </div>
  )
}
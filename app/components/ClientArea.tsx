'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Document {
  id: number
  name: string
  type: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
}

interface Appointment {
  id: number
  date: string
  time: string
  type: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

export default function ClientArea() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Dados mockados para demonstração
  const documents: Document[] = [
    {
      id: 1,
      name: 'Contrato de Prestação de Serviços',
      type: 'PDF',
      date: '2024-03-15',
      status: 'approved',
    },
    {
      id: 2,
      name: 'Procuração',
      type: 'PDF',
      date: '2024-03-10',
      status: 'pending',
    },
  ]

  const appointments: Appointment[] = [
    {
      id: 1,
      date: '2024-03-20',
      time: '14:00',
      type: 'Consulta Inicial',
      status: 'scheduled',
    },
    {
      id: 2,
      date: '2024-03-25',
      time: '10:30',
      type: 'Acompanhamento',
      status: 'scheduled',
    },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de autenticação
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Área do Cliente
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#CFAB5F] focus:ring-[#CFAB5F] dark:bg-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#CFAB5F] focus:ring-[#CFAB5F] dark:bg-gray-600 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CFAB5F] hover:bg-[#B8944F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CFAB5F]"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bem-vindo à sua área
          </h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Documentos */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Meus Documentos
            </h3>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-600 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.date} • {doc.type}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      doc.status === 'approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : doc.status === 'rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    }`}
                  >
                    {doc.status === 'approved'
                      ? 'Aprovado'
                      : doc.status === 'rejected'
                      ? 'Rejeitado'
                      : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Consultas */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Minhas Consultas
            </h3>
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-600 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{apt.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {apt.date} • {apt.time}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      apt.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : apt.status === 'cancelled'
                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                    }`}
                  >
                    {apt.status === 'completed'
                      ? 'Realizada'
                      : apt.status === 'cancelled'
                      ? 'Cancelada'
                      : 'Agendada'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
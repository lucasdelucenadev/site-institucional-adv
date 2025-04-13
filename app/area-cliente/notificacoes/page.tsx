'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  timestamp: Date
  read: boolean
  category?: string
  details?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [typeFilter, setTypeFilter] = useState<Notification['type'] | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula o carregamento de notificações
    setTimeout(() => {
      const demoNotifications: Notification[] = [
        {
          id: '1',
          type: 'info',
          title: 'Nova Audiência Agendada',
          message: 'Você tem uma nova audiência agendada para o dia 20/04/2024 às 14:00.',
          timestamp: new Date('2024-04-13T10:00:00'),
          read: false,
          category: 'Agenda',
          details: 'Local: Fórum Central - Sala 302\nProcesso: 1234.5678.9012.3456\nCliente: Maria Silva',
        },
        {
          id: '2',
          type: 'success',
          title: 'Documento Aprovado',
          message: 'Seu documento foi aprovado e está disponível para download.',
          timestamp: new Date('2024-04-12T15:30:00'),
          read: false,
          category: 'Documentos',
          details: 'Documento: Contrato de Prestação de Serviços\nRevisor: Dr. João Santos\nObservações: Aprovado sem ressalvas',
        },
        {
          id: '3',
          type: 'warning',
          title: 'Prazo se Aproximando',
          message: 'O prazo para envio dos documentos solicitados termina em 3 dias.',
          timestamp: new Date('2024-04-11T09:15:00'),
          read: true,
          category: 'Prazos',
          details: 'Data limite: 14/04/2024\nDocumentos pendentes:\n- Procuração\n- Comprovante de residência',
        },
        {
          id: '4',
          type: 'error',
          title: 'Pagamento Pendente',
          message: 'Existe um pagamento pendente que precisa ser regularizado.',
          timestamp: new Date('2024-04-10T16:45:00'),
          read: true,
          category: 'Financeiro',
          details: 'Valor: R$ 1.500,00\nVencimento: 15/04/2024\nReferente: Honorários advocatícios',
        },
      ]
      setNotifications(demoNotifications)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredNotifications = notifications
    .filter(notification => {
      if (filter === 'unread') return !notification.read
      return true
    })
    .filter(notification => {
      if (typeFilter === 'all') return true
      return notification.type === typeFilter
    })
    .filter(notification => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.category?.toLowerCase().includes(query) ||
        notification.details?.toLowerCase().includes(query)
      )
    })

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CFAB5F]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Notificações
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CFAB5F]"
              >
                <option value="all">Todas</option>
                <option value="unread">Não lidas</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as Notification['type'] | 'all')}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CFAB5F]"
              >
                <option value="all">Todos os tipos</option>
                <option value="info">Informação</option>
                <option value="success">Sucesso</option>
                <option value="warning">Aviso</option>
                <option value="error">Erro</option>
              </select>
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Pesquisar notificações..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CFAB5F]"
              />
            </div>
          </div>
        </div>

        {notifications.some(n => !n.read) && (
          <div className="mb-4">
            <button
              onClick={markAllAsRead}
              className="text-[#CFAB5F] hover:text-[#B89B4F] text-sm font-medium"
            >
              Marcar todas como lidas
            </button>
          </div>
        )}

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-gray-500 dark:text-gray-400">
              Nenhuma notificação encontrada
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden ${
                  !notification.read ? 'border-l-4 border-[#CFAB5F]' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </h3>
                          {notification.category && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 mt-1">
                              {notification.category}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-[#CFAB5F] hover:text-[#B89B4F]"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {notification.message}
                      </p>
                      {notification.details && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                          <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line font-sans">
                            {notification.details}
                          </pre>
                        </div>
                      )}
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {formatTimestamp(notification.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 
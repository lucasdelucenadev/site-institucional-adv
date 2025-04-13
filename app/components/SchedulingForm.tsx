'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  area: string
  date: string
  time: string
  message: string
}

export default function SchedulingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    area: '',
    date: '',
    time: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Aqui você implementaria a lógica de envio para sua API
      // Por exemplo:
      // await fetch('/api/scheduling', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      // })

      // Simulando uma resposta bem-sucedida
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        area: '',
        date: '',
        time: '',
        message: ''
      })
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold mb-6">Agende uma Consulta</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-[#CFAB5F] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-[#CFAB5F] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-[#CFAB5F] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Área de Atuação
            </label>
            <select
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-[#CFAB5F] focus:border-transparent"
            >
              <option value="">Selecione uma área</option>
              <option value="direito-penal">Direito Penal</option>
              <option value="processo-penal">Processo Penal</option>
              <option value="execucao-penal">Execução Penal</option>
              <option value="outros">Outros</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data Preferida
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-[#CFAB5F] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Horário Preferido
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-[#CFAB5F] focus:border-transparent"
            >
              <option value="">Selecione um horário</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mensagem (opcional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-[#CFAB5F] focus:border-transparent"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full btn bg-[#CFAB5F] text-white hover:bg-[#B89754] disabled:opacity-50
                     disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? 'Agendando...' : 'Agendar Consulta'}
          </button>
        </div>

        {status === 'success' && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-md">
            <p className="font-medium">Consulta agendada com sucesso!</p>
            <p className="text-sm mt-1">
              Entraremos em contato em breve para confirmar o agendamento.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-md">
            <p className="font-medium">Ocorreu um erro ao agendar sua consulta.</p>
            <p className="text-sm mt-1">
              Por favor, tente novamente ou entre em contato por telefone.
            </p>
          </div>
        )}
      </form>
    </div>
  )
} 
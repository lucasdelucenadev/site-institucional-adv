'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Aqui você pode implementar a lógica de inscrição na newsletter
      // Por exemplo, enviando para uma API ou serviço de email marketing
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulação de API
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Fique por dentro das novidades
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Receba atualizações sobre direito, legislação e dicas jurídicas diretamente no seu email.
          </p>
        </div>
        <div className="mt-8 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="sm:flex">
            <label htmlFor="email-address" className="sr-only">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-[#CFAB5F] focus:border-[#CFAB5F] dark:bg-gray-700 dark:text-white rounded-md"
              placeholder="Seu melhor email"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#CFAB5F] hover:bg-[#B8944F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CFAB5F] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </>
              ) : status === 'success' ? (
                'Inscrito com sucesso!'
              ) : status === 'error' ? (
                'Erro ao inscrever'
              ) : (
                'Inscrever-se'
              )}
            </button>
          </form>
          {status === 'error' && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              Ocorreu um erro ao processar sua inscrição. Por favor, tente novamente.
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 
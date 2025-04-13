'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  excerpt: string
  url: string
  type: 'blog' | 'area' | 'page'
}

export default function Search() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Dados mockados para demonstração
  const mockData: SearchResult[] = [
    {
      id: '1',
      title: 'Entenda o Habeas Corpus',
      excerpt: 'O habeas corpus é um remédio constitucional que garante a liberdade de locomoção...',
      url: '/blog/entenda-o-habeas-corpus',
      type: 'blog'
    },
    {
      id: '2',
      title: 'Direito Penal',
      excerpt: 'Área do direito que regula o poder punitivo do Estado, incriminando condutas...',
      url: '/areas-atuacao#direito-penal',
      type: 'area'
    },
    {
      id: '3',
      title: 'Direitos do Preso',
      excerpt: 'Conheça os direitos fundamentais garantidos aos presos durante o cumprimento da pena...',
      url: '/blog/direitos-do-preso',
      type: 'blog'
    },
    {
      id: '4',
      title: 'Processo Penal',
      excerpt: 'Conjunto de normas que regulam o processo judicial para apuração de infrações penais...',
      url: '/areas-atuacao#processo-penal',
      type: 'area'
    },
    {
      id: '5',
      title: 'Sobre Nós',
      excerpt: 'Conheça nossa história, missão e valores como escritório de advocacia...',
      url: '/sobre',
      type: 'page'
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    if (value.length > 2) {
      setIsLoading(true)
      setIsOpen(true)
      
      // Simulando uma busca em tempo real
      setTimeout(() => {
        const filteredResults = mockData.filter(item => 
          item.title.toLowerCase().includes(value.toLowerCase()) || 
          item.excerpt.toLowerCase().includes(value.toLowerCase())
        )
        setResults(filteredResults)
        setIsLoading(false)
      }, 300)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.length > 2) {
      // Aqui você implementaria a lógica de redirecionamento para a página de resultados
      router.push(`/busca?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Buscar no site..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#CFAB5F] focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </form>

      {isOpen && (query.length > 2) && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2">Buscando...</p>
            </div>
          ) : results.length > 0 ? (
            <ul className="py-2 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <li key={result.id}>
                  <Link 
                    href={result.url}
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {result.type === 'blog' && (
                          <svg className="h-5 w-5 text-[#CFAB5F]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        )}
                        {result.type === 'area' && (
                          <svg className="h-5 w-5 text-[#CFAB5F]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                        )}
                        {result.type === 'page' && (
                          <svg className="h-5 w-5 text-[#CFAB5F]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{result.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{result.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Nenhum resultado encontrado para "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  )
} 
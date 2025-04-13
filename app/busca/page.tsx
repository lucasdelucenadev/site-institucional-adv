'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface SearchResult {
  id: string
  title: string
  excerpt: string
  url: string
  type: 'blog' | 'area' | 'page'
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Dados mockados para demonstração
  const mockData: SearchResult[] = [
    {
      id: '1',
      title: 'Entenda o Habeas Corpus',
      excerpt: 'O habeas corpus é um remédio constitucional que garante a liberdade de locomoção. Este artigo explica em detalhes como funciona, quando pode ser utilizado e quais são os requisitos para sua concessão. Entenda também as diferenças entre habeas corpus preventivo e repressivo.',
      url: '/blog/entenda-o-habeas-corpus',
      type: 'blog'
    },
    {
      id: '2',
      title: 'Direito Penal',
      excerpt: 'Área do direito que regula o poder punitivo do Estado, incriminando condutas e aplicando penas. Nossa equipe é especializada em direito penal, oferecendo assessoria jurídica completa em todas as fases do processo criminal, desde a investigação até a execução da pena.',
      url: '/areas-atuacao#direito-penal',
      type: 'area'
    },
    {
      id: '3',
      title: 'Direitos do Preso',
      excerpt: 'Conheça os direitos fundamentais garantidos aos presos durante o cumprimento da pena. Este artigo aborda as garantias constitucionais, o tratamento digno, acesso à saúde, educação e trabalho, além de explicar como garantir que esses direitos sejam respeitados.',
      url: '/blog/direitos-do-preso',
      type: 'blog'
    },
    {
      id: '4',
      title: 'Processo Penal',
      excerpt: 'Conjunto de normas que regulam o processo judicial para apuração de infrações penais. Nossa equipe atua em todas as fases do processo penal, desde a fase investigatória até a execução da pena, garantindo a ampla defesa e o contraditório.',
      url: '/areas-atuacao#processo-penal',
      type: 'area'
    },
    {
      id: '5',
      title: 'Sobre Nós',
      excerpt: 'Conheça nossa história, missão e valores como escritório de advocacia. Com mais de 10 anos de experiência, nossa equipe é formada por profissionais dedicados e especializados em diversas áreas do direito, sempre priorizando a excelência no atendimento e os resultados para nossos clientes.',
      url: '/sobre',
      type: 'page'
    },
    {
      id: '6',
      title: 'Liberdade Provisória',
      excerpt: 'A liberdade provisória é um direito garantido pela Constituição Federal. Este artigo explica os requisitos para sua concessão, as modalidades existentes e como solicitar a liberdade provisória em diferentes situações processuais.',
      url: '/blog/liberdade-provisoria',
      type: 'blog'
    },
    {
      id: '7',
      title: 'Prisão Preventiva',
      excerpt: 'A prisão preventiva é uma medida cautelar que pode ser aplicada durante o processo penal. Entenda quando ela pode ser decretada, quais são os requisitos legais e como contestar uma prisão preventiva indevida.',
      url: '/blog/prisao-preventiva',
      type: 'blog'
    },
    {
      id: '8',
      title: 'Recursos no Processo Penal',
      excerpt: 'Os recursos são instrumentos processuais que permitem a revisão de decisões judiciais. Este artigo explica os principais tipos de recursos no processo penal, os prazos para interposição e as estratégias para aumentar as chances de sucesso.',
      url: '/blog/recursos',
      type: 'blog'
    }
  ]

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      
      // Simulando uma busca
      setTimeout(() => {
        const filteredResults = mockData.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.excerpt.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filteredResults)
        setIsLoading(false)
      }, 500)
    } else {
      setResults([])
      setIsLoading(false)
    }
  }, [query])

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Resultados da busca
          </h1>
          {query && (
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'} para "{query}"
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <svg className="animate-spin h-10 w-10 text-[#CFAB5F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-8">
            {results.map((result) => (
              <div key={result.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {result.type === 'blog' && (
                        <svg className="h-6 w-6 text-[#CFAB5F]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      )}
                      {result.type === 'area' && (
                        <svg className="h-6 w-6 text-[#CFAB5F]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      )}
                      {result.type === 'page' && (
                        <svg className="h-6 w-6 text-[#CFAB5F]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <Link href={result.url} className="block">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-[#CFAB5F] dark:hover:text-[#CFAB5F] transition-colors">
                          {result.title}
                        </h2>
                      </Link>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {result.excerpt}
                      </p>
                      <div className="mt-4">
                        <Link 
                          href={result.url}
                          className="inline-flex items-center text-sm font-medium text-[#CFAB5F] hover:text-[#B8944F]"
                        >
                          Ver mais
                          <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Nenhum resultado encontrado</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Não encontramos resultados para "{query}". Tente usar termos diferentes ou mais gerais.
            </p>
            <div className="mt-6">
              <Link 
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#CFAB5F] hover:bg-[#B8944F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CFAB5F]"
              >
                Voltar para a página inicial
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Digite algo para buscar</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Use a barra de pesquisa para encontrar conteúdo no site.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 
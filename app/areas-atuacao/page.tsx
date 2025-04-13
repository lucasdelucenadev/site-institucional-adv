'use client'

import Image from 'next/image'

const areas = [
  {
    title: 'Direito Penal',
    description: 'Atuação completa em todas as fases do processo penal, desde a investigação até a execução da pena. Defesa criminal especializada com foco em resultados.',
    icon: '⚖️',
    image: 'https://placehold.co/800x600/CFAB5F/FFFFFF?text=Direito+Penal',
    services: [
      'Defesa em todas as instâncias',
      'Habeas Corpus',
      'Recursos',
      'Audiências',
      'Negociação com o Ministério Público'
    ]
  },
  {
    title: 'Processo Penal',
    description: 'Acompanhamento completo do processo penal, garantindo seus direitos em todas as etapas. Análise detalhada de provas e estratégias de defesa.',
    icon: '📋',
    image: 'https://placehold.co/800x600/CFAB5F/FFFFFF?text=Processo+Penal',
    services: [
      'Análise de provas',
      'Elaboração de defesa',
      'Acompanhamento processual',
      'Recursos',
      'Audiências'
    ]
  },
  {
    title: 'Execução Penal',
    description: 'Assessoria especializada na fase de execução da pena, buscando benefícios legais e garantindo seus direitos durante o cumprimento da pena.',
    icon: '🔒',
    image: 'https://placehold.co/800x600/CFAB5F/FFFFFF?text=Execução+Penal',
    services: [
      'Progressão de regime',
      'Livramento condicional',
      'Remição de pena',
      'Benefícios legais',
      'Revisão de pena'
    ]
  }
]

export default function AreasAtuacao() {
  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Áreas de Atuação</h1>
            <p className="text-xl text-gray-300">
              Especialização em direito criminal com foco em resultados.
              Conheça nossas áreas de atuação e como podemos ajudar você.
            </p>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="section">
        <div className="container">
          <div className="space-y-24">
            {areas.map((area, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h2 className="mb-4">{area.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {area.description}
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#CFAB5F]">
                      Serviços Oferecidos:
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {area.services.map((service, serviceIndex) => (
                        <li
                          key={serviceIndex}
                          className="flex items-center text-gray-600 dark:text-gray-400"
                        >
                          <svg
                            className="w-5 h-5 text-[#CFAB5F] mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-[#CFAB5F] text-white">
        <div className="container text-center">
          <h2 className="mb-6">Precisa de Assistência Jurídica?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Entre em contato conosco para uma consulta inicial. Estamos aqui para ajudar.
          </p>
          <a
            href="/contato"
            className="btn bg-white text-[#CFAB5F] hover:bg-gray-100"
          >
            Agende uma Consulta
          </a>
        </div>
      </section>
    </div>
  )
} 
import Image from "next/image";
import Link from "next/link";
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import BackToTop from './components/BackToTop'
import Newsletter from './components/Newsletter'

const areas = [
  {
    title: 'Direito Penal',
    description: 'Defesa criminal especializada em todas as fases do processo penal.',
    icon: '⚖️',
    link: '/areas-atuacao#direito-penal'
  },
  {
    title: 'Processo Penal',
    description: 'Acompanhamento completo do processo penal, garantindo seus direitos.',
    icon: '📋',
    link: '/areas-atuacao#processo-penal'
  },
  {
    title: 'Execução Penal',
    description: 'Assessoria especializada na fase de execução da pena.',
    icon: '🔒',
    link: '/areas-atuacao#execucao-penal'
  }
]

export default function Home() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1920x1080/CFAB5F/FFFFFF?text=Advocacia+Criminal"
            alt="Background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Advocacia Criminal Especializada
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Defesa jurídica de qualidade para proteger seus direitos
          </p>
          <Link
            href="/contato"
            className="bg-[#CFAB5F] text-white px-8 py-3 rounded-lg text-lg font-semibold 
                     hover:bg-[#B89754] transition-colors inline-block"
          >
            Agende uma Consulta
          </Link>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Áreas de Atuação</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Oferecemos assessoria jurídica especializada em diversas áreas do direito criminal
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {areas.map((area, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#CFAB5F]">{area.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Por que nos escolher */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que nos escolher</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experiência e dedicação para garantir a melhor defesa para você
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diferenciais.map((diferencial, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#CFAB5F] rounded-full flex items-center justify-center">
                    {diferencial.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{diferencial.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{diferencial.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Precisa de ajuda jurídica?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Entre em contato conosco para uma consulta inicial
          </p>
          <Link
            href="/contato"
            className="bg-[#CFAB5F] text-white px-8 py-3 rounded-lg text-lg font-semibold 
                     hover:bg-[#B89754] transition-colors inline-block"
          >
            Fale Conosco
          </Link>
        </div>
      </section>
    </div>
  );
}

const diferenciais = [
  {
    title: 'Experiência',
    description: 'Mais de 10 anos de experiência em direito criminal.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Atendimento Personalizado',
    description: 'Cada caso é único e recebe a atenção necessária.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: 'Atualização Constante',
    description: 'Sempre atualizado com as últimas mudanças na legislação.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: 'Resultados Comprovados',
    description: 'Histórico de sucesso em casos complexos.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
]

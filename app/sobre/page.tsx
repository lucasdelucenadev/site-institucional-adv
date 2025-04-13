'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Testimonials from '../components/Testimonials'

const team = [
  {
    name: 'Dr. Lucas Silva',
    role: 'Advogado Sócio',
    image: 'https://placehold.co/400x500/CFAB5F/FFFFFF?text=Dr.+Lucas+Silva',
    description: 'Especialista em Direito Civil e Empresarial com mais de 15 anos de experiência.',
  },
  {
    name: 'Dra. Maria Santos',
    role: 'Advogada Sênior',
    image: 'https://placehold.co/400x500/CFAB5F/FFFFFF?text=Dra.+Maria+Santos',
    description: 'Especialista em Direito Trabalhista e Previdenciário.',
  },
  {
    name: 'Dr. João Oliveira',
    role: 'Advogado Pleno',
    image: 'https://placehold.co/400x500/CFAB5F/FFFFFF?text=Dr.+João+Oliveira',
    description: 'Especialista em Direito Tributário e Contratos.',
  },
]

const values = [
  {
    title: 'Ética',
    description: 'Compromisso com os mais altos padrões éticos e profissionais.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Excelência',
    description: 'Busca constante pela excelência em todos os serviços prestados.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: 'Compromisso',
    description: 'Dedicação total aos interesses e necessidades dos nossos clientes.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1920x1080/CFAB5F/FFFFFF?text=Sobre+Nós"
            alt="Sobre Nós"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Sobre Nós
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            Conheça nossa história e valores
          </motion.p>
        </div>
      </section>

      {/* História Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Nossa História
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Fundado em 2010, nosso escritório nasceu da paixão pelo direito e do compromisso
                com a excelência. Ao longo dos anos, construímos uma reputação sólida baseada
                na dedicação aos nossos clientes e na busca constante por resultados.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Nossa equipe é formada por profissionais altamente qualificados e experientes,
                prontos para oferecer as melhores soluções jurídicas para cada caso.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="https://placehold.co/800x600/CFAB5F/FFFFFF?text=Nossa+História"
                alt="Nossa História"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Nossos Valores
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Princípios que guiam nosso trabalho diariamente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
              >
                <div className="text-[#CFAB5F] mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Nossa Equipe
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Profissionais dedicados ao seu caso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-[#CFAB5F] mb-2">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <Testimonials />
    </div>
  )
} 
'use client'

import { useState } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Cliente',
    image: 'https://placehold.co/200x200/CFAB5F/FFFFFF?text=Maria+Silva',
    content: 'Excelente atendimento! O Dr. Lucas foi muito atencioso e profissional em todo o processo. Recomendo fortemente.',
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Cliente',
    image: 'https://placehold.co/200x200/CFAB5F/FFFFFF?text=João+Santos',
    content: 'O escritório me ajudou em um momento difícil. A equipe é muito competente e sempre me manteve informado sobre cada etapa.',
  },
  {
    id: 3,
    name: 'Ana Oliveira',
    role: 'Cliente',
    image: 'https://placehold.co/200x200/CFAB5F/FFFFFF?text=Ana+Oliveira',
    content: 'Profissionalismo e dedicação são as palavras que definem o trabalho do Dr. Lucas. Resultados excelentes!',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Histórias reais de clientes que confiaram em nosso trabalho
          </p>
        </div>

        <div className="mt-12">
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
                      <div className="flex items-center mb-6">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex
                      ? 'bg-[#CFAB5F]'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[#CFAB5F]"
              aria-label="Depoimento anterior"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[#CFAB5F]"
              aria-label="Próximo depoimento"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 
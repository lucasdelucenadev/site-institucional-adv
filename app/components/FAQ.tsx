'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Qual é a primeira etapa para iniciar um processo criminal?',
    answer: 'A primeira etapa é agendar uma consulta inicial, onde analisaremos seu caso em detalhes e explicaremos as possíveis estratégias de defesa. Neste momento, você poderá tirar todas as suas dúvidas e entender melhor como podemos ajudar.'
  },
  {
    question: 'Quanto tempo leva para resolver um processo criminal?',
    answer: 'O tempo de resolução varia de acordo com a complexidade do caso e a fase processual em que se encontra. Durante a consulta inicial, poderemos dar uma estimativa mais precisa baseada nas particularidades do seu caso.'
  },
  {
    question: 'Vocês atendem em todo o Brasil?',
    answer: 'Sim, atendemos em todo o território nacional. Nossa equipe está preparada para atuar em qualquer comarca do país, garantindo a melhor defesa para nossos clientes.'
  },
  {
    question: 'Como funciona o agendamento de consulta?',
    answer: 'O agendamento pode ser feito através do nosso site, por telefone ou WhatsApp. Oferecemos atendimento presencial e online, adaptando-nos à sua necessidade e disponibilidade.'
  },
  {
    question: 'Quais documentos são necessários para a primeira consulta?',
    answer: 'Para a primeira consulta, é importante trazer qualquer documentação relacionada ao caso, como notificações, intimações ou documentos pessoais. Mesmo sem todos os documentos, podemos realizar a consulta inicial e solicitar o que for necessário posteriormente.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos serviços e processos.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`px-6 py-4 bg-gray-50 dark:bg-gray-800 transition-all duration-300 ${
                  openIndex === index ? 'block' : 'hidden'
                }`}
              >
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Não encontrou a resposta que procurava?
          </p>
          <a
            href="/contato"
            className="btn bg-[#CFAB5F] text-white hover:bg-[#B89754]"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </section>
  )
} 
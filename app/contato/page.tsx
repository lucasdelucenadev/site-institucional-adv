'use client';

import { useState } from 'react';
import AppointmentForm from '../components/AppointmentForm'

export default function Contato() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Entre em Contato</h1>
            <p className="text-xl text-gray-300">
              Estamos aqui para ajudar. Entre em contato conosco para agendar uma consulta
              ou tirar suas dúvidas sobre nossos serviços.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Informações de Contato</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#CFAB5F]">Endereço</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Rua Example, 123<br />
                    Bairro - Cidade<br />
                    Estado - CEP XXXXX-XXX
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#CFAB5F]">Telefone</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    (XX) XXXX-XXXX
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#CFAB5F]">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    contato@lucasdelucena.com.br
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#CFAB5F]">Horário de Atendimento</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Segunda a Sexta: 9h às 18h<br />
                    Sábado: 9h às 12h
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Agende uma Consulta</h2>
              {formSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                    Mensagem Enviada com Sucesso!
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    Obrigado por entrar em contato. Retornaremos em breve para confirmar seu agendamento.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-[#CFAB5F] text-white rounded-md hover:bg-[#B69449] transition-colors"
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              ) : (
                <AppointmentForm onSubmit={handleFormSubmit} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Nossa Localização</h2>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975870299254!2d-46.6528214!3d-23.5617348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQyLjIiUyA0NsKwMzknMTAuMiJX!5e0!3m2!1spt-BR!2sbr!4v1635789876543!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
} 
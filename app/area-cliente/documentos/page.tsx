'use client';

import { useState } from 'react';

interface Document {
  id: number;
  title: string;
  category: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function Documentos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents: Document[] = [
    {
      id: 1,
      title: 'Contrato de Prestação de Serviços',
      category: 'Contratos',
      date: '2024-03-15',
      status: 'approved',
    },
    {
      id: 2,
      title: 'Procuração',
      category: 'Documentos Pessoais',
      date: '2024-03-10',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Petição Inicial',
      category: 'Processos',
      date: '2024-03-05',
      status: 'approved',
    },
    {
      id: 4,
      title: 'Recurso de Apelação',
      category: 'Processos',
      date: '2024-03-01',
      status: 'pending',
    },
  ];

  const categories = ['all', ...new Set(documents.map((doc) => doc.category))];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'approved':
        return 'Aprovado';
      case 'pending':
        return 'Pendente';
      case 'rejected':
        return 'Rejeitado';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Meus Documentos
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Acesse e gerencie seus documentos
          </p>
        </div>

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] dark:bg-gray-700 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas as categorias' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDocuments.map((doc) => (
                <li key={doc.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {doc.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {doc.category} • {new Date(doc.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            doc.status
                          )}`}
                        >
                          {getStatusText(doc.status)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-[#CFAB5F] bg-[#CFAB5F] bg-opacity-10 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CFAB5F]">
                        Visualizar
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-[#CFAB5F] hover:bg-[#B8944F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CFAB5F]">
                        Download
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
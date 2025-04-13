'use client';

import { useState } from 'react';
import Link from 'next/link';

interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

interface RecentActivity {
  id: number;
  title: string;
  date: string;
  type: 'document' | 'appointment' | 'message';
  status: 'pending' | 'completed' | 'cancelled';
}

export default function Dashboard() {
  const [stats] = useState<StatCard[]>([
    {
      title: 'Documentos Pendentes',
      value: 3,
      icon: '📄',
      change: '+2',
      changeType: 'increase',
    },
    {
      title: 'Próxima Audiência',
      value: '15/04/2024',
      icon: '⚖️',
    },
    {
      title: 'Mensagens Não Lidas',
      value: 2,
      icon: '✉️',
    },
    {
      title: 'Documentos Aprovados',
      value: 12,
      icon: '✅',
      change: '+5',
      changeType: 'increase',
    },
  ]);

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: 1,
      title: 'Petição Inicial - Processo #12345',
      date: '2024-03-20',
      type: 'document',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Audiência de Instrução',
      date: '2024-03-19',
      type: 'appointment',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Nova mensagem do advogado',
      date: '2024-03-18',
      type: 'message',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Contrato de Prestação de Serviços',
      date: '2024-03-17',
      type: 'document',
      status: 'completed',
    },
  ]);

  const getStatusColor = (status: RecentActivity['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
    }
  };

  const getStatusText = (status: RecentActivity['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
    }
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'document':
        return '📄';
      case 'appointment':
        return '⚖️';
      case 'message':
        return '✉️';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Bem-vindo à sua área do cliente
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {stat.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        {stat.change && (
                          <div
                            className={`ml-2 flex items-baseline text-sm font-semibold ${
                              stat.changeType === 'increase'
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {stat.change}
                          </div>
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Atividades Recentes
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivities.map((activity) => (
                  <li key={activity.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {getActivityIcon(activity.type)}
                          </span>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.title}
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              activity.status
                            )}`}
                          >
                            {getStatusText(activity.status)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            {new Date(activity.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link
                  href="/area-cliente/documentos"
                  className="font-medium text-[#CFAB5F] hover:text-[#B8944F]"
                >
                  Ver todas as atividades
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
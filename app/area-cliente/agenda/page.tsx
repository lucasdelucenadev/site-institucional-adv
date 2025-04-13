'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'audiencia' | 'reuniao' | 'consulta' | 'outro';
  status: 'agendado' | 'confirmado' | 'cancelado' | 'concluido';
  description?: string;
}

export default function Agenda() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedType, setSelectedType] = useState<Appointment['type'] | 'todos'>('todos');
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    type: 'consulta',
    description: '',
  });

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Audiência de Instrução',
      date: '2024-03-20',
      time: '14:00',
      type: 'audiencia',
      status: 'agendado',
      description: 'Audiência de instrução no processo 123456/2024',
    },
    {
      id: '2',
      title: 'Reunião com Cliente',
      date: '2024-03-21',
      time: '10:00',
      type: 'reuniao',
      status: 'confirmado',
      description: 'Reunião para discutir andamento do processo',
    },
    {
      id: '3',
      title: 'Consulta Jurídica',
      date: '2024-03-22',
      time: '15:30',
      type: 'consulta',
      status: 'agendado',
      description: 'Primeira consulta com novo cliente',
    },
  ]);

  const handleNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppointment.title && newAppointment.date && newAppointment.time) {
      const appointment: Appointment = {
        id: String(appointments.length + 1),
        title: newAppointment.title,
        date: newAppointment.date,
        time: newAppointment.time,
        type: newAppointment.type as Appointment['type'],
        status: 'agendado',
        description: newAppointment.description,
      };
      setAppointments([...appointments, appointment]);
      setShowNewAppointment(false);
      setNewAppointment({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        type: 'consulta',
        description: '',
      });
    }
  };

  const handleStatusChange = (appointment: Appointment, newStatus: Appointment['status']) => {
    setAppointments(
      appointments.map((a) =>
        a.id === appointment.id ? { ...a, status: newStatus } : a
      )
    );
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(20);
    doc.text('Agenda de Compromissos', 14, 20);

    const filteredAppointments = selectedType === 'todos' 
      ? appointments 
      : appointments.filter(a => a.type === selectedType);

    const tableData = filteredAppointments.map(appointment => [
      appointment.title,
      appointment.date,
      appointment.time,
      appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1),
      appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1),
      appointment.description || '-'
    ]);

    (doc as any).autoTable({
      head: [['Título', 'Data', 'Horário', 'Tipo', 'Status', 'Descrição']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      headStyles: {
        fillColor: [207, 171, 95],
        textColor: [0, 0, 0],
        fontSize: 12,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save('agenda.pdf');
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'agendado':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'confirmado':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelado':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'concluido':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: Appointment['type']) => {
    switch (type) {
      case 'audiencia':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'reuniao':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
        );
      case 'consulta':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
        );
    }
  };

  const filteredAppointments = selectedType === 'todos' 
    ? appointments 
    : appointments.filter(a => a.type === selectedType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Agenda
        </h1>
        <div className="flex space-x-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as Appointment['type'] | 'todos')}
            className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#CFAB5F] focus:ring-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="todos">Todos os Tipos</option>
            <option value="audiencia">Audiências</option>
            <option value="reuniao">Reuniões</option>
            <option value="consulta">Consultas</option>
            <option value="outro">Outros</option>
          </select>
          <button
            type="button"
            onClick={handleExportPDF}
            className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Exportar PDF
          </button>
          <button
            type="button"
            onClick={() => setShowNewAppointment(true)}
            className="inline-flex items-center rounded-md bg-[#CFAB5F] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#B8944F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CFAB5F]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Novo Compromisso
          </button>
        </div>
      </div>

      {showNewAppointment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewAppointment(false)}
                    className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Fechar</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                      Novo Compromisso
                    </h3>
                    <form onSubmit={handleNewAppointment} className="mt-6 space-y-4">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Título
                        </label>
                        <input
                          type="text"
                          id="title"
                          value={newAppointment.title}
                          onChange={(e) =>
                            setNewAppointment({
                              ...newAppointment,
                              title: e.target.value,
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#CFAB5F] focus:ring-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="type"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Tipo
                        </label>
                        <select
                          id="type"
                          value={newAppointment.type}
                          onChange={(e) =>
                            setNewAppointment({
                              ...newAppointment,
                              type: e.target.value as Appointment['type'],
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#CFAB5F] focus:ring-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                          required
                        >
                          <option value="audiencia">Audiência</option>
                          <option value="reuniao">Reunião</option>
                          <option value="consulta">Consulta</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Data
                          </label>
                          <input
                            type="date"
                            id="date"
                            value={newAppointment.date}
                            onChange={(e) =>
                              setNewAppointment({
                                ...newAppointment,
                                date: e.target.value,
                              })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#CFAB5F] focus:ring-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="time"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Horário
                          </label>
                          <input
                            type="time"
                            id="time"
                            value={newAppointment.time}
                            onChange={(e) =>
                              setNewAppointment({
                                ...newAppointment,
                                time: e.target.value,
                              })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#CFAB5F] focus:ring-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Descrição
                        </label>
                        <textarea
                          id="description"
                          value={newAppointment.description}
                          onChange={(e) =>
                            setNewAppointment({
                              ...newAppointment,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-[#CFAB5F] focus:ring-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-[#CFAB5F] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#B8944F] sm:ml-3 sm:w-auto"
                        >
                          Agendar
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNewAppointment(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedAppointment(null)}
                    className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Fechar</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-[#CFAB5F] bg-opacity-10 flex items-center justify-center">
                        {getTypeIcon(selectedAppointment.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                          {selectedAppointment.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {selectedAppointment.date} às {selectedAppointment.time}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Status
                        </h4>
                        <div className="mt-2 flex space-x-2">
                          {(['agendado', 'confirmado', 'cancelado', 'concluido'] as const).map(
                            (status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(selectedAppointment, status)}
                                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                  selectedAppointment.status === status
                                    ? getStatusColor(status)
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                              >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {selectedAppointment.description && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Descrição
                          </h4>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {selectedAppointment.description}
                          </p>
                        </div>
                      )}

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          onClick={() => setSelectedAppointment(null)}
                          className="inline-flex w-full justify-center rounded-md bg-[#CFAB5F] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#B8944F] sm:ml-3 sm:w-auto"
                        >
                          Fechar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Próximos Compromissos
                </h2>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Hoje
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Esta Semana
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Este Mês
                  </button>
                </div>
              </div>
              <div className="mt-6 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAppointments.map((appointment) => (
                    <li key={appointment.id} className="py-5">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-[#CFAB5F] bg-opacity-10 flex items-center justify-center">
                            {getTypeIcon(appointment.type)}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {appointment.title}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {appointment.date} às {appointment.time}
                          </p>
                          {appointment.description && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {appointment.description}
                            </p>
                          )}
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setSelectedAppointment(appointment)}
                            className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-2.5 py-1.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            Detalhes
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

        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Calendário
              </h2>
              <div className="mt-6">
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        {day}
                      </div>
                    )
                  )}
                  {Array.from({ length: 35 }, (_, i) => (
                    <button
                      key={i}
                      className={`h-10 w-10 rounded-full text-sm ${
                        i === 15
                          ? 'bg-[#CFAB5F] text-white'
                          : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
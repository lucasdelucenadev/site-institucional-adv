'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'client' | 'lawyer';
  timestamp: string;
  read: boolean;
  attachments?: Attachment[];
}

interface Attachment {
  id: number;
  name: string;
  size: string;
  type: string;
  url: string;
}

interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
}

export default function Mensagens() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Olá, como posso ajudar você hoje?',
      sender: 'lawyer',
      timestamp: '2024-03-20T10:30:00',
      read: true,
    },
    {
      id: 2,
      text: 'Preciso de informações sobre o processo #12345',
      sender: 'client',
      timestamp: '2024-03-20T10:35:00',
      read: true,
    },
    {
      id: 3,
      text: 'Claro, o processo está em fase de instrução. A próxima audiência está marcada para o dia 25/04/2024.',
      sender: 'lawyer',
      timestamp: '2024-03-20T10:40:00',
      read: true,
    },
    {
      id: 4,
      text: 'Obrigado pela informação. Preciso enviar algum documento?',
      sender: 'client',
      timestamp: '2024-03-20T10:45:00',
      read: true,
    },
    {
      id: 5,
      text: 'Sim, por favor envie os comprovantes de pagamento dos últimos 3 meses.',
      sender: 'lawyer',
      timestamp: '2024-03-20T10:50:00',
      read: false,
    },
  ]);

  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Dr. João Silva',
      role: 'Advogado Responsável',
      avatar: '👨‍⚖️',
      online: true,
    },
    {
      id: 2,
      name: 'Dra. Maria Oliveira',
      role: 'Assistente Jurídica',
      avatar: '👩‍⚖️',
      online: false,
    },
    {
      id: 3,
      name: 'Carlos Santos',
      role: 'Estagiário',
      avatar: '👨‍💼',
      online: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' && attachments.length === 0) return;

    // Simular upload de arquivos
    if (attachments.length > 0) {
      setUploading(true);
      
      // Simular processamento de upload
      setTimeout(() => {
        const uploadedAttachments: Attachment[] = attachments.map((file, index) => ({
          id: Date.now() + index,
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          url: URL.createObjectURL(file), // Em produção, isso seria a URL do servidor
        }));

        const newMsg: Message = {
          id: messages.length + 1,
          text: newMessage,
          sender: 'client',
          timestamp: new Date().toISOString(),
          read: true,
          attachments: uploadedAttachments,
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');
        setAttachments([]);
        setUploading(false);

        // Simular resposta do advogado após 2 segundos
        setTimeout(() => {
          const lawyerResponse: Message = {
            id: messages.length + 2,
            text: 'Documentos recebidos. Analisarei e retornarei em breve.',
            sender: 'lawyer',
            timestamp: new Date().toISOString(),
            read: false,
          };
          setMessages((prev) => [...prev, lawyerResponse]);
        }, 2000);
      }, 1500);
    } else {
      const newMsg: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'client',
        timestamp: new Date().toISOString(),
        read: true,
      };

      setMessages([...messages, newMsg]);
      setNewMessage('');

      // Simular resposta do advogado após 2 segundos
      setTimeout(() => {
        const lawyerResponse: Message = {
          id: messages.length + 2,
          text: 'Mensagem recebida. Retornarei em breve.',
          sender: 'lawyer',
          timestamp: new Date().toISOString(),
          read: false,
        };
        setMessages((prev) => [...prev, lawyerResponse]);
      }, 2000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const groupMessagesByDate = () => {
    const groups: { [key: string]: Message[] } = {};
    messages.forEach((message) => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('word') || type.includes('doc')) return '📝';
    if (type.includes('excel') || type.includes('sheet')) return '📊';
    if (type.includes('zip') || type.includes('rar')) return '📦';
    return '📎';
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Mensagens
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Comunicação com o escritório de advocacia
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4">
              {/* Lista de Contatos */}
              <div className="border-r border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Contatos
                  </h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        selectedContact?.id === contact.id
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : ''
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <span className="text-2xl">{contact.avatar}</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {contact.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {contact.role}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              contact.online
                                ? 'bg-green-400'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          ></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Área de Mensagens */}
              <div className="md:col-span-3 flex flex-col h-[600px]">
                {selectedContact ? (
                  <>
                    {/* Cabeçalho do Chat */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <span className="text-2xl">{selectedContact.avatar}</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedContact.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedContact.role}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              selectedContact.online
                                ? 'bg-green-400'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          ></span>
                        </div>
                      </div>
                    </div>

                    {/* Mensagens */}
                    <div className="flex-1 overflow-y-auto p-4">
                      {Object.entries(messageGroups).map(([date, msgs]) => (
                        <div key={date} className="mb-6">
                          <div className="flex justify-center mb-4">
                            <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full">
                              {date}
                            </span>
                          </div>
                          {msgs.map((message) => (
                            <div
                              key={message.id}
                              className={`mb-4 flex ${
                                message.sender === 'client'
                                  ? 'justify-end'
                                  : 'justify-start'
                              }`}
                            >
                              <div
                                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                                  message.sender === 'client'
                                    ? 'bg-[#CFAB5F] text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                                }`}
                              >
                                <p className="text-sm">{message.text}</p>
                                
                                {/* Anexos */}
                                {message.attachments && message.attachments.length > 0 && (
                                  <div className="mt-2 space-y-2">
                                    {message.attachments.map((attachment) => (
                                      <div 
                                        key={attachment.id}
                                        className="flex items-center p-2 bg-white/10 rounded-md"
                                      >
                                        <span className="text-lg mr-2">
                                          {getFileIcon(attachment.type)}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-xs truncate">{attachment.name}</p>
                                          <p className="text-xs opacity-70">{attachment.size}</p>
                                        </div>
                                        <a 
                                          href={attachment.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="ml-2 text-xs underline"
                                        >
                                          Abrir
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                <p
                                  className={`text-xs mt-1 ${
                                    message.sender === 'client'
                                      ? 'text-white/70'
                                      : 'text-gray-500 dark:text-gray-400'
                                  }`}
                                >
                                  {formatTime(message.timestamp)}
                                </p>
                                {message.sender === 'lawyer' && !message.read && (
                                  <span className="inline-block h-2 w-2 rounded-full bg-blue-500 ml-2"></span>
                                )}
                              </div>
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                      ))}
                    </div>

                    {/* Formulário de Envio */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      {/* Anexos Selecionados */}
                      {attachments.length > 0 && (
                        <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              Arquivos selecionados ({attachments.length})
                            </h4>
                            <button
                              type="button"
                              onClick={() => setAttachments([])}
                              className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Limpar todos
                            </button>
                          </div>
                          <div className="space-y-2">
                            {attachments.map((file, index) => (
                              <div 
                                key={index}
                                className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded-md"
                              >
                                <div className="flex items-center">
                                  <span className="text-lg mr-2">
                                    {getFileIcon(file.type)}
                                  </span>
                                  <div>
                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatFileSize(file.size)}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeAttachment(index)}
                                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <form onSubmit={handleSendMessage} className="space-y-3">
                        <div className="flex">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CFAB5F] focus:border-transparent dark:bg-gray-700 dark:text-white"
                            disabled={uploading}
                          />
                          <button
                            type="submit"
                            className="bg-[#CFAB5F] text-white px-4 py-2 rounded-r-md hover:bg-[#B8944F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CFAB5F] disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={uploading}
                          >
                            {uploading ? 'Enviando...' : 'Enviar'}
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              className="hidden"
                              multiple
                              disabled={uploading}
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CFAB5F] disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={uploading}
                            >
                              <span className="mr-1">📎</span> Anexar arquivos
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Máximo 5 arquivos, até 10MB cada
                          </p>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Selecione um contato para iniciar uma conversa
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
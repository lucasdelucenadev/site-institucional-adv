'use client';

import { useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function Perfil() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'João Silva',
    email: 'cliente@exemplo.com',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    address: 'Rua Exemplo, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de atualização do perfil
    setMessage({
      type: 'success',
      text: 'Perfil atualizado com sucesso!',
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'As senhas não coincidem!',
      });
      return;
    }
    // Aqui você implementaria a lógica de atualização da senha
    setMessage({
      type: 'success',
      text: 'Senha atualizada com sucesso!',
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Meu Perfil
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Atualize suas informações pessoais
          </p>
        </div>

        {message && (
          <div
            className={`mt-4 p-4 rounded-md ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100'
                : 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Informações Pessoais */}
          <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Informações Pessoais
              </h3>
              <form onSubmit={handleProfileUpdate} className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cpf"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    CPF
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    value={profile.cpf}
                    onChange={(e) =>
                      setProfile({ ...profile, cpf: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Cidade
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={profile.city}
                      onChange={(e) =>
                        setProfile({ ...profile, city: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Estado
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={profile.state}
                      onChange={(e) =>
                        setProfile({ ...profile, state: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    CEP
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={profile.zipCode}
                    onChange={(e) =>
                      setProfile({ ...profile, zipCode: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CFAB5F] hover:bg-[#B8944F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CFAB5F]"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Alterar Senha */}
          <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Alterar Senha
              </h3>
              <form onSubmit={handlePasswordUpdate} className="mt-5 space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#CFAB5F] focus:border-[#CFAB5F] sm:text-sm dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CFAB5F] hover:bg-[#B8944F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CFAB5F]"
                  >
                    Alterar Senha
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
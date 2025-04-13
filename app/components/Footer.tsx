export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#CFAB5F]">Lucas de Lucena</h3>
            <p className="text-gray-400">
              Advocacia criminal especializada, com atuação em todo o território nacional.
            </p>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#CFAB5F]">Contato</h4>
            <div className="space-y-2 text-gray-400">
              <p>Email: contato@lucasdelucena.com.br</p>
              <p>Telefone: (XX) XXXX-XXXX</p>
              <p>WhatsApp: (XX) XXXX-XXXX</p>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#CFAB5F]">Endereço</h4>
            <div className="space-y-2 text-gray-400">
              <p>Rua Example, 123</p>
              <p>Bairro - Cidade</p>
              <p>Estado - CEP XXXXX-XXX</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Lucas de Lucena Advocacia Criminal. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
} 
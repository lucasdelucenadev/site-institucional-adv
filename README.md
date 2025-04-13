# Site Institucional - Lucas de Lucena Advogados

Site institucional do escritório de advocacia Lucas de Lucena, especializado em direito criminal.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- React

## Requisitos

- Node.js 18.17 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/site-institucional-adv.git
cd site-institucional-adv
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=seu-numero-do-whatsapp
```

## Executando o Projeto

Para desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

O site estará disponível em `http://localhost:3000`

Para produção:
```bash
npm run build
npm start
# ou
yarn build
yarn start
```

## Estrutura do Projeto

```
site-institucional-adv/
├── app/
│   ├── components/
│   │   ├── MobileNav.tsx
│   │   └── WhatsAppButton.tsx
│   ├── areas-atuacao/
│   │   └── page.tsx
│   ├── contato/
│   │   └── page.tsx
│   ├── sobre/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
├── tailwind.config.ts
├── package.json
└── README.md
```

## Personalização

1. **Cores e Estilos**: Edite o arquivo `tailwind.config.ts` para personalizar as cores e estilos do site.

2. **Conteúdo**: Atualize os textos e informações nas páginas dentro da pasta `app/`.

3. **WhatsApp**: Atualize o número do WhatsApp no componente `WhatsAppButton.tsx`.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

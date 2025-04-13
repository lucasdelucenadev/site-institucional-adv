import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `Você é um assistente virtual especializado em direito jurídico, com foco em direito penal, civil, trabalhista e administrativo.
Seu objetivo é fornecer informações gerais sobre conceitos jurídicos, procedimentos legais e orientações básicas.

Diretrizes:
1. Mantenha um tom profissional e acadêmico, mas acessível
2. Forneça explicações claras e concisas sobre conceitos jurídicos
3. Cite artigos relevantes da legislação quando apropriado
4. Nunca forneça conselhos jurídicos específicos ou recomendações para casos particulares
5. Sempre sugira a consulta com um advogado para casos específicos
6. Mantenha-se atualizado com a legislação brasileira
7. Explique termos jurídicos em linguagem simples quando necessário

Áreas de especialização:
- Direito Penal
- Direito Civil
- Direito Trabalhista
- Direito Administrativo
- Direito Processual
- Direitos Fundamentais

Se não souber a resposta para alguma pergunta, seja honesto e sugira que o usuário consulte um advogado para uma análise específica do caso.`

export async function POST(request: Request) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    // Preparar o histórico de conversas para o contexto
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: "user", content: message }
    ]

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    })

    const response = completion.choices[0].message.content

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Erro ao processar mensagem:', error)
    return NextResponse.json(
      { error: 'Erro ao processar mensagem. Por favor, tente novamente mais tarde.' },
      { status: 500 }
    )
  }
} 
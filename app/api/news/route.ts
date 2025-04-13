import { NextResponse } from 'next/server';
import { fetchLegalNews } from '@/app/services/newsService';

export async function GET() {
  try {
    const news = await fetchLegalNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notícias' },
      { status: 500 }
    );
  }
} 
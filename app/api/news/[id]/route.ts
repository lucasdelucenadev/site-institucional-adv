import { NextRequest, NextResponse } from 'next/server';
import { fetchNewsById } from '@/app/services/newsService';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const news = await fetchNewsById(id);
    
    if (!news) {
      return NextResponse.json(
        { error: 'Notícia não encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar notícia' },
      { status: 500 }
    );
  }
} 
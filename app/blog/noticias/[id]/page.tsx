'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NewsArticle } from '@/app/services/newsService';

export default function NewsDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/news/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Notícia não encontrada');
          }
          throw new Error('Erro ao buscar notícia');
        }
        
        const data = await response.json();
        setArticle(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar notícia:', err);
        setError(err instanceof Error ? err.message : 'Não foi possível carregar a notícia');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#CFAB5F] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando notícia...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto h-12 w-12 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">{error}</p>
        <button
          onClick={() => router.push('/blog')}
          className="mt-4 inline-flex items-center text-[#CFAB5F] hover:text-[#B8944F] font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para o blog
        </button>
      </div>
    );
  }

  return (
    <article className="py-12">
      <div className="container mx-auto px-4">
        {/* Botão Voltar */}
        <Link
          href="/blog"
          className="inline-flex items-center text-[#CFAB5F] hover:text-[#B8944F] font-medium mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Voltar para o blog
        </Link>

        {/* Cabeçalho da Notícia */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>{article.source}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="mx-2">•</span>
            <span className="bg-[#CFAB5F] text-white text-xs font-bold px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {article.title}
          </h1>
        </header>

        {/* Imagem Principal */}
        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Conteúdo da Notícia */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="text-gray-600 dark:text-gray-400 mb-8 text-xl font-medium">
            {article.summary}
          </div>
          <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
            {article.content}
          </div>
        </div>

        {/* Link para a fonte original */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#CFAB5F] hover:text-[#B8944F] font-medium"
          >
            Ler na fonte original
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
} 
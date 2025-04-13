export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  category: string;
  url: string;
}

// Chave da API - substitua pela sua chave real
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const API_URL = 'https://newsapi.org/v2';

// Função para buscar notícias da API
async function fetchNewsFromAPI(): Promise<NewsArticle[]> {
  try {
    // Busca notícias em português relacionadas a direito, legislação e justiça
    const response = await fetch(
      `${API_URL}/everything?q=(direito OR legislação OR justiça OR tribunal OR advogado)&language=pt&sortBy=publishedAt&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Mapeia os resultados da API para o formato da nossa aplicação
    return data.articles.map((article: any, index: number) => ({
      id: `${index + 1}`,
      title: article.title,
      summary: article.description || 'Sem descrição disponível',
      content: article.content || article.description || 'Conteúdo não disponível',
      imageUrl: article.urlToImage || `https://placehold.co/600x400/CFAB5F/FFFFFF?text=${encodeURIComponent(article.title)}`,
      source: article.source.name,
      publishedAt: article.publishedAt,
      category: determineCategory(article.title, article.description),
      url: article.url
    }));
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    // Em caso de erro, retorna as notícias mockadas como fallback
    return mockNews;
  }
}

// Função para determinar a categoria com base no título e descrição
function determineCategory(title: string, description: string): string {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('penal') || text.includes('crime') || text.includes('prisão')) {
    return 'Direito Penal';
  } else if (text.includes('trabalho') || text.includes('trabalhista') || text.includes('empregado')) {
    return 'Direito Trabalhista';
  } else if (text.includes('civil') || text.includes('contrato') || text.includes('danos')) {
    return 'Direito Civil';
  } else if (text.includes('constitucional') || text.includes('stf') || text.includes('constituição')) {
    return 'Direito Constitucional';
  } else if (text.includes('digital') || text.includes('internet') || text.includes('dados')) {
    return 'Direito Digital';
  } else if (text.includes('legislação') || text.includes('lei') || text.includes('projeto')) {
    return 'Legislação';
  } else if (text.includes('tecnologia') || text.includes('ia') || text.includes('inovação')) {
    return 'Tecnologia';
  } else if (text.includes('carreira') || text.includes('oab') || text.includes('advogado')) {
    return 'Carreira Jurídica';
  } else {
    return 'Notícias';
  }
}

// Dados mockados para fallback
const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Nova Lei de Proteção de Dados entra em vigor',
    summary: 'A LGPD estabelece regras sobre coleta, armazenamento, tratamento e compartilhamento de dados pessoais.',
    content: `A Lei Geral de Proteção de Dados (LGPD) entrou em vigor em setembro de 2020, estabelecendo regras sobre coleta, armazenamento, tratamento e compartilhamento de dados pessoais, e alterando a Lei nº 12.965/2014 (Marco Civil da Internet).

A LGPD foi inspirada na GDPR (General Data Protection Regulation) da União Europeia e traz impactos significativos para empresas e organizações que lidam com dados pessoais.

Principais pontos da lei:

1. Consentimento do titular dos dados
2. Direitos dos titulares dos dados
3. Obrigações das empresas
4. Sanções administrativas
5. Autoridade Nacional de Proteção de Dados (ANPD)

As empresas precisam se adaptar à nova legislação, implementando medidas técnicas e organizativas para garantir a proteção dos dados pessoais.`,
    imageUrl: 'https://placehold.co/600x400/CFAB5F/FFFFFF?text=Nova+Lei+de+Proteção+de+Dados',
    source: 'Portal Jurídico',
    publishedAt: '2024-03-15T10:00:00Z',
    category: 'Legislação',
    url: 'https://exemplo.com/noticias/lgpd'
  },
  {
    id: '2',
    title: 'Supremo decide sobre marco temporal das terras indígenas',
    summary: 'Decisão do STF sobre marco temporal pode afetar demarcação de terras indígenas em todo o país.',
    content: `O Supremo Tribunal Federal (STF) julgou o marco temporal das terras indígenas, estabelecendo que os povos indígenas só têm direito à terra se estivessem ocupando-a na data da promulgação da Constituição Federal de 1988.

A decisão tem grande impacto para as demarcações de terras indígenas em todo o país e gerou debates sobre os direitos constitucionais dos povos indígenas.

Pontos importantes da decisão:

1. Interpretação do artigo 231 da CF
2. Direitos originários dos povos indígenas
3. Impacto nas demarcações pendentes
4. Repercussão internacional
5. Possíveis recursos e desdobramentos`,
    imageUrl: 'https://placehold.co/600x400/CFAB5F/FFFFFF?text=Marco+Temporal+Terras+Indígenas',
    source: 'Jornal do Direito',
    publishedAt: '2024-03-14T15:30:00Z',
    category: 'Direito Constitucional',
    url: 'https://exemplo.com/noticias/marco-temporal'
  },
  {
    id: '3',
    title: 'Reforma Trabalhista: 5 anos de mudanças',
    summary: 'Análise dos impactos da Reforma Trabalhista após 5 anos de sua implementação.',
    content: `A Reforma Trabalhista completa 5 anos de vigência, trazendo mudanças significativas nas relações de trabalho no Brasil.

Principais alterações implementadas:

1. Negociação coletiva sobre legislação
2. Terceirização
3. Trabalho intermitente
4. Acordos individuais
5. Danos morais

Análise dos impactos:

- Redução de processos trabalhistas
- Maior flexibilidade nas relações de trabalho
- Mudanças na jurisprudência
- Adaptação das empresas
- Desafios para os trabalhadores`,
    imageUrl: 'https://placehold.co/600x400/CFAB5F/FFFFFF?text=Reforma+Trabalhista',
    source: 'Revista Trabalhista',
    publishedAt: '2024-03-13T09:15:00Z',
    category: 'Direito Trabalhista',
    url: 'https://exemplo.com/noticias/reforma-trabalhista'
  },
  {
    id: '4',
    title: 'STF decide sobre prisão preventiva em casos de corrupção',
    summary: 'O Supremo Tribunal Federal estabeleceu novos critérios para prisão preventiva em casos de corrupção, reforçando a necessidade de fundamentação adequada.',
    content: `O Supremo Tribunal Federal (STF) estabeleceu novos critérios para a decretação de prisão preventiva em casos de corrupção. A decisão, tomada em sessão plenária, reforça a necessidade de fundamentação adequada e demonstração de risco à ordem pública.

A corte entendeu que a simples existência de indícios de autoria e materialidade não é suficiente para justificar a prisão preventiva. É necessário demonstrar, de forma concreta, que a liberdade do acusado representa risco à ordem pública, à investigação ou à aplicação da lei penal.

O ministro relator destacou que a prisão preventiva deve ser utilizada como medida excepcional, sempre respeitando o princípio da presunção de inocência. A decisão também estabeleceu prazos mais rigorosos para a conclusão das investigações quando houver prisão preventiva.

Esta mudança na jurisprudência do STF reflete uma tendência internacional de maior cautela na decretação de prisões cautelares, priorizando medidas alternativas quando possível.`,
    imageUrl: 'https://placehold.co/600x400/CFAB5F/FFFFFF?text=Prisão+Preventiva+Corrupção',
    source: 'Portal Jurídico',
    publishedAt: '2024-04-15T10:30:00Z',
    category: 'Direito Constitucional',
    url: 'https://exemplo.com/noticia/1'
  },
  {
    id: '5',
    title: 'Nova lei de proteção de dados pessoais em processos judiciais',
    summary: 'Legislação recente estabelece regras para o tratamento de dados pessoais em processos judiciais, com foco na proteção da privacidade das partes.',
    content: `Uma nova legislação sobre proteção de dados pessoais em processos judiciais foi sancionada, estabelecendo regras claras para o tratamento de informações sensíveis. A lei visa harmonizar as normas processuais com a LGPD (Lei Geral de Proteção de Dados).

Entre as principais mudanças está a obrigatoriedade de anonimização de dados pessoais em processos digitais, com exceção apenas para informações essenciais à resolução do conflito. A nova legislação também estabelece prazos para a remoção de dados sensíveis após o trânsito em julgado.

Os tribunais terão um prazo de 180 dias para se adequarem às novas regras, que incluem a implementação de sistemas de proteção de dados e treinamento de servidores. A medida visa aumentar a segurança das informações processuais e proteger a privacidade das partes envolvidas.`,
    imageUrl: 'https://placehold.co/600x400/CFAB5F/FFFFFF?text=Proteção+de+Dados+Processos',
    source: 'Revista Jurídica',
    publishedAt: '2024-04-14T15:45:00Z',
    category: 'Direito Digital',
    url: 'https://exemplo.com/noticia/2'
  },
  {
    id: '6',
    title: 'Reforma do Código de Processo Penal avança no Congresso',
    summary: 'Projeto de lei que moderniza o Código de Processo Penal recebe novas emendas e deve ser votado em breve no plenário da Câmara.',
    content: `O projeto de lei que propõe a reforma do Código de Processo Penal (CPP) avançou na Câmara dos Deputados, com a aprovação de novas emendas em comissão especial. As mudanças visam modernizar o processo penal brasileiro e reduzir a morosidade na Justiça.

Entre as principais alterações está a simplificação de atos processuais, com maior uso de tecnologia e videoconferências. O projeto também prevê a criação de um sistema unificado de informações processuais e a padronização de prazos processuais.

A reforma busca equilibrar a eficiência processual com as garantias constitucionais, mantendo o devido processo legal e o contraditório. A expectativa é que o projeto seja votado no plenário da Câmara ainda neste semestre.`,
    imageUrl: 'https://placehold.co/600x400/CFAB5F/FFFFFF?text=Reforma+CPP',
    source: 'Agência Legislativa',
    publishedAt: '2024-04-13T09:15:00Z',
    category: 'Legislação',
    url: 'https://exemplo.com/noticia/3'
  },
  {
    id: '7',
    title: 'TJSP implementa inteligência artificial para análise de processos',
    summary: 'Tribunal de Justiça de São Paulo inicia projeto piloto usando IA para análise e classificação automática de processos.',
    content: `O Tribunal de Justiça de São Paulo (TJSP) iniciou um projeto piloto utilizando inteligência artificial para análise e classificação automática de processos. A iniciativa visa aumentar a eficiência do trabalho dos magistrados e servidores.

O sistema de IA foi desenvolvido para identificar padrões em petições, classificar processos por complexidade e sugerir decisões preliminares. A ferramenta também auxilia na identificação de processos prioritários e na organização do fluxo de trabalho.

O projeto está em fase inicial, com testes em uma vara criminal da capital. Os resultados preliminares indicam uma redução significativa no tempo de análise dos processos e maior consistência nas decisões. A expectativa é expandir o uso da IA para outras varas nos próximos meses.`,
    imageUrl: 'https://placehold.co/600x400/CFAB5F/FFFFFF?text=IA+Justiça',
    source: 'Portal Jurídico',
    publishedAt: '2024-04-12T14:20:00Z',
    category: 'Tecnologia',
    url: 'https://exemplo.com/noticia/4'
  },
  {
    id: '8',
    title: 'OAB lança programa de mentoria para jovens advogados',
    summary: 'Nova iniciativa da OAB oferece mentoria gratuita para advogados em início de carreira, com foco em áreas específicas do direito.',
    content: `A Ordem dos Advogados do Brasil (OAB) lançou um programa de mentoria voltado para jovens advogados. A iniciativa visa auxiliar profissionais em início de carreira, oferecendo orientação de advogados experientes.

O programa inclui encontros periódicos com mentores, workshops temáticos e networking entre participantes. As áreas de mentoria incluem direito penal, civil, trabalhista e empresarial, entre outras.

A expectativa é atender mais de 1.000 jovens advogados em todo o país no primeiro ano do programa. As inscrições já estão abertas e podem ser feitas através do site da OAB.`,
    imageUrl: 'https://placehold.co/600x400/CFAB5F/FFFFFF?text=Programa+de+Mentoria+OAB',
    source: 'Portal da OAB',
    publishedAt: '2024-04-11T11:00:00Z',
    category: 'Carreira Jurídica',
    url: 'https://exemplo.com/noticia/5'
  },
  {
    id: '9',
    title: 'Nova jurisprudência sobre danos morais em acidentes de trânsito',
    summary: 'STJ estabelece novos parâmetros para fixação de indenização por danos morais em casos de acidentes de trânsito.',
    content: `O Superior Tribunal de Justiça (STJ) estabeleceu novos parâmetros para a fixação de indenização por danos morais em casos de acidentes de trânsito. A decisão visa padronizar os valores e evitar abusos nas indenizações.

A corte entendeu que o valor da indenização deve ser proporcional à gravidade do acidente e ao grau de culpa do responsável. Foram estabelecidas faixas de indenização baseadas em critérios objetivos, como a natureza do dano e as circunstâncias do acidente.

A decisão também reforça a necessidade de fundamentação adequada para a fixação dos valores, evitando arbitramento sem critérios. A mudança deve impactar significativamente os processos em andamento sobre o tema.`,
    imageUrl: 'https://placehold.co/600x400/CFAB5F/FFFFFF?text=Danos+Morais+Acidentes',
    source: 'Revista dos Tribunais',
    publishedAt: '2024-04-10T16:45:00Z',
    category: 'Direito Civil',
    url: 'https://exemplo.com/noticia/6'
  }
];

// Cache para armazenar as notícias e evitar requisições frequentes
let newsCache: NewsArticle[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos em milissegundos

export async function getNews(): Promise<NewsArticle[]> {
  const now = Date.now();
  
  // Verifica se o cache é válido
  if (newsCache && (now - lastFetchTime < CACHE_DURATION)) {
    return newsCache;
  }
  
  // Busca notícias da API
  const news = await fetchNewsFromAPI();
  
  // Atualiza o cache
  newsCache = news;
  lastFetchTime = now;
  
  return news;
}

export async function getNewsById(id: string): Promise<NewsArticle | null> {
  const news = await getNews();
  const article = news.find(article => article.id === id);
  return article || null;
} 
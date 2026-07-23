import type { CategoryMeta, ProjectCategory } from '@/types';

/* ============================================================
   CONFIGURAÇÃO DO SITE
   SUBSTITUIR: ajuste os dados de contato e URLs abaixo.
   ============================================================ */

export const site = {
  name: 'Drew Marques',
  handle: 'DevDreew',
  role: 'Analista de Dados',
  location: 'Barueri · São Paulo, Brasil',

  /** Frase de posicionamento do Hero. */
  tagline: 'Transformo dado em decisão — e decisão em interface.',

  /** Descrição usada em SEO / Open Graph. */
  description:
    'Analista de Dados em Barueri/SP. Power BI, SQL, Python e automação de processos — com a rara capacidade de também construir o produto digital que entrega o resultado.',

  // SUBSTITUIR: domínio final na Vercel
  url: 'https://devdreew.vercel.app',

  github: 'https://github.com/DevDreew',
  githubUser: 'DevDreew',

  // SUBSTITUIR: sua URL real do LinkedIn
  linkedin: 'https://www.linkedin.com/in/devdreew',

  // SUBSTITUIR: seu e-mail de contato
  email: 'contato@devdreew.com.br',

  // SUBSTITUIR: seu WhatsApp com DDI+DDD, só números
  whatsapp: '5511999999999',

  // SUBSTITUIR: coloque o PDF em /public/curriculo-drew-marques.pdf
  resumeUrl: '/curriculo-drew-marques.pdf',
} as const;

/* ============================================================
   CATEGORIAS DE PROJETO
   A ordem aqui define a ordem dos botões de filtro.
   ============================================================ */

export const categories: CategoryMeta[] = [
  { id: 'analise-de-dados', label: 'Análise de Dados', color: 'var(--c-cat-data)' },
  { id: 'business-intelligence', label: 'Business Intelligence', color: 'var(--c-cat-bi)' },
  { id: 'desenvolvimento-web', label: 'Desenvolvimento Web', color: 'var(--c-cat-web)' },
  { id: 'automacao', label: 'Automação', color: 'var(--c-cat-auto)' },
];

export const categoryMap: Record<ProjectCategory, CategoryMeta> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<ProjectCategory, CategoryMeta>;

/* ============================================================
   NAVEGAÇÃO
   ============================================================ */

export const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#stack', label: 'Stack' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#github', label: 'GitHub' },
  { href: '#certificados', label: 'Certificados' },
  { href: '#contato', label: 'Contato' },
] as const;

/* ============================================================
   KPIs DO HERO
   SUBSTITUIR: ajuste com seus números reais.
   ============================================================ */

export const heroStats = [
  { value: 156, suffix: 'K+', label: 'Registros tratados' },
  { value: 40, suffix: '+', label: 'Dashboards entregues' },
  { value: 9, suffix: '', label: 'Domínios de negócio' },
  { value: 4, suffix: '', label: 'Anos com dados' },
] as const;

import type { SkillGroup } from '@/types';

/* ============================================================
   STACK / SKILLS

   COMO ADICIONAR UMA SKILL NOVA:
   1. Coloque o ícone (SVG ou PNG transparente) em /public/icons/
   2. Acrescente um objeto { name, icon, level } no grupo certo
   O grid se ajusta sozinho.

   ÍCONES QUE VOCÊ JÁ TEM — renomeie e jogue em /public/icons/:
   - sqlite.png    → o SVG/PNG do SQLite que você enviou
   - powerbi.png   → o ícone amarelo do Power BI que você enviou
   Para os demais, baixe em https://simpleicons.org (SVG monocromático)
   ou https://devicon.dev (SVG colorido).
   ============================================================ */

export const skillGroups: SkillGroup[] = [
  {
    id: 'dados',
    label: 'Análise de Dados',
    description: 'Extrair, limpar e interrogar a base até ela responder a pergunta de negócio.',
    color: 'var(--c-cat-data)',
    skills: [
      { name: 'SQL', icon: '/icons/sql.svg', level: 'Avançado' },
      { name: 'Python', icon: '/icons/python.svg', level: 'Avançado' },
      { name: 'SQLite', icon: '/icons/sqlite.png', level: 'Avançado' },
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg', level: 'Avançado' },
      { name: 'Excel', icon: '/icons/excel.svg', level: 'Avançado' },
      { name: 'Pandas', icon: '/icons/pandas.svg', level: 'Avançado' },
    ],
  },
  {
    id: 'bi',
    label: 'Business Intelligence',
    description: 'Modelagem dimensional, DAX e painéis que a diretoria realmente usa.',
    color: 'var(--c-cat-bi)',
    skills: [
      { name: 'Power BI', icon: '/icons/powerbi.png', level: 'Avançado' },
      { name: 'DAX', icon: '/icons/dax.svg', level: 'Avançado' },
      { name: 'Star Schema', icon: '/icons/schema.svg', level: 'Avançado' },
      { name: 'Chart.js', icon: '/icons/chartjs.svg', level: 'Intermediário' },
    ],
  },
  {
    id: 'web',
    label: 'Desenvolvimento Web',
    description: 'O diferencial: eu não paro no insight, eu entrego o produto que o usa.',
    color: 'var(--c-cat-web)',
    skills: [
      { name: 'Next.js', icon: '/icons/nextjs.svg', level: 'Avançado' },
      { name: 'React', icon: '/icons/react.svg', level: 'Avançado' },
      { name: 'TypeScript', icon: '/icons/typescript.svg', level: 'Avançado' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind.svg', level: 'Avançado' },
      { name: 'Supabase', icon: '/icons/supabase.svg', level: 'Avançado' },
      { name: 'Git', icon: '/icons/git.svg', level: 'Avançado' },
    ],
  },
  {
    id: 'automacao',
    label: 'Automação',
    description: 'Todo processo repetitivo é dívida operacional. Eu quito.',
    color: 'var(--c-cat-auto)',
    skills: [
      { name: 'Playwright', icon: '/icons/playwright.svg', level: 'Avançado' },
      { name: 'Selenium', icon: '/icons/selenium.svg', level: 'Avançado' },
      { name: 'Power Automate', icon: '/icons/powerautomate.svg', level: 'Intermediário' },
      { name: 'APIs REST', icon: '/icons/api.svg', level: 'Avançado' },
    ],
  },
];

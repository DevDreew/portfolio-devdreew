import type { Project } from '@/types';

/* ============================================================
   PROJETOS

   COMO ADICIONAR UM PROJETO NOVO:
   Basta acrescentar um objeto no array abaixo. O card, o filtro,
   os badges e o modal de detalhe são gerados automaticamente.
   Nenhum arquivo de layout precisa ser tocado.

   - `slug`      → único, sem espaços e sem acento
   - `category`  → um dos 4 IDs definidos em data/site.ts
   - `thumbnail` → coloque a imagem em /public/projects/ e
                   referencie como '/projects/nome-do-arquivo.png'
                   Se omitir, o card renderiza um preview gerado
                   com a cor da categoria (não quebra o layout).
   - `featured`  → true faz o projeto aparecer primeiro
   ============================================================ */

export const projects: Project[] = [
  {
    slug: 'plataforma-numeracao-telecom',
    title: 'Plataforma de Numeração Telecom',
    summary:
      'Star schema no Supabase que consolidou 156.790 números únicos e substituiu o controle manual em Excel.',
    category: 'analise-de-dados',
    stack: ['Supabase', 'PostgreSQL', 'Python', 'SQL', 'Chart.js'],
    // SUBSTITUIR: /projects/plataforma-numeracao.png
    thumbnail: '/projects/plataforma-numeracao.png',
    year: '2025',
    featured: true,
    detail: {
      problem:
        'O controle de numeração vivia espalhado em planilhas Excel divergentes entre áreas. Não existia fonte única de verdade, o vocabulário de negócio mudava de time para time e qualquer pergunta simples — quantos números estão ativos hoje? — exigia meia hora de conferência manual.',
      solution:
        'Modelei um star schema dedicado no Supabase, com dimensões de operadora, equipamento e cliente, e uma fato de numeração. Construí o pipeline de ingestão em Python para ler os arquivos Excel, normalizar equipamento em domínio fechado e deduplicar a base. Em paralelo, fixei um glossário de negócio explícito para os KPIs, eliminando termos ambíguos.',
      result:
        'Base única com 156.790 números limpos e um dashboard HTML servido direto do Supabase, com os cinco KPIs oficiais consultáveis em segundos por qualquer área.',
      metrics: [
        { value: '156.790', label: 'Números únicos' },
        { value: '5', label: 'KPIs oficiais' },
        { value: '~30min → seg', label: 'Tempo de consulta' },
      ],
    },
  },
  {
    slug: 'dashboard-portabilidade-powerbi',
    title: 'Dashboard de Portabilidade',
    summary:
      'Modelo semântico e painel executivo de portabilidade numérica, com DAX otimizado e navegação por drill-through.',
    category: 'business-intelligence',
    stack: ['Power BI', 'DAX', 'SQL', 'Modelagem dimensional'],
    // SUBSTITUIR: /projects/dashboard-portabilidade.png
    thumbnail: '/projects/dashboard-portabilidade.png',
    year: '2025',
    featured: true,
    detail: {
      problem:
        'A diretoria acompanhava portabilidade por relatórios estáticos enviados por e-mail, sempre defasados e sem possibilidade de recorte por operadora ou período.',
      solution:
        'Reconstruí o modelo em star schema com dimensão calendário dedicada, relacionamentos de cardinalidade correta e medidas DAX com contexto de filtro explícito. Desenhei a hierarquia visual da página seguindo leitura em Z: KPIs no topo, tendência no centro, detalhamento com drill-through.',
      result:
        'Painel autoexplicativo consumido diretamente pela diretoria, com atualização programada e recorte livre por operadora, período e status.',
      metrics: [
        { value: 'Diário', label: 'Atualização' },
        { value: '4', label: 'Operadoras comparadas' },
      ],
    },
  },
  {
    slug: 'robo-sakura',
    title: 'Sakura — Robô de Automação',
    summary:
      'Robô em Python + Playwright que automatiza submissões em portal externo, com interface Tkinter e tracking em Excel.',
    category: 'automacao',
    stack: ['Python', 'Playwright', 'Tkinter', 'openpyxl'],
    // SUBSTITUIR: /projects/robo-sakura.png
    thumbnail: '/projects/robo-sakura.png',
    year: '2025',
    detail: {
      problem:
        'O preenchimento de formulários no portal Anti-Spam era 100% manual, repetitivo e sujeito a erro de digitação, consumindo horas da operação todos os dias.',
      solution:
        'Construí um robô com Playwright para navegar e submeter os formulários, envolvido em uma interface Tkinter para que a operação rodasse sem tocar em código. Cada submissão grava status e timestamp em uma planilha de acompanhamento, com tratamento de falha e retomada.',
      result:
        'Processo diário automatizado com rastro auditável de cada submissão e liberação da equipe para trabalho analítico.',
      metrics: [
        { value: '100%', label: 'Do fluxo automatizado' },
        { value: 'Excel', label: 'Log auditável' },
      ],
    },
  },
  {
    slug: 'dreewsmart',
    title: 'DreewSmart',
    summary:
      'E-commerce de suplementos e academia com renders 3D de produto, catálogo completo e identidade visual própria.',
    category: 'desenvolvimento-web',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vercel'],
    // SUBSTITUIR: /projects/dreewsmart.png
    thumbnail: '/projects/dreewsmart.png',
    year: '2026',
    featured: true,
    repoUrl: 'https://github.com/DevDreew',
    detail: {
      problem:
        'A marca precisava de uma presença digital com valor percebido compatível com o produto — o padrão de e-commerce genérico de template derrubaria o posicionamento.',
      solution:
        'Construí o site inteiro em Next.js 15 com App Router, integrando renders reais de produto, catálogo tipado de 11 itens e um sistema de design próprio em preto, vermelho e branco, com parallax e transições cinematográficas.',
      result:
        'Site em produção na Vercel, com catálogo completo e identidade visual consistente em todas as páginas.',
      metrics: [
        { value: '11', label: 'Produtos no catálogo' },
        { value: '27', label: 'Arquivos no rebrand' },
      ],
    },
  },
  {
    slug: 'ta-marcado',
    title: 'Tá Marcado',
    summary:
      'PWA de agendamento para salões de beleza, com gestão via WhatsApp e identidade visual magenta.',
    category: 'desenvolvimento-web',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind v4', 'PWA'],
    // SUBSTITUIR: /projects/ta-marcado.png
    thumbnail: '/projects/ta-marcado.png',
    year: '2025',
    detail: {
      problem:
        'Salões de bairro perdem horário e cliente por gerenciar agenda em caderno ou em conversas soltas de WhatsApp, sem visão consolidada do dia.',
      solution:
        'Desenvolvi um PWA instalável no celular, com fontes self-hosted para carregar rápido em rede móvel e fluxo de gestão pensado para dona de salão — sem painel administrativo complexo, tudo confirmado por WhatsApp.',
      result:
        'Aplicação instalável, funcional offline no shell e pensada para uso real por quem não é técnico.',
    },
  },
  {
    slug: 'dreewluxy',
    title: 'DreewLuxy',
    summary:
      'Boutique fictícia de relógios de luxo — peça de portfólio com hero cinematográfico e sobriedade suíça.',
    category: 'desenvolvimento-web',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    // SUBSTITUIR: /projects/dreewluxy.png
    thumbnail: '/projects/dreewluxy.png',
    year: '2025',
    detail: {
      problem:
        'Precisava de uma peça de portfólio que provasse capacidade de execução em alto padrão visual, sem depender de cliente real.',
      solution:
        'Criei a marca do zero e construí a experiência inteira: hero cinematográfico, tipografia de sobriedade suíça e imersão total de marca em cada seção.',
      result:
        'Peça de portfólio que demonstra direção de arte e execução técnica no mesmo entregável.',
    },
  },

  /* ------------------------------------------------------------
     SUBSTITUIR: duplique o bloco abaixo para cada projeto novo.
     ------------------------------------------------------------
  {
    slug: 'meu-projeto',
    title: 'Título do Projeto',
    summary: 'Uma ou duas linhas explicando o que o projeto entrega.',
    category: 'analise-de-dados',
    stack: ['Tecnologia A', 'Tecnologia B'],
    thumbnail: '/projects/meu-projeto.png',
    year: '2026',
    repoUrl: 'https://github.com/DevDreew/meu-projeto',
    liveUrl: 'https://meu-projeto.vercel.app',
    detail: {
      problem: 'Qual era a dor concreta.',
      solution: 'O que você construiu e por quê.',
      result: 'O impacto medido.',
      metrics: [{ value: '00%', label: 'Métrica' }],
    },
  },
  ------------------------------------------------------------ */
];

/** Projetos ordenados: destaques primeiro, depois por ano decrescente. */
export const sortedProjects = [...projects].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return b.year.localeCompare(a.year);
});

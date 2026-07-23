# Portfólio — Drew Marques · DevDreew

Portfólio profissional de Analista de Dados. Next.js 15 (App Router), TypeScript, Tailwind CSS e Framer Motion.

**Direção visual:** "Instrumento Analítico" — base branca, hairlines de grid milimetrado, cor usada como dado e não como decoração.

---

## 1. Instalação e execução local

Requisito: Node.js 18.18 ou superior.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Outros comandos:

```bash
npm run build   # build de produção
npm run start   # servir o build localmente
npm run lint    # checagem do ESLint
```

---

## 2. O que substituir antes de publicar

Todos os pontos estão marcados no código com o comentário `// SUBSTITUIR:`. Para encontrar todos de uma vez:

```bash
grep -rn "SUBSTITUIR" --include=*.ts --include=*.tsx .
```

### Prioridade alta (o site já funciona sem, mas fica incompleto)

| Onde | O quê |
|---|---|
| `data/site.ts` | E-mail, WhatsApp, URL do LinkedIn, domínio final |
| `public/curriculo-drew-marques.pdf` | Seu currículo em PDF |
| `public/icons/` | Ícones das tecnologias |
| `public/projects/` | Prints dos projetos |
| `public/certificates/` | Imagens dos certificados |
| `data/certificates.ts` | Seus certificados reais |
| `public/og.png` | Imagem 1200×630 para link preview |

O site **não quebra** se essas imagens ainda não existirem — cada componente tem fallback: ícone vira monograma colorido, thumbnail vira grid com a inicial do projeto, certificado vira placeholder "imagem pendente".

### Ícones

Coloque em `public/icons/` com os nomes exatos referenciados em `data/skills.ts`:

```
sqlite.png          ← o arquivo que você já tem
powerbi.png         ← o arquivo que você já tem
sql.svg  python.svg  postgresql.svg  excel.svg  pandas.svg
dax.svg  schema.svg  chartjs.svg
nextjs.svg  react.svg  typescript.svg  tailwind.svg  supabase.svg  git.svg
playwright.svg  selenium.svg  powerautomate.svg  api.svg
```

Onde baixar os que faltam:
- **[simpleicons.org](https://simpleicons.org)** — SVG monocromático, visual mais coeso com a estética do site
- **[devicon.dev](https://devicon.dev)** — SVG colorido oficial de cada marca

---

## 3. Deploy na Vercel

### Passo 1 — subir para o GitHub

```bash
git init
git add .
git commit -m "feat: portfolio DevDreew"
git branch -M main
git remote add origin https://github.com/DevDreew/portfolio.git
git push -u origin main
```

Se o repositório ainda não existir, crie em [github.com/new](https://github.com/new) **sem** marcar README, .gitignore ou licença — o repo precisa estar vazio.

### Passo 2 — importar na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository** → selecione `portfolio`
3. A Vercel detecta Next.js sozinha — **não altere nada** em Framework Preset, Build Command ou Output Directory
4. Clique em **Deploy**

Em cerca de 2 minutos o site está no ar em `portfolio-xxx.vercel.app`.

### Passo 3 — variáveis de ambiente (opcional)

Em **Settings → Environment Variables**:

| Nome | Valor | Para quê |
|---|---|---|
| `GITHUB_TOKEN` | token read-only do GitHub | Sobe o rate limit da API de 60 para 5.000 req/hora |
| `RESEND_API_KEY` | chave da Resend | Faz o formulário de contato enviar e-mail de verdade |

O `GITHUB_TOKEN` é gerado em [github.com/settings/tokens](https://github.com/settings/tokens) → *Generate new token (classic)* → **sem marcar nenhum escopo** (dados públicos não exigem permissão).

Depois de adicionar qualquer variável, faça **Redeploy** para ela ser aplicada.

### Passo 4 — domínio próprio (opcional)

**Settings → Domains** → adicione seu domínio e siga as instruções de DNS. Depois atualize `url` em `data/site.ts` e faça um novo push.

---

## 4. Onde adicionar cada tipo de conteúdo

O site inteiro é alimentado por quatro arquivos em `data/`. **Nenhum arquivo de layout precisa ser tocado** para adicionar conteúdo.

### Novo projeto → `data/projects.ts`

Acrescente um objeto no array `projects`. O card, o filtro por categoria, os badges de stack e o modal de detalhe são gerados automaticamente. O contador ao lado de cada filtro também se atualiza sozinho.

```ts
{
  slug: 'meu-projeto',                    // único, sem espaço e sem acento
  title: 'Título do Projeto',
  summary: 'Uma ou duas linhas.',
  category: 'analise-de-dados',           // um dos 4 IDs de data/site.ts
  stack: ['Python', 'SQL'],
  thumbnail: '/projects/meu-projeto.png', // opcional
  year: '2026',
  featured: true,                         // opcional — sobe para o topo
  repoUrl: 'https://github.com/...',      // opcional
  liveUrl: 'https://...',                 // opcional
  detail: {
    problem: 'Qual era a dor concreta.',
    solution: 'O que você construiu e por quê.',
    result: 'O impacto medido.',
    metrics: [{ value: '00%', label: 'Métrica' }],  // opcional
  },
}
```

### Novo certificado → `data/certificates.ts`

Salve a imagem em `public/certificates/` (JPG ou PNG, proporção ~4:3, largura mínima 1200px) e acrescente o objeto. O grid e o lightbox funcionam automaticamente.

### Nova skill → `data/skills.ts`

Coloque o ícone em `public/icons/` e acrescente `{ name, icon, level }` no grupo apropriado. Para criar um **grupo novo**, adicione um objeto em `skillGroups` — o grid de duas colunas se ajusta sozinho.

### Nova categoria de projeto → `data/site.ts` + `types/index.ts`

1. Adicione o ID ao union type `ProjectCategory` em `types/index.ts`
2. Adicione o objeto ao array `categories` em `data/site.ts`
3. Se quiser cor própria, declare o token em `app/globals.css` e registre em `tailwind.config.ts`

O TypeScript avisa se você esquecer algum passo.

### Textos institucionais

| Conteúdo | Arquivo |
|---|---|
| Nome, cargo, tagline, links, KPIs do hero | `data/site.ts` |
| Narrativa e princípios da seção Sobre | `components/sections/About.tsx` |
| Áreas de atuação (bloco preto) | `components/sections/Profile.tsx` |

---

## 5. Estrutura de arquivos

```
.
├── app/
│   ├── api/contato/route.ts    Endpoint do formulário (validação server-side)
│   ├── globals.css             Design tokens + classes base
│   ├── layout.tsx              Fontes, metadata, SEO, JSON-LD
│   ├── not-found.tsx           Página 404
│   ├── page.tsx                Composição das seções
│   ├── robots.ts               robots.txt gerado
│   └── sitemap.ts              sitemap.xml gerado
│
├── components/
│   ├── sections/               Uma seção da página por arquivo
│   │   ├── Header.tsx          Nav sticky + scroll spy + menu mobile
│   │   ├── Hero.tsx            Hero + gráfico animado + KPIs
│   │   ├── About.tsx
│   │   ├── Stack.tsx
│   │   ├── Projects.tsx        ★ Filtro animado (seção central)
│   │   ├── GitHub.tsx          Server Component com fetch cacheado
│   │   ├── Certificates.tsx    Grid + lightbox
│   │   ├── Profile.tsx
│   │   ├── Contact.tsx         Formulário validado
│   │   └── Footer.tsx
│   └── ui/                     Primitivos reutilizáveis
│       ├── SectionHeader.tsx
│       ├── Counter.tsx         Número que anima ao entrar na viewport
│       ├── SkillIcon.tsx       Ícone com fallback de monograma
│       ├── ProjectModal.tsx    Modal com focus trap
│       ├── GitHubReveal.tsx    Fronteira server → client
│       └── Cursor.tsx          Cursor customizado
│
├── data/                       ★ TODO O CONTEÚDO VIVE AQUI
│   ├── site.ts                 Perfil, links, categorias, navegação
│   ├── projects.ts             Projetos
│   ├── skills.ts               Stack
│   └── certificates.ts         Certificados
│
├── lib/
│   ├── github.ts               Cliente da GitHub API + cores de linguagem
│   ├── motion.ts               Variantes de animação compartilhadas
│   └── utils.ts
│
├── types/index.ts              Tipagem central
└── public/{icons,projects,certificates}/
```

---

## 6. Decisões técnicas

**A seção GitHub é Server Component, não `useEffect`.** O fetch acontece no servidor com `revalidate: 3600`. Isso significa uma chamada à API por hora **para todos os visitantes somados** — em vez de uma por pessoa. O limite público de 60 req/hora nunca é atingido, e os dados chegam já no HTML (sem flash de loading e sem custo de LCP).

**Filtro de projetos com `layoutId`.** Os cards fazem transição de posição em vez de sumir e reaparecer, e a pílula preta do filtro ativo desliza entre os botões. É o detalhe que separa um filtro que parece caro de um que parece um `display: none`.

**Fallbacks em toda imagem opcional.** Ícone, thumbnail e certificado ausentes não quebram o layout — cada um degrada para um placeholder desenhado. Isso permite publicar o site hoje e completar os assets depois.

**Acessibilidade tratada como requisito, não como extra.** Modal e lightbox fecham com Esc, prendem o foco e devolvem o foco ao elemento de origem. Todo estado de formulário é anunciado por `role="alert"` e `aria-live`. Há skip link. O cursor customizado desliga em toque e com `prefers-reduced-motion`, assim como todas as animações.

**Contraste AA.** A cor do Power BI foi escurecida de `#F2B705` para `#B8860B` no token de categoria — o amarelo original não passa em AA sobre branco. O amarelo permanece no ícone, onde é decorativo.

---

Desenvolvido por **DevDreew**.

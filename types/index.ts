/* ============================================================
   TIPOS CENTRAIS
   Toda a tipagem do conteúdo do site vive aqui.
   ============================================================ */

/** Categorias usadas no filtro de projetos. */
export type ProjectCategory =
  | 'analise-de-dados'
  | 'business-intelligence'
  | 'desenvolvimento-web'
  | 'automacao';

export interface CategoryMeta {
  id: ProjectCategory;
  label: string;
  /** Token CSS de cor da categoria. */
  color: string;
}

export interface Project {
  /** Slug único — usado como key e no deep-link do modal. */
  slug: string;
  title: string;
  /** Descrição curta do card (1–2 linhas). */
  summary: string;
  category: ProjectCategory;
  /** Tecnologias exibidas como badges. */
  stack: string[];
  /** Caminho da imagem em /public/projects/. Opcional. */
  thumbnail?: string;
  /** Ano ou período do projeto. */
  year: string;
  repoUrl?: string;
  liveUrl?: string;
  /** Marca o projeto como destaque (aparece primeiro). */
  featured?: boolean;
  /** Conteúdo do modal de detalhe. */
  detail: {
    problem: string;
    solution: string;
    result: string;
    /** Métricas de impacto exibidas em destaque. */
    metrics?: { value: string; label: string }[];
  };
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** Data legível em PT-BR, ex.: "Março de 2025". */
  date: string;
  /** Caminho da imagem em /public/certificates/. */
  image: string;
  /** URL de verificação da credencial. */
  verifyUrl?: string;
  /** ID da credencial, se houver. */
  credentialId?: string;
}

export type SkillGroupId = 'dados' | 'bi' | 'web' | 'automacao';

export interface Skill {
  name: string;
  /** Caminho do ícone em /public/icons/. */
  icon: string;
  /** Nível de domínio — usado só como microdetalhe visual. */
  level: 'Avançado' | 'Intermediário' | 'Praticando';
}

export interface SkillGroup {
  id: SkillGroupId;
  label: string;
  description: string;
  color: string;
  skills: Skill[];
}

/* --- GitHub API --- */

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  languages: { name: string; count: number; percent: number }[];
}

import type { GitHubData, GitHubProfile, GitHubRepo } from '@/types';
import { site } from '@/data/site';

/* ============================================================
   GITHUB REST API — pública, sem token.

   Rate limit sem autenticação: 60 req/hora por IP.
   Por isso: revalidate de 1 hora + fetch no servidor (uma única
   chamada por hora serve TODOS os visitantes, não uma por pessoa).

   OPCIONAL: se quiser subir para 5.000 req/hora, crie um token
   read-only em github.com/settings/tokens e adicione a env var
   GITHUB_TOKEN na Vercel. O código já usa se existir.
   ============================================================ */

const API = 'https://api.github.com';
const REVALIDATE_SECONDS = 3600; // 1 hora

function headers(): HeadersInit {
  const h: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) {
    (h as Record<string, string>).Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

/** Cores oficiais das linguagens (subset). Fallback cinza. */
export const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  Shell: '#89e051',
  PowerShell: '#012456',
  SQL: '#e38c00',
  TSQL: '#e38c00',
  PLpgSQL: '#336790',
  Vue: '#41b883',
  Java: '#b07219',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Dockerfile: '#384d54',
};

export function languageColor(lang: string | null): string {
  if (!lang) return '#a8a29e';
  return languageColors[lang] ?? '#a8a29e';
}

/**
 * Busca perfil + repositórios do usuário e calcula distribuição de linguagens.
 * Lança em caso de falha — o componente chamador trata o estado de erro.
 */
export async function getGitHubData(): Promise<GitHubData> {
  const user = site.githubUser;

  const [profileRes, reposRes] = await Promise.all([
    fetch(`${API}/users/${user}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    }),
    fetch(`${API}/users/${user}/repos?per_page=100&sort=pushed`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    }),
  ]);

  if (!profileRes.ok) {
    throw new Error(`GitHub perfil: ${profileRes.status}`);
  }
  if (!reposRes.ok) {
    throw new Error(`GitHub repos: ${reposRes.status}`);
  }

  const profile: GitHubProfile = await profileRes.json();
  const allRepos: GitHubRepo[] = await reposRes.json();

  // Repositórios próprios, não arquivados, ordenados por relevância.
  const repos = allRepos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => {
      const starDiff = b.stargazers_count - a.stargazers_count;
      if (starDiff !== 0) return starDiff;
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });

  // Distribuição de linguagens principais.
  const counts = new Map<string, number>();
  for (const r of repos) {
    if (!r.language) continue;
    counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  const languages = [...counts.entries()]
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return { profile, repos: repos.slice(0, 6), languages };
}

/** Formata data ISO como "há X dias" em PT-BR. */
export function relativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  const days = Math.floor((Date.now() - then) / 86_400_000);

  if (days < 1) return 'hoje';
  if (days === 1) return 'ontem';
  if (days < 30) return `há ${days} dias`;
  const months = Math.floor(days / 30);
  if (months < 12) return `há ${months} ${months === 1 ? 'mês' : 'meses'}`;
  const years = Math.floor(months / 12);
  return `há ${years} ${years === 1 ? 'ano' : 'anos'}`;
}

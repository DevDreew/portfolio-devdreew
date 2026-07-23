import { Suspense } from 'react';
import { getGitHubData, languageColor, relativeDate } from '@/lib/github';
import { site } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GitHubReveal } from '@/components/ui/GitHubReveal';

/* ============================================================
   INTEGRAÇÃO GITHUB — AO VIVO

   Arquitetura: Server Component com fetch cacheado (revalidate 1h).
   Isso significa UMA chamada à API por hora para todos os visitantes
   juntos, em vez de uma por pessoa. O rate limit público (60/h)
   nunca é atingido.

   Suspense entrega o skeleton enquanto o servidor busca; o erro é
   tratado com fallback que não derruba a página.
   ============================================================ */

export function GitHub() {
  return (
    <section
      id="github"
      className="scroll-mt-20 border-y border-hairline bg-surface py-[var(--space-section)]"
    >
      <div className="shell">
        <SectionHeader
          index="04"
          eyebrow="GitHub · ao vivo"
          title="Código público, atualizado em tempo real."
          description={`Os dados abaixo vêm direto da API do GitHub para o perfil @${site.githubUser}. Nada aqui é digitado à mão.`}
        />

        <Suspense fallback={<GitHubSkeleton />}>
          <GitHubContent />
        </Suspense>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

async function GitHubContent() {
  try {
    const { profile, repos, languages } = await getGitHubData();

    return (
      <GitHubReveal>
        {/* Estatísticas do perfil */}
        <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-3">
          <Stat label="Repositórios públicos" value={profile.public_repos} />
          <Stat label="Seguidores" value={profile.followers} />
          <Stat label="Seguindo" value={profile.following} />
        </div>

        {/* Distribuição de linguagens */}
        {languages.length > 0 && (
          <div className="mt-8 rounded-md border border-hairline bg-base p-6 sm:p-7">
            <h3 className="eyebrow">Linguagens mais usadas</h3>

            {/* Barra proporcional */}
            <div
              className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-surface-2"
              role="img"
              aria-label={`Distribuição: ${languages
                .map((l) => `${l.name} ${l.percent}%`)
                .join(', ')}`}
            >
              {languages.map((l) => (
                <span
                  key={l.name}
                  style={{
                    width: `${l.percent}%`,
                    background: languageColor(l.name),
                  }}
                />
              ))}
            </div>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
              {languages.map((l) => (
                <li key={l.name} className="flex items-center gap-2 text-sm">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: languageColor(l.name) }}
                    aria-hidden="true"
                  />
                  <span className="text-ink-2">{l.name}</span>
                  <span className="font-mono text-xs tabular-nums text-ink-3">
                    {l.percent}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Repositórios em destaque */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <li key={repo.id}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-md border border-hairline bg-base p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ink/20 hover:shadow-raised"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="truncate font-mono text-sm font-medium transition-colors group-hover:text-accent">
                    {repo.name}
                  </h3>
                  <span
                    className="shrink-0 text-ink-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>

                <p className="mt-2.5 line-clamp-2 flex-1 text-pretty text-[13px] leading-relaxed text-ink-2">
                  {repo.description ?? 'Sem descrição.'}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-hairline pt-4 text-xs text-ink-3">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: languageColor(repo.language) }}
                        aria-hidden="true"
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 font-mono tabular-nums">
                    ★ {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 font-mono tabular-nums">
                    ⑂ {repo.forks_count}
                  </span>
                  <span className="ml-auto font-mono">{relativeDate(repo.pushed_at)}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Ver todos os repositórios
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </GitHubReveal>
    );
  } catch {
    /* Estado de erro — a página continua funcionando normalmente. */
    return (
      <div className="rounded-md border border-dashed border-hairline bg-base p-10 text-center">
        <p className="font-display text-lg font-semibold">
          Não foi possível carregar os dados do GitHub agora.
        </p>
        <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-ink-2">
          Isso costuma ser limite temporário de requisições da API pública. Os
          repositórios continuam acessíveis direto no perfil.
        </p>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mt-6"
        >
          Abrir perfil no GitHub
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    );
  }
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-base px-6 py-7">
      <p className="font-display text-3xl font-semibold tabular-nums">
        {value.toLocaleString('pt-BR')}
      </p>
      <p className="mt-2 font-mono text-label uppercase text-ink-3">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Skeleton de carregamento — mesma altura do conteúdo real, sem CLS. */
function GitHubSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando dados do GitHub…</span>

      <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-base px-6 py-7">
            <div className="h-9 w-20 animate-pulse rounded-sm bg-surface-2" />
            <div className="mt-3 h-3 w-28 animate-pulse rounded-sm bg-surface-2" />
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-md border border-hairline bg-base p-6 sm:p-7">
        <div className="h-3 w-40 animate-pulse rounded-sm bg-surface-2" />
        <div className="mt-4 h-2 w-full animate-pulse rounded-full bg-surface-2" />
        <div className="mt-5 flex gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-3 w-20 animate-pulse rounded-sm bg-surface-2" />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-md border border-hairline bg-base p-5">
            <div className="h-4 w-32 animate-pulse rounded-sm bg-surface-2" />
            <div className="mt-3 h-3 w-full animate-pulse rounded-sm bg-surface-2" />
            <div className="mt-2 h-3 w-4/5 animate-pulse rounded-sm bg-surface-2" />
            <div className="mt-5 border-t border-hairline pt-4">
              <div className="h-3 w-24 animate-pulse rounded-sm bg-surface-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

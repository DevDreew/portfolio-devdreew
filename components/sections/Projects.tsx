'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project, ProjectCategory } from '@/types';
import { sortedProjects } from '@/data/projects';
import { categories, categoryMap } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { cn } from '@/lib/utils';
import { viewportOnce } from '@/lib/motion';

type Filter = ProjectCategory | 'todos';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () =>
      filter === 'todos'
        ? sortedProjects
        : sortedProjects.filter((p) => p.category === filter),
    [filter],
  );

  // Contagem por categoria — mostra ao usuário o que existe antes de clicar.
  const counts = useMemo(() => {
    const map = new Map<Filter, number>([['todos', sortedProjects.length]]);
    for (const c of categories) {
      map.set(c.id, sortedProjects.filter((p) => p.category === c.id).length);
    }
    return map;
  }, []);

  const filters: { id: Filter; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.label })),
  ];

  return (
    <section id="projetos" className="scroll-mt-20 py-[var(--space-section)]">
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow="Projetos"
          title="O que eu construí, e o que mudou depois."
          description="Cada projeto abaixo abre o registro completo: qual era o problema, o que foi construído e qual foi o resultado medido."
        />

        {/* Barra de filtros */}
        <div
          role="tablist"
          aria-label="Filtrar projetos por categoria"
          className="mb-10 flex flex-wrap gap-2"
        >
          {filters.map((f) => {
            const isActive = filter === f.id;
            const count = counts.get(f.id) ?? 0;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(f.id)}
                disabled={count === 0}
                className={cn(
                  'relative rounded-sm px-4 py-2.5 text-sm transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-35',
                  isActive ? 'text-white' : 'text-ink-2 hover:text-ink',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-sm bg-ink"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {f.label}
                  <span
                    className={cn(
                      'font-mono text-[10px] tabular-nums',
                      isActive ? 'text-white/55' : 'text-ink-3',
                    )}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid de projetos */}
        <motion.ul
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <ProjectCard project={project} onOpen={() => setSelected(project)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* Estado vazio */}
        {visible.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-md border border-dashed border-hairline py-16 text-center text-sm text-ink-2"
          >
            Nenhum projeto nesta categoria ainda.
          </motion.p>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const cat = categoryMap[project.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease: EASE }}
      className="group relative flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-base transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-float"
    >
      {/* Preview */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline bg-surface">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={`Preview do projeto ${project.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          /* Fallback gerado — não quebra o layout sem imagem */
          <div
            className="grid-paper absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span
              className="font-display text-5xl font-bold opacity-15"
              style={{ color: cat.color }}
            >
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Faixa de cor da categoria */}
        <span
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
          style={{ background: cat.color }}
          aria-hidden="true"
        />

        <span className="absolute left-3 top-3 rounded-xs bg-base/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
          <span style={{ color: cat.color }}>{cat.label}</span>
        </span>

        {project.featured && (
          <span className="absolute right-3 top-3 rounded-xs bg-accent px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
            Destaque
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-label text-ink-3">{project.year}</p>

        <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
          {/* O botão cobre o card inteiro — clique em qualquer lugar abre */}
          <button
            type="button"
            onClick={onOpen}
            className="text-left after:absolute after:inset-0 after:content-[''] focus:outline-none"
            aria-label={`Ver detalhes do projeto ${project.title}`}
          >
            {project.title}
          </button>
        </h3>

        <p className="mt-2.5 flex-1 text-pretty text-sm leading-relaxed text-ink-2">
          {project.summary}
        </p>

        {/* Badges de stack */}
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((t) => (
            <li key={t} className="badge">
              {t}
            </li>
          ))}
          {project.stack.length > 3 && (
            <li className="badge border-transparent bg-transparent text-ink-3">
              +{project.stack.length - 3}
            </li>
          )}
        </ul>

        {/* Rodapé do card — links ficam acima do overlay do botão */}
        <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors group-hover:text-accent">
            Ver detalhes
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </span>

          <span className="relative z-10 flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Repositório de ${project.title} no GitHub`}
                className="text-ink-3 transition-colors hover:text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Ver ${project.title} ao vivo`}
                className="text-ink-3 transition-colors hover:text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V10M9.5 2.5H13.5V6.5M13 3l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

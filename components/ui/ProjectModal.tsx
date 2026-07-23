'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/types';
import { categoryMap } from '@/data/site';

interface Props {
  project: Project | null;
  onClose: () => void;
}

/**
 * Modal de detalhe do projeto.
 *
 * Comportamento de acessibilidade:
 * - role="dialog" + aria-modal, rotulado pelo título do projeto
 * - Esc fecha
 * - Foco move para o modal ao abrir e volta ao card ao fechar
 * - Foco fica preso dentro do modal (Tab cicla)
 * - Scroll do body travado enquanto aberto
 */
export function ProjectModal({ project, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbar}px`;

    // Move o foco para o painel assim que ele monta.
    const raf = requestAnimationFrame(() => panelRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      previouslyFocused.current?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Fechar detalhes do projeto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink/25 backdrop-blur-[2px]"
          />

          {/* Painel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-lg bg-base shadow-float outline-none sm:rounded-lg"
          >
            {/* Barra superior fixa */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-hairline bg-base/90 px-6 py-4 backdrop-blur-sm sm:px-8">
              <span
                className="font-mono text-label uppercase"
                style={{ color: categoryMap[project.category].color }}
              >
                {categoryMap[project.category].label}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-8 w-8 items-center justify-center rounded-sm text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M12 4 4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 pb-10 pt-7 sm:px-8">
              <p className="font-mono text-label text-ink-3">{project.year}</p>
              <h3
                id="modal-title"
                className="mt-2 text-balance font-display text-display-md font-semibold"
              >
                {project.title}
              </h3>
              <p className="mt-3 max-w-xl text-pretty leading-relaxed text-ink-2">
                {project.summary}
              </p>

              {/* Imagem, se houver */}
              {project.thumbnail && (
                <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-md border border-hairline bg-surface">
                  <Image
                    src={project.thumbnail}
                    alt={`Preview do projeto ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Métricas de impacto */}
              {project.detail.metrics && project.detail.metrics.length > 0 && (
                <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-3">
                  {project.detail.metrics.map((m) => (
                    <div key={m.label} className="bg-base p-5">
                      <dt className="font-mono text-label uppercase text-ink-3">{m.label}</dt>
                      <dd className="mt-2 font-display text-xl font-semibold tabular-nums">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* Narrativa */}
              <div className="mt-10 space-y-8">
                {(
                  [
                    ['Problema', project.detail.problem],
                    ['Solução', project.detail.solution],
                    ['Resultado', project.detail.result],
                  ] as const
                ).map(([label, text]) => (
                  <section key={label}>
                    <h4 className="eyebrow flex items-center gap-3">
                      <span className="h-px w-6 bg-accent" aria-hidden="true" />
                      {label}
                    </h4>
                    <p className="mt-3 text-pretty leading-relaxed text-ink-2">{text}</p>
                  </section>
                ))}
              </div>

              {/* Stack */}
              <div className="mt-10">
                <h4 className="eyebrow">Stack</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <li key={t} className="badge">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ações */}
              {(project.repoUrl || project.liveUrl) && (
                <div className="mt-10 flex flex-wrap gap-3 border-t border-hairline pt-8">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Ver ao vivo
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      Código no GitHub
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

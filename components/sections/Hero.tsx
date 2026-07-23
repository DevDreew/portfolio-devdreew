'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { heroStats, site } from '@/data/site';
import { Counter } from '@/components/ui/Counter';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero.
 *
 * O elemento visual de destaque é um "gráfico vivo": barras que
 * crescem na entrada e respiram levemente, aludindo a um painel de
 * dados sem recorrer a ilustração genérica de stock.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax discreto do grid de fundo.
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pb-20 pt-[68px] sm:pb-28"
    >
      {/* Grid milimetrado de fundo */}
      <motion.div
        aria-hidden="true"
        style={{ y: gridY }}
        className="grid-paper grid-paper-fade absolute inset-0 -z-10"
      />

      <motion.div style={{ opacity: contentOpacity }} className="shell">
        <div className="grid items-center gap-12 pt-16 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Coluna de texto */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="eyebrow">Disponível para novos projetos</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              className="mt-6 text-balance font-display text-display-xl font-semibold"
            >
              {site.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
              className="mt-5 max-w-xl text-balance font-display text-xl font-medium leading-snug sm:text-2xl"
            >
              {site.role} que{' '}
              <span className="relative whitespace-nowrap text-accent">
                também constrói
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M0 4 Q50 1 100 3.5 T200 2"
                    stroke="var(--c-accent)"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.9, ease: EASE }}
                  />
                </svg>
              </span>{' '}
              o produto.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
              className="mt-6 max-w-lg text-pretty leading-relaxed text-ink-2"
            >
              {site.tagline} Power BI, SQL, Python e automação — com a stack web
              para transformar o insight em interface que alguém usa de verdade.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#projetos" className="btn-primary">
                Ver projetos
                <span aria-hidden="true">↓</span>
              </a>
              <a href={site.resumeUrl} download className="btn-secondary">
                Baixar currículo
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex items-center gap-5 text-sm text-ink-2"
            >
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                GitHub
                <span
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
              <span className="h-3 w-px bg-hairline" aria-hidden="true" />
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                LinkedIn
                <span
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
              <span className="h-3 w-px bg-hairline" aria-hidden="true" />
              <span className="font-mono text-xs">{site.location}</span>
            </motion.div>
          </div>

          {/* Elemento visual: gráfico vivo */}
          <LiveChart />
        </div>

        {/* Faixa de KPIs */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:mt-28 lg:grid-cols-4"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="bg-base px-6 py-7">
              <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 font-mono text-label uppercase text-ink-3">
                {s.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}

/**
 * Gráfico decorativo animado. Puramente visual — marcado como
 * aria-hidden para não poluir a leitura por leitor de tela.
 */
function LiveChart() {
  const bars = [38, 62, 45, 88, 54, 100, 71, 82];

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
      className="relative hidden aspect-square w-full max-w-[440px] justify-self-end rounded-lg border border-hairline bg-base p-7 shadow-raised lg:block"
    >
      {/* Chrome da "janela" */}
      <div className="flex items-center justify-between border-b border-hairline pb-4">
        <span className="font-mono text-label uppercase text-ink-3">
          Ocupação · série mensal
        </span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-hairline" />
          <span className="h-2 w-2 rounded-full bg-hairline" />
          <span className="h-2 w-2 rounded-full bg-accent" />
        </span>
      </div>

      {/* Linhas de grade horizontais */}
      <div className="absolute inset-x-7 top-24 bottom-24 flex flex-col justify-between">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-px w-full bg-hairline/70" />
        ))}
      </div>

      {/* Barras */}
      <div className="relative mt-8 flex h-[52%] items-end gap-2.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{
              duration: 0.9,
              delay: 0.6 + i * 0.07,
              ease: EASE,
            }}
            className="flex-1 rounded-t-xs"
            style={{
              background:
                h === 100
                  ? 'var(--c-accent)'
                  : `color-mix(in srgb, var(--c-ink) ${18 + h * 0.28}%, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Legenda inferior com número que conta */}
      <div className="mt-7 flex items-end justify-between border-t border-hairline pt-5">
        <div>
          <p className="font-mono text-label uppercase text-ink-3">Números ativos</p>
          <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums">
            <Counter value={156790} duration={2200} />
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-xs bg-accent-soft px-2 py-1 font-mono text-[10px] font-medium text-accent-ink">
          ↑ 12,4%
        </span>
      </div>
    </motion.div>
  );
}

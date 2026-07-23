'use client';

import { motion } from 'framer-motion';
import { drawLine, revealUp, viewportOnce } from '@/lib/motion';

interface Props {
  /** Numeração da seção, ex.: "02". */
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * Cabeçalho padrão de seção: número monoespaçado + hairline que se
 * desenha no scroll + título display. É o elemento que dá ritmo
 * visual ao site inteiro.
 */
export function SectionHeader({ index, eyebrow, title, description }: Props) {
  return (
    <div className="mb-14 sm:mb-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealUp}
        className="flex items-center gap-4"
      >
        <span className="font-mono text-label text-accent">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
        <motion.div
          variants={drawLine}
          className="h-px flex-1 origin-left bg-hairline"
        />
      </motion.div>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealUp}
        className="mt-6 max-w-3xl text-balance font-display text-display-md font-semibold"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealUp}
          className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-2"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

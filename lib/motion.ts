import type { Variants } from 'framer-motion';

/* ============================================================
   VARIANTES DE ANIMAÇÃO COMPARTILHADAS
   Centralizadas para manter o ritmo do site consistente.
   ============================================================ */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Entrada por scroll: sobe e revela. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Container que escalona a entrada dos filhos. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

/** Item dentro de um container com stagger. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Linha hairline que se desenha da esquerda para a direita. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: EASE },
  },
};

/** Configuração padrão de viewport para whileInView. */
export const viewportOnce = { once: true, margin: '-80px' } as const;

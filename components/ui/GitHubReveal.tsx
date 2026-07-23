'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { revealUp, viewportOnce } from '@/lib/motion';

/**
 * Wrapper client mínimo que anima a entrada do bloco do GitHub.
 *
 * Existe separado porque a seção GitHub é um Server Component (para
 * poder fazer fetch cacheado no servidor) e Server Components não
 * podem usar framer-motion diretamente. Este arquivo é a fronteira.
 */
export function GitHubReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={revealUp}
    >
      {children}
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { site } from '@/data/site';
import { revealUp, stagger, staggerItem, viewportOnce } from '@/lib/motion';

/* SUBSTITUIR: ajuste as áreas de atuação conforme seu momento. */
const areas = [
  {
    title: 'Modelagem e qualidade de dados',
    text: 'Star schema, deduplicação, normalização de domínio e definição de glossário de negócio.',
  },
  {
    title: 'Business Intelligence executivo',
    text: 'Power BI do modelo semântico ao painel que a diretoria abre sozinha, com DAX otimizado.',
  },
  {
    title: 'Automação de processo',
    text: 'Python, Playwright e Selenium para eliminar trabalho repetitivo com rastro auditável.',
  },
  {
    title: 'Produto digital',
    text: 'Next.js, TypeScript e Supabase para transformar a análise em aplicação em produção.',
  },
];

export function Profile() {
  return (
    <section className="border-y border-hairline bg-ink py-[var(--space-section)] text-white">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Coluna esquerda */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={revealUp}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-label text-accent">06</span>
              <span className="font-mono text-label uppercase text-white/45">
                Perfil profissional
              </span>
            </div>

            <h2 className="mt-6 text-balance font-display text-display-md font-semibold">
              O perfil completo está no LinkedIn.
            </h2>

            <p className="mt-5 max-w-md text-pretty leading-relaxed text-white/65">
              Histórico, experiências detalhadas, recomendações e a rede
              profissional. Se você chegou aqui avaliando um trabalho ou uma
              vaga, é o próximo passo natural.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3.5 text-sm font-medium text-ink transition-all duration-300 ease-out hover:bg-accent hover:text-white active:scale-[0.98]"
              >
                Abrir LinkedIn
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={site.resumeUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 ease-out hover:border-white/50 active:scale-[0.98]"
              >
                Baixar currículo
              </a>
            </div>
          </motion.div>

          {/* Áreas de atuação */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            className="grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2"
          >
            {areas.map((a) => (
              <motion.li
                key={a.title}
                variants={staggerItem}
                className="bg-ink p-6 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <span className="block h-px w-8 bg-accent" aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-semibold">{a.title}</h3>
                <p className="mt-2.5 text-pretty text-sm leading-relaxed text-white/60">
                  {a.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

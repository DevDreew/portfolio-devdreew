'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { revealUp, stagger, staggerItem, viewportOnce } from '@/lib/motion';

/* SUBSTITUIR: ajuste os três princípios abaixo se quiser outro recorte. */
const principles = [
  {
    n: '01',
    title: 'A pergunta antes da query',
    text: 'Nenhuma consulta começa no SQL. Começa em entender qual decisão está travada e quem vai tomá-la. Dado sem destino é custo de armazenamento.',
  },
  {
    n: '02',
    title: 'Vocabulário fechado',
    text: 'Métrica sem definição escrita vira discussão de reunião. Eu fixo o glossário antes de fixar a medida — e defendo o termo depois.',
  },
  {
    n: '03',
    title: 'Entrego a interface, não o arquivo',
    text: 'O trabalho não termina no insight. Termina quando existe um painel, um app ou um robô que alguém abre de manhã sem precisar me chamar.',
  },
];

export function About() {
  return (
    <section id="sobre" className="scroll-mt-20 py-[var(--space-section)]">
      <div className="shell">
        <SectionHeader
          index="01"
          eyebrow="Sobre"
          title="Analista de dados com a mão no produto."
        />

        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Narrativa */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={revealUp}
            className="space-y-5 text-pretty leading-relaxed text-ink-2"
          >
            <p className="text-lg leading-relaxed text-ink">
              Trabalho com dados em telecom — portabilidade, ciclo de vida de
              numeração, comparação entre operadoras. É um domínio onde a base
              suja custa dinheiro e o termo errado numa reunião custa uma
              semana.
            </p>
            <p>
              Meu dia é modelar, limpar e interrogar base até ela responder a
              pergunta certa: star schema no Supabase, medida DAX no Power BI,
              script Python que substitui o processo manual que ninguém queria
              mais fazer.
            </p>
            <p>
              O que me separa da média é que eu não paro no dashboard. Construo
              a aplicação em Next.js e TypeScript que entrega aquele número para
              quem precisa dele — sem intermediário, sem exportar planilha, sem
              depender de mim para atualizar.
            </p>
            <p className="border-l-2 border-accent pl-5 font-display text-lg font-medium text-ink">
              Perfil híbrido: quem entende o dado e sabe construir a interface
              que o usa.
            </p>
          </motion.div>

          {/* Princípios */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            className="space-y-px overflow-hidden rounded-md border border-hairline bg-hairline"
          >
            {principles.map((p) => (
              <motion.li
                key={p.n}
                variants={staggerItem}
                className="group bg-base p-7 transition-colors duration-300 hover:bg-surface"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-label text-accent">{p.n}</span>
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                </div>
                <p className="mt-3 pl-9 text-pretty text-[15px] leading-relaxed text-ink-2">
                  {p.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

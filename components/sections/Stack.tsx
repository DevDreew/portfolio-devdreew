'use client';

import { motion } from 'framer-motion';
import { skillGroups } from '@/data/skills';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SkillIcon } from '@/components/ui/SkillIcon';
import { stagger, staggerItem, viewportOnce } from '@/lib/motion';

export function Stack() {
  return (
    <section
      id="stack"
      className="scroll-mt-20 border-y border-hairline bg-surface py-[var(--space-section)]"
    >
      <div className="shell">
        <SectionHeader
          index="02"
          eyebrow="Stack"
          title="As ferramentas, agrupadas pelo problema que resolvem."
          description="Não é uma lista de logos. Cada grupo abaixo corresponde a uma etapa real do caminho entre a base bruta e a decisão tomada."
        />

        <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline lg:grid-cols-2">
          {skillGroups.map((group) => (
            <motion.div
              key={group.id}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={stagger}
              className="bg-base p-7 sm:p-9"
            >
              {/* Cabeçalho do grupo */}
              <motion.div variants={staggerItem}>
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-xs"
                    style={{ background: group.color }}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg font-semibold">{group.label}</h3>
                </div>
                <p className="mt-2.5 max-w-md text-pretty text-sm leading-relaxed text-ink-2">
                  {group.description}
                </p>
              </motion.div>

              {/* Grid de tecnologias */}
              <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {group.skills.map((skill) => (
                  <motion.li key={skill.name} variants={staggerItem}>
                    <div
                      className="group flex h-full items-center gap-3 rounded-sm border border-hairline bg-base px-3.5 py-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-subtle"
                      title={`${skill.name} — ${skill.level}`}
                    >
                      <SkillIcon src={skill.icon} name={skill.name} color={group.color} />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium leading-tight">
                          {skill.name}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-3">
                          {skill.level}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

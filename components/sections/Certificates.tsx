'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { Certificate } from '@/types';
import { certificates } from '@/data/certificates';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { stagger, staggerItem, viewportOnce } from '@/lib/motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Certificates() {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <section id="certificados" className="scroll-mt-20 py-[var(--space-section)]">
      <div className="shell">
        <SectionHeader
          index="05"
          eyebrow="Certificados"
          title="Formação e credenciais verificáveis."
          description="Clique em qualquer certificado para ampliar. Onde existe link de verificação, ele leva direto à credencial na instituição emissora."
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certificates.map((cert) => (
            <motion.li key={cert.id} variants={staggerItem}>
              <CertificateCard cert={cert} onOpen={() => setActive(cert)} />
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <Lightbox cert={active} onClose={() => setActive(null)} />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function CertificateCard({
  cert,
  onOpen,
}: {
  cert: Certificate;
  onOpen: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-base transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-float">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-hairline bg-surface">
        {failed ? (
          /* Fallback quando a imagem ainda não foi adicionada */
          <div className="grid-paper absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M9 14.5 8 22l4-2 4 2-1-7.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Imagem pendente
            </span>
          </div>
        ) : (
          <Image
            src={cert.image}
            alt={`Certificado: ${cert.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            onError={() => setFailed(true)}
          />
        )}

        {/* Overlay de ampliar */}
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
          <span className="rounded-sm bg-base px-3.5 py-2 text-xs font-medium shadow-raised">
            Ampliar
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-label uppercase text-ink-3">{cert.date}</p>

        <h3 className="mt-2 font-display text-base font-semibold leading-snug">
          <button
            type="button"
            onClick={onOpen}
            className="text-left after:absolute after:inset-0 after:content-[''] focus:outline-none"
            aria-label={`Ampliar certificado ${cert.title}`}
          >
            {cert.title}
          </button>
        </h3>

        <p className="mt-1.5 flex-1 text-sm text-ink-2">{cert.issuer}</p>

        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 mt-4 inline-flex items-center gap-1.5 border-t border-hairline pt-4 text-xs font-medium text-ink-2 transition-colors hover:text-accent"
          >
            Verificar credencial
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function Lightbox({
  cert,
  onClose,
}: {
  cert: Certificate | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!cert) return;

    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Certificado ampliado: ${cert.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            aria-label="Fechar visualização"
            onClick={onClose}
            className="absolute inset-0 cursor-zoom-out bg-ink/70 backdrop-blur-sm"
          />

          <motion.figure
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative max-h-full w-full max-w-4xl overflow-hidden rounded-lg bg-base shadow-float"
          >
            <div className="relative aspect-[4/3] w-full bg-surface">
              <Image
                src={cert.image}
                alt={`Certificado: ${cert.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>

            <figcaption className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline px-6 py-5">
              <div>
                <p className="font-display font-semibold">{cert.title}</p>
                <p className="mt-1 text-sm text-ink-2">
                  {cert.issuer} · {cert.date}
                  {cert.credentialId && (
                    <span className="ml-2 font-mono text-xs text-ink-3">
                      ID {cert.credentialId}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary !px-4 !py-2.5 !text-xs"
                  >
                    Verificar ↗
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-primary !px-4 !py-2.5 !text-xs"
                >
                  Fechar
                </button>
              </div>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, site } from '@/data/site';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  // Sombra + fundo sólido depois de sair do topo.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Marca no menu a seção visível — orientação de leitura.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Trava o scroll com o menu mobile aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Atalho para leitores de tela e teclado */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out',
          scrolled
            ? 'border-b border-hairline bg-base/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="shell flex h-[68px] items-center justify-between">
          {/* Marca */}
          <a
            href="#top"
            className="group flex items-baseline gap-2"
            aria-label="Voltar ao topo"
          >
            <span className="font-display text-[17px] font-semibold tracking-tight">
              {site.handle}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
              aria-hidden="true"
            />
          </a>

          {/* Navegação desktop */}
          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        'relative rounded-sm px-3 py-2 text-sm transition-colors duration-200',
                        isActive ? 'text-ink' : 'text-ink-2 hover:text-ink',
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-3 -bottom-px h-px bg-accent"
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm text-ink-2 transition-colors hover:text-ink sm:block"
            >
              GitHub
            </a>
            <a href="#contato" className="hidden text-sm md:block">
              <span className="btn-primary !px-5 !py-2.5">Falar comigo</span>
            </a>

            {/* Toggle mobile */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-hairline md:hidden"
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span
                  className={cn(
                    'absolute left-0 block h-px w-full bg-ink transition-all duration-300',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-0 block h-px w-full bg-ink transition-all duration-300',
                    open ? 'bottom-1.5 -rotate-45' : '',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-base pt-[68px] md:hidden"
          >
            <nav aria-label="Navegação mobile" className="shell py-8">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                    className="border-b border-hairline"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-4 font-display text-2xl font-medium"
                    >
                      <span className="font-mono text-label text-ink-3">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex gap-3">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1"
                >
                  GitHub
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1"
                >
                  LinkedIn
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

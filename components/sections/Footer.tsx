import { navLinks, site } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-semibold tracking-tight">
                {site.handle}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            </div>
            <p className="mt-3 max-w-xs text-pretty text-sm leading-relaxed text-ink-2">
              {site.name} · {site.role}. {site.tagline}
            </p>
            <p className="mt-4 font-mono text-xs text-ink-3">{site.location}</p>
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé">
            <h2 className="eyebrow">Navegação</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-2 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Redes */}
          <div>
            <h2 className="eyebrow">Redes</h2>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'GitHub', href: site.github },
                { label: 'LinkedIn', href: site.linkedin },
                { label: 'E-mail', href: `mailto:${site.email}` },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-accent"
                  >
                    {l.label}
                    <span
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-7 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-ink-3">
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <p className="font-mono text-xs text-ink-3">
            Desenvolvido por{' '}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-2 transition-colors hover:text-accent"
            >
              {site.handle}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import { site } from '@/data/site';
import { Cursor } from '@/components/ui/Cursor';
import './globals.css';

/* ============================================================
   FONTES
   Carregadas via next/font — self-hosted automaticamente,
   sem requisição externa e sem layout shift (display: swap
   com fallback métrico ajustado).
   ============================================================ */

const display = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

/* ============================================================
   METADATA / SEO
   ============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role} | ${site.handle}`,
    template: `%s | ${site.handle}`,
  },
  description: site.description,
  keywords: [
    'analista de dados',
    'Power BI',
    'DAX',
    'SQL',
    'Python',
    'Supabase',
    'Next.js',
    'portfólio',
    'Barueri',
    'São Paulo',
    'DevDreew',
    'Drew Marques',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: `${site.name} — ${site.role}`,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [
      {
        // SUBSTITUIR: gere uma imagem 1200x630 e salve em /public/og.png
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

/* ============================================================
   JSON-LD — dados estruturados para o Google entender o perfil
   ============================================================ */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.handle,
  jobTitle: site.role,
  url: site.url,
  description: site.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barueri',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    'Power BI',
    'DAX',
    'SQL',
    'Python',
    'Análise de Dados',
    'Business Intelligence',
    'Next.js',
    'TypeScript',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Cursor />
        {children}
      </body>
    </html>
  );
}

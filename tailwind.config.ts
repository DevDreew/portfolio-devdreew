import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--c-base)',
        surface: 'var(--c-surface)',
        'surface-2': 'var(--c-surface-2)',
        hairline: 'var(--c-hairline)',
        ink: 'var(--c-ink)',
        'ink-2': 'var(--c-ink-2)',
        'ink-3': 'var(--c-ink-3)',
        accent: 'var(--c-accent)',
        'accent-ink': 'var(--c-accent-ink)',
        'accent-soft': 'var(--c-accent-soft)',
        cat: {
          data: 'var(--c-cat-data)',
          bi: 'var(--c-cat-bi)',
          web: 'var(--c-cat-web)',
          auto: 'var(--c-cat-auto)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 9vw, 6.5rem)', { lineHeight: '0.94', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.25rem, 5.5vw, 4rem)', { lineHeight: '1.0', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.035em' }],
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      borderRadius: {
        xs: 'var(--r-xs)',
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
      },
      boxShadow: {
        subtle: 'var(--sh-subtle)',
        raised: 'var(--sh-raised)',
        float: 'var(--sh-float)',
      },
      maxWidth: {
        shell: '1240px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
export default config;

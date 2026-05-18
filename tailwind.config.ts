import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        soot:        '#0a0a0a',
        ink:         '#121212',
        steel:       '#1a1a1a',
        'chrome-dark': '#262626',
        chalk:       '#f5f5f5',
        chrome:      '#d8d8d8',
        'chrome-mid':  '#8a8a8a',
        signal:      '#E61919',
        muted:       'rgba(245,245,245,0.42)',
        wire:        'rgba(245,245,245,0.08)',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Bebas Neue', 'sans-serif'],
        mono:    ['var(--font-space-mono)', 'Space Mono', 'monospace'],
      },
      borderRadius: {
        none:    '0',
        DEFAULT: '0',
        sm:      '0',
        md:      '0',
        lg:      '0',
        xl:      '0',
        '2xl':   '0',
        '3xl':   '0',
        full:    '9999px',
      },
      letterSpacing: {
        tac:   '0.15em',
        ultra: '0.30em',
        grid:  '0.08em',
      },
      transitionTimingFunction: {
        tac: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      animation: {
        'pulse-signal': 'pulse-signal 2s cubic-bezier(0.32, 0.72, 0, 1) infinite',
        scan:   'scan 9s linear infinite',
        blink:  'blink 1.2s step-end infinite',
      },
      keyframes: {
        'pulse-signal': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.25' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

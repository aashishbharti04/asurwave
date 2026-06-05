/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,js,html}'],
  theme: {
    extend: {
      colors: {
        /**
         * Semantic, theme-aware tokens.
         * The underlying CSS custom properties are swapped by the `.light`
         * class on <html> (see src/styles/main.css), giving full dark/light
         * support without duplicating every utility.
         */
        canvas: 'rgb(var(--c-canvas) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        elevated: 'rgb(var(--c-elevated) / <alpha-value>)',
        content: 'rgb(var(--c-content) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        subtle: 'rgb(var(--c-subtle) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',

        /* Fixed brand accent palette (identical across themes). */
        asur: {
          black: '#050505',
          dark: '#0a0a0a',
          red: '#ff0033',
          crimson: '#cc0029',
          gray: '#1f1f1f',
          cyan: '#00f3ff',
          purple: '#a855f7',
        },
        brand: {
          DEFAULT: '#ff0033',
          dark: '#cc0029',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Rajdhani', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        scan: 'scan 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },
    },
  },
  plugins: [],
};

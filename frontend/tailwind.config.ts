import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        lavender: {
          100: '#f1f5fe',
          200: '#c2c0f9',
          '200-opacity': '#c2c0fa7f',
          300: '#8582dd',
        },
        midnight: {
          100: '#f5f6f4',
          200: '#c6c5c5',
          300: '#6c757d',
          400: '#2e2f39',
        },
      },
    },
  },
  plugins: []
} satisfies Config
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        large: '32px',
        big: '2.5rem'
      },
      colors: {
        white: '#ffffff',
        lavender: {
          100: '#f1f5fe',
          200: '#c2c0f9',
          '200-opacity': '#c2c0fa7f',
          300: '#8582dd'
        },
        midnight: {
          100: '#f5f6f4',
          200: '#c6c5c5',
          300: '#6c757d',
          400: '#2e2f39'
        }
      },
      fontSize: {
        '1.5xl': '1.375rem'
      },
      spacing: {
        '90': '90vw',
        '300px': '300px',
        '10vh': '10vh',
        '100vh': '100vh'
      },
      transitionDuration: {
        '2000': '2000ms'
      }
    }
  },
  plugins: []
} satisfies Config

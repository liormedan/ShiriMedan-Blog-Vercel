import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Derived from provided logo
        'brand-bg': '#F4EFE7', // off-white warm background
        'brand-text': '#1F5663', // deep teal for text
        'brand-primary': '#0F6977', // signature teal
        'brand-sky': '#8ED1DC', // light blue dot
        'brand-lime': '#B8CF3A', // lime dot
        'brand-orange': '#F39C34', // orange dot
        'brand-magenta': '#E22C7D' // magenta dot
      },
      container: {
        center: true,
        padding: '1rem'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
} satisfies Config

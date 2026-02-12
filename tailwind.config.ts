import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f8f5ef',
        nude: '#e8ddd2',
        blush: '#d8b7aa',
        rosegold: '#b88a79',
        espresso: '#3d302a'
      },
      boxShadow: {
        soft: '0 12px 30px -15px rgba(88, 57, 45, 0.25)'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui']
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at 20% 15%, rgba(216,183,170,.35), transparent 42%), radial-gradient(circle at 80% 40%, rgba(184,138,121,.30), transparent 45%), linear-gradient(135deg, #f8f5ef, #fff)'
      }
    }
  },
  plugins: []
};

export default config;

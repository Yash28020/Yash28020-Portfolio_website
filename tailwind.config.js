/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#030308',
        space: {
          950: '#020108',
          900: '#070512',
          800: '#0f0a24',
          700: '#1b123d',
        },
        cosmic: {
          cyan: '#00f0ff',
          turquoise: '#05d9e8',
          purple: '#9d4edd',
          violet: '#7209b7',
          magenta: '#f72585',
          gold: '#ffd166',
          orange: '#ff9e00',
          blue: '#4cc9f0',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
        cinematic: ['Cinzel', 'Trajan Pro', 'serif']
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'reverse-spin': 'reverse-spin 35s linear infinite',
        'warp': 'warp 1.5s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 35px rgba(0,240,255,0.8))' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'reverse-spin': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' }
        }
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08080c',
          900: '#0c0c14',
          850: '#11111c',
          800: '#161624',
          700: '#1f1f33',
        },
        neon: {
          cyan: '#22d3ee',
          magenta: '#ff2bd6',
          lime: '#a3e635',
          amber: '#fbbf24',
          violet: '#7c3aed',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Rajdhani"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(34,211,238,0.35), 0 0 40px rgba(255,43,214,0.15)',
        neonMag: '0 0 20px rgba(255,43,214,0.35), 0 0 40px rgba(34,211,238,0.15)',
        glass: '0 8px 32px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)',
        radialGlow: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.18), transparent 60%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '1' },
          '47%': { opacity: '0.4' },
          '49%': { opacity: '1' },
          '52%': { opacity: '0.7' },
          '54%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        flicker: 'flicker 4s linear infinite',
        scan: 'scan 6s linear infinite',
        floaty: 'floaty 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

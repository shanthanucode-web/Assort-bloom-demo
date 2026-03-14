/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:       '#FAF7F2',
        'cream-mid': '#F0EAE0',
        'cream-dark':'#E8DDD5',
        terra:       '#C4785A',
        'terra-dark':'#A05E44',
        'terra-mute':'#DBA88F',
        'warm-brown':'#2C2420',
        'mid-brown': '#5C4A3E',
        'warm-gray': '#8B7E76',
        'warm-white':'#FDF9F4',
        sage:        '#5A8B64',
        'sage-light':'#D4E8D8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Lato', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        ripple: {
          '0%':   { transform: 'scale(1)',    opacity: '0.6' },
          '100%': { transform: 'scale(1.75)', opacity: '0' },
        },
        'wave-bar': {
          '0%, 100%': { transform: 'scaleY(0.2)' },
          '50%':      { transform: 'scaleY(1)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        'slide-out': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(100%)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.03)' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
      },
      animation: {
        ripple:     'ripple 2.2s ease-out infinite',
        'wave-bar': 'wave-bar 0.9s ease-in-out infinite',
        'fade-up':  'fade-up 0.45s ease-out forwards',
        'slide-in': 'slide-in 0.32s cubic-bezier(0.4,0,0.2,1) forwards',
        breathe:    'breathe 3.5s ease-in-out infinite',
        'dot-pulse':'dot-pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

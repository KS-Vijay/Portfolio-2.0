import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',           // class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body:    ['Satoshi', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent:  '#c8ff00',
        accent2: '#ff6b35',
        ink:     '#0a0a0a',
        cream:   '#f5f2ec',
      },
      animation: {
        marquee:  'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
        blink:    'blink 1.2s step-end infinite',
        float:    'float 6s ease-in-out infinite',
        grain:    'grain 8s steps(10) infinite',
      },
      keyframes: {
        marquee:  { '0%': { transform: 'translateX(0%)' },   '100%': { transform: 'translateX(-100%)' } },
        marquee2: { '0%': { transform: 'translateX(100%)' },  '100%': { transform: 'translateX(0%)' } },
        blink:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        float:    { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-16px)' } },
        grain:    { '0%,100%': { transform: 'translate(0,0)' }, '10%': { transform: 'translate(-2%,-3%)' },
                    '30%': { transform: 'translate(3%,-1%)' }, '50%': { transform: 'translate(-1%,2%)' },
                    '70%': { transform: 'translate(2%,1%)' }, '90%': { transform: 'translate(-3%,3%)' } },
      },
    },
  },
  plugins: [],
} satisfies Config

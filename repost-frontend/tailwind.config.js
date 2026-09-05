/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Hedvig Letters Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        repost: {
          green: '#005139',
          'green-light': '#89f87f',
          blue: '#5aa9e6',
          'blue-light': '#7fc8f8',
          red: '#ba1a1a',
          yellow: '#ffe45e',
          bg: '#f7faf5',
          sidebar: '#ebefea',
          card: '#ffffff',
          'button-inactive': '#f5f5f5',
          text: '#393030',
        },
      },
      borderRadius: {
        'card': '24px',
        'input': '8px',
        'button': '12px',
        'pill': '9999px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

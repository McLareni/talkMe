import hideScrollBar from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBlue: '#6DA0F9',
        fiolet: '#934BFF',
        customWhite: '#FBFBFB',
        ligthBlue: '#BCD5FF',
      },
      backgroundImage: {
        loginGradient:
          'radial-gradient(circle, rgba(147,75,255,1) 10%, rgba(109,160,249,1) 40%)',
      },
    },
  },
  safelist: [
    'fill-mainBlue',
    'fill-fiolet',
    'bg-mainBlue',
    'bg-fiolet',
    'border-fiolet',
    'border-mainBlue',
  ],
  plugins: [hideScrollBar],
};

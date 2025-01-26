import hideScrollBar from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBlue: '#5C6BC0',
        fiolet: '#9557B1',
        customWhite: '#FBFBFB',
        ligthBlue: '#BCD5FF',
        gray: '#BCC3D1',
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

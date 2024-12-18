import hideScrollBar from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBlue: '#6DA0F9',
        fiolet: '#934BFF',
      },
    },
  },
  plugins: [hideScrollBar],
};

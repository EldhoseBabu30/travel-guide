/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media' for OS-level preference
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'color-change': 'color-change 3s infinite',
      },
      keyframes: {
        'color-change': {
          '0%, 100%': { color: 'white' },
          '50%': { color: '#fb923c' }, // Tailwind's orange-400 color
        },
      },
    },
  },
  plugins: [],
}

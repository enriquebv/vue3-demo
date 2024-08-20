/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/ui/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        accent: '#1F2D52'
      },
      spacing: {
        sidebar: '256px'
      }
    }
  },
  plugins: []
}

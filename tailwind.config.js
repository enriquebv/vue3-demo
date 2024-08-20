/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/ui/**/*.{vue,js,ts,jsx,tsx}'],
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

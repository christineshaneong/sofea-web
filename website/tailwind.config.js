/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This scans all files in your src folder
  ],
  theme: {
    extend: {
      // Note: In v4, most things go in index.css, 
      // but keeping these here ensures compatibility with older components
      colors: {
        'sofea-maroon': '#800000',
        'sofea-gold': '#bc9c22',
      }
    },
  },
  plugins: [],
}
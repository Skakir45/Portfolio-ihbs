/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0D1B3E',
        blue: '#3B82F6',
        'ihbs-text': '#1E293B',
        'ihbs-muted': '#64748B',
        'ihbs-border': '#E2E8F0',
        'ihbs-bg': '#F8FAFC',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        nav: '0 2px 8px rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0D1B3E 0%, #3B82F6 100%)',
      },
    },
  },
  plugins: [],
}


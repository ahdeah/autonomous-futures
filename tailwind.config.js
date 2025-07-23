// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Autonomous Futures Color System
        af: {
          primary: '#6B7280',
          sage: '#9CAF88',
          golden: '#F59E0B',
          background: '#FEFBF8',
          charcoal: '#374151',
          'light-sage': '#E8F5E8',
          'warm-white': '#FFFFFF',
          'placeholder-bg': '#F3F4F6',
          'placeholder-text': '#9CA3AF',
          disabled: '#D1D5DB',
        },
      },
      fontFamily: {
        // --- Start of Correction ---
        // Use the CSS variable for the 'sans' font family.
        // Note: The 'Satoshi' font is not imported and will only work if installed locally on a user's system.
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        // --- End of Correction ---
      },
      borderRadius: {
        'af-sm': '6px',
        'af-md': '8px',
        'af-lg': '12px',
        'af-xl': '16px',
      },
      boxShadow: {
        'af-sm': '0 1px 3px rgba(107, 114, 128, 0.1)',
        'af-md': '0 4px 12px rgba(107, 114, 128, 0.15)',
        'af-lg': '0 8px 24px rgba(107, 114, 128, 0.2)',
      },
      transitionDuration: {
        'af-fast': '150ms',
        'af-normal': '300ms',
        'af-slow': '500ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
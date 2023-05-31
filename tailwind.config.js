/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'max-height': 'max-height'
      },
      keyframes: {
        sweetAppear: {
          '0%': { opacity: '0', transform: 'translateY(50%)' },
          '100%': { opacity: '1', transform: 'translateY(0%)' },
        },
        sweetDisappear: {
          '0%': { opacity: '1', transform: 'translateY(0%)' },
          '100%': { opacity: '0', transform: 'translateY(0%)' },
        }
      },
      animation: {
        sweetAppear: 'sweetAppear 0.25s ease-out 0s 1 both',
        sweetDisappear: 'sweetAppear 0.5s ease-out 0s 1 both',
      }
    }
  },
  plugins: [],
}


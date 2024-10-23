/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gray': 'radial-gradient(circle, #2e2e2e, #000000)',
        'custom-radial': 'radial-gradient(circle, #d1d5db, #374151, #000000)'
      },
      colors: {
        gold: {
          DEFAULT: '#ffd700'
        },
        blackone: {
          DEFAULT: '#1b1919'
        },
        blacktwo: {
          DEFAULT: '#0e0d0d79'
        }
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}


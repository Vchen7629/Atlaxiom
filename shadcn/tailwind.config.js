/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
      "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
      backgroundImage: {
        'radial-gray': 'radial-gradient(circle, #2e2e2e, #000000)',
        'custom-radial': 'radial-gradient(circle, #d1d5db, #374151, #000000)',
        'metal': `linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black),
                  linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black),
                  linear-gradient(to bottom, rgb(8, 8, 8), rgb(32, 32, 32))`,
      },
      backgroundSize: {
        'metal-size': '10px 10px, 10px 10px, 10px 5px',
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        gold: {
          DEFAULT: '#ffd700'
        },
        goldenrod: {
          DEFAULT: '#daa520'
        },
        blackone: {
          DEFAULT: '#1b1919'
        },
        blacktwo: {
          DEFAULT: '#0e0d0d79'
        },
        blackthrees: {
          DEFAULT: '#1a1919be'
        },
        footer: {
          DEFAULT: '#333333'
        },
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'mycards': '0px 0px 15px rgb(19, 18, 18)'
      },
      
  	}
  },
  plugins: [require("tailwindcss-animate")],
}


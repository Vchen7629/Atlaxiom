/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
      "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			roboto: ['Roboto', 'sans-serif'],
		},
  		backgroundImage: {
  			'radial-gray': 'radial-gradient(circle, #2e2e2e, #000000)',
  			'radial-gold': 'radial-gradient(ellipse, #3C3105 20%, #000000 80%)',
  			'custom-radial': 'radial-gradient(circle, #d1d5db, #374151, #000000)',
  			'linear-radient': 'linear-gradient(to left, #0e0d0d79, #333333)',
  			deckpage: 'linear-gradient(45deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
  			signpage: 'linear-gradient(45deg, #ffd700 0%, #87ceeb 33%, #1e90ff 66%, #ffa500 100%)',
  			'signuppageimage': 'url("./styling/background.png")',
  			'gradient-to-sides': 'linear-gradient(to right, rgba(14, 13, 13, 0.4), #0e0d0d79, rgba(14, 13, 13, 0.4))'
  		},
  		backgroundSize: {
  			'homepage-radial-gold': '100px 150px'
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
  			test: {
  				DEFAULT: '#222222'
  			},
			'google-gray': '#F2F2F2',
  		},
  		boxShadow: {
  			custom: '0 4px 30px rgba(0, 0, 0, 0.5)',
  			mycards: '0px 0px 15px rgb(19, 18, 18)',
  			dropdow: '0 0px 4px 0px hsl(var(--shadow-color))',
  			'inner-border': 'inset 0 0 0 4px rgba(55, 65, 81, 1)'
  		},
  		keyframes: {
  			skFoldCube: {
  				'0%, 10%': {
  					transform: 'perspective(140px) rotateX(-180deg)',
  					opacity: '0'
  				},
  				'25%, 75%': {
  					transform: 'perspective(140px) rotateX(0deg)',
  					opacity: '1'
  				},
  				'90%, 100%': {
  					transform: 'perspective(140px) rotateY(180deg)',
  					opacity: '0'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			skFoldCube: 'skFoldCube 2.4s infinite linear both',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
}


import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			// primary: '#ff5200',
  			primary: '#4f46e5',
  			indigo: '#9333ea',
  			// secondary: '#1A373A',
			secondary:"#1F2A37",
  			accent: '#555A57',
  			textCol: '#F5F5F5',
			light:"#FFFFFF"
  		},
  		keyframes: {
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
  			},
				//Add new keyframes for sliding animation
                slide: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(20px)' },
                },
			
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
			 slide: 'slide 4s ease-in-out infinite',
  		}
  	},
  	screens: {
  		sm: '450px',
  		md: '768px',
  		lg: '1280px',
  		xl: '1440px'
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

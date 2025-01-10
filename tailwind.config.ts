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
				primary: '#1A373A',
				secondary: "#04BF61",
				"light-green": "#F0F7F3",
				accent: '#555A57',
				light: "#FFFFFF",
				indigo: '#0665DB',
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
				carSlide: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(13px)' },
				},

				rotateSwing: {
					// '0%': { transform: 'rotate(0deg)' },
					'0%': { transform: 'translateY(0)' },
					'25%': { transform: 'translateY(5px) rotate(15deg)' },
					'50%': { transform: 'translateY(20px)' },
					'75%': { transform: 'rotate(-15deg)' },
					'100%': { transform: 'translateY(0) rotate(0deg)' },
				},

				gradient: {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '100% 100%' },
				},

			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				slide: 'slide 4s ease-in-out infinite',
				gradient: 'gradient 10s linear infinite',
				carSlide: 'carSlide 2.5s ease-in-out infinite',
				rotateSwing: 'rotateSwing  9.5s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-animation': 'linear-gradient(45deg, transparent 25%, rgba(68, 107, 158, 0.4) 50%, transparent 75%)',
			},
			backgroundSize: {
				'size-500': '500px 500px',
			},
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

import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	extend: {
		colors: {
			primary: '#dc5619',
			secondary: '#1A373A',
			accent:'#24303f',
			textCol: '#F5F5F5',
		}
	},
	screens: {
		sm: '450px',
		md: '768px',
		lg: '1280px',
		xl: '1440px'
	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

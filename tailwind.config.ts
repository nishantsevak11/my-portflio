
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Titan Pulse custom colors
				titan: {
					'ash': '#121212',
					'ember': '#FF4500',
					'electric': '#007FFF',
					'molten': '#FFD700',
					'dark': '#0A0A0A',
					'metal': '#36454F',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'pulse-ember': {
					'0%, 100%': {
						opacity: '1',
						filter: 'brightness(1)'
					},
					'50%': {
						opacity: '0.8',
						filter: 'brightness(1.3)'
					}
				},
				'flicker': {
					'0%, 100%': {
						opacity: '1'
					},
					'25%': {
						opacity: '0.9'
					},
					'50%': {
						opacity: '1'
					},
					'75%': {
						opacity: '0.8'
					}
				},
				'rumble': {
					'0%, 100%': {
						transform: 'translate(0, 0)'
					},
					'10%': {
						transform: 'translate(-1px, 1px)'
					},
					'20%': {
						transform: 'translate(1px, -1px)'
					},
					'30%': {
						transform: 'translate(-2px, 2px)'
					},
					'40%': {
						transform: 'translate(2px, -2px)'
					},
					'50%': {
						transform: 'translate(-1px, 1px)'
					},
					'60%': {
						transform: 'translate(1px, -1px)'
					},
					'70%': {
						transform: 'translate(-2px, 2px)'
					},
					'80%': {
						transform: 'translate(2px, -2px)'
					},
					'90%': {
						transform: 'translate(-1px, 1px)'
					}
				},
				'eye-open': {
					'0%': {
						height: '0px'
					},
					'100%': {
						height: '100px'
					}
				},
				'forge-in': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.05)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'forge-out': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(1.1)',
						opacity: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'scan-line': {
					'0%': {
						transform: 'translateY(0%)'
					},
					'100%': {
						transform: 'translateY(100%)'
					}
				},
				'reveal-text': {
					'0%': {
						width: '0%'
					},
					'100%': {
						width: '100%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-ember': 'pulse-ember 3s infinite ease-in-out',
				'flicker': 'flicker 4s infinite ease-in-out',
				'rumble': 'rumble 0.5s ease-in-out',
				'eye-open': 'eye-open 2s ease-out forwards',
				'forge-in': 'forge-in 0.5s ease-out forwards',
				'forge-out': 'forge-out 0.5s ease-in forwards',
				'float': 'float 6s infinite ease-in-out',
				'scan-line': 'scan-line 3s linear infinite',
				'reveal-text': 'reveal-text 1s ease-out forwards'
			},
			fontFamily: {
				'rajdhani': ['Rajdhani', 'sans-serif'],
				'orbitron': ['Orbitron', 'sans-serif'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

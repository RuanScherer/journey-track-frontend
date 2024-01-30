import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': {
          '50': '#fdf2f7',
          '100': '#fce7f1',
          '200': '#fbcfe4',
          '300': '#f9a8cc',
          '400': '#f25d9c',
          '500': '#ec4889',
          '600': '#db2765',
          '700': '#be184c',
          '800': '#9d1740',
          '900': '#831838',
          '950': '#50071d',
        },
        'secondary': {
          '50': '#f1f2ff',
          '100': '#e6e8ff',
          '200': '#d1d5ff',
          '300': '#acb1ff',
          '400': '#7d7fff',
          '500': '#4f48ff',
          '600': '#3723ff',
          '700': '#2811f0',
          '800': '#220ec9',
          '900': '#1e0ea4',
          '950': '#0c056d',
        },
      }
    },
  },
  plugins: [],
}
export default config

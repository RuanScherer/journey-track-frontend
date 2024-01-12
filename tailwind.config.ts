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
      }
    },
  },
  plugins: [],
}
export default config

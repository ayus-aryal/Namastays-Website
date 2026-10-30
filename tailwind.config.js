export default {
  content: [
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        sans: ['Inter', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'Inter', 'sans-serif'],
      },
      colors: {
        // Neutrals: cool blue-greys that sit well next to the brand indigo.
        ink: {
          DEFAULT: '#12152b',
          50: '#f6f7fb',
          100: '#eceef5',
          200: '#dcdfea',
          300: '#b6bacd',
          400: '#8a90ab',
          500: '#5f6685',
          600: '#434968',
          700: '#2c3150',
          800: '#1c2038',
          900: '#12152b',
        },
        // Brand indigo, from the Namastays logo (#353f8c).
        brand: {
          50: '#f2f3fb',
          100: '#e3e6f6',
          200: '#c9cfee',
          300: '#a3adde',
          400: '#7783c8',
          500: '#525fae',
          600: '#404c9d',
          700: '#353f8c',
          800: '#2b3374',
          900: '#212758',
        },
        // Accent orange, from the prayer flag in the logo (#e4801e).
        ember: {
          50: '#fff6ec',
          100: '#ffe9d2',
          200: '#fdd0a2',
          300: '#f9b06b',
          400: '#f0953f',
          500: '#e4801e',
          600: '#c96a12',
          700: '#a35310',
          800: '#7f4112',
          900: '#623414',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,21,43,0.04), 0 8px 24px -12px rgba(18,21,43,0.16)',
        lift: '0 2px 4px rgba(18,21,43,0.05), 0 18px 40px -18px rgba(18,21,43,0.26)',
      },
      maxWidth: {
        site: '1240px',
      },
    },
  },
  plugins: [],
}

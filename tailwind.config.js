export default {
  content: [
  './index.html',
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
        ink: {
          DEFAULT: '#0e1211',
          50: '#f6f7f7',
          100: '#eceeed',
          200: '#d9dddb',
          300: '#b4bbb8',
          400: '#7e8885',
          500: '#5b6360',
          600: '#414846',
          700: '#2c3231',
          800: '#1b201f',
          900: '#0e1211',
        },
        forest: {
          50: '#f1f7f3',
          100: '#dcebe1',
          200: '#bad8c4',
          300: '#8fbda0',
          400: '#5c9a74',
          500: '#2f7d51',
          600: '#1e6340',
          700: '#1a4f35',
          800: '#163f2c',
          900: '#123324',
        },
        ember: {
          50: '#fff5ed',
          100: '#ffe8d5',
          200: '#fecfaa',
          300: '#fdae74',
          400: '#fb833c',
          500: '#f4661a',
          600: '#e04d0c',
          700: '#b93a0d',
          800: '#933013',
          900: '#772b13',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,18,17,0.04), 0 8px 24px -12px rgba(14,18,17,0.14)',
        lift: '0 2px 4px rgba(14,18,17,0.05), 0 18px 40px -18px rgba(14,18,17,0.22)',
      },
      maxWidth: {
        site: '1240px',
      },
    },
  },
  plugins: [],
}

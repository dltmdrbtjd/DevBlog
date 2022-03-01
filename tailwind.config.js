module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            h1: {
              color: 'rgb(203 213 225)',
            },
            h2: {
              color: 'rgb(203 213 225)',
            },
            h3: {
              color: 'rgb(203 213 225)',
            },
            p: {
              color: 'rgb(203 213 225)',
              margin: 0,
            },
            li: {
              color: 'rgb(203 213 225)',
            },
            strong: {
              color: 'rgb(255 255 255)',
            },
            time: {
              color: 'rgb(248 250 252)',
              fontWeight: 'bold',
            },
            a: {
              color: 'rgb(203 213 225)',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

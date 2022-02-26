module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [],
  darkMode: "media",
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: '#FF5C58',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

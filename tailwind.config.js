/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        colors: {
            stPatricksBlue: '#141850',
            spaceCadet: '#303179',
            terraCotta: '#ED7966',
            babyPink: '#F5CAC2',
            antiqueWhite: '#FAE5DF',
            white: '#FCFCFC',
            gainsboro: '#DEDEDE',
            graniteGray: '#636363'
        },
    },
  },
  plugins: [],
}

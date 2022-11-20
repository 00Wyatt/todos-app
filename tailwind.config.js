/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        colors: {
            primary: '#ED7966',
            secondary: '#303179',
            white: '#FCFCFC',
            lightGrey: '#DEDEDE',
            darkGrey: '#636363'
        },
        fontFamily: {
            sans: [
                'Nunito',
                ...defaultTheme.fontFamily.sans,
              ],
        }
    },
  },
  plugins: [],
}

/*
 |--------------------------------------------------------------------------
 | Tailwind Configuration
 |--------------------------------------------------------------------------
 |
 | This file configures Tailwind and its plugins. You can
 | edit your theme and the utilities you will need in here. For
 | more informations, see the Tailwind documentation:
 | http://tailwindcss.com/docs
 |
 */

const tailwind = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    fontFamily: {
      title: ['Raleway', 'Open Sans', 'Roboto', ...tailwind.fontFamily.sans],
      sans: ['Roboto', ...tailwind.fontFamily.sans],
      mono: ['"Roboto Mono"', ...tailwind.fontFamily.mono],
      condensed: ['"Roboto Condensed"', ...tailwind.fontFamily.sans],
    },
  },
  variants: {
    display: ['responsive', 'group-hover', 'hover'],
  },
  plugins: [
    require('./theme.config'), 
    require('tailwindcss-elevation')(['responsive', 'hover', 'active', 'focus']),
    require('tailwindcss-transitions')()
  ],
};

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
const _ = require('lodash');

module.exports = {
  theme: {
    zIndex: {
      none: '-1',
      ..._.reduce(_.range(1, 11), (result, value) => ({ ...result, [value * 10]: value * 10 }), {}),
    },
    fontFamily: {
      title: ['Raleway', 'Open Sans', 'Roboto', ...tailwind.fontFamily.sans],
      sans: ['Roboto', ...tailwind.fontFamily.sans],
      mono: ['"Roboto Mono"', ...tailwind.fontFamily.mono],
      condensed: ['"Roboto Condensed"', ...tailwind.fontFamily.sans],
    },
  },
  variants: {
    display: ['responsive', 'group-hover', 'hover'],
    cursor: ['disabled', 'focus', 'hover'],
  },
  plugins: [
    require('./theme.config'),
    require('tailwindcss-elevation')(['responsive', 'hover', 'active', 'focus', 'disabled']),
    require('tailwindcss-transitions')(),

    // TODO: PR on tailwind, or create a dedicated plugin
    function({ addUtilities, variants }) {
      const actions = [ 'none', 'auto', 'pan-x', 'pan-left', 'pan-right', 'pan-y', 'pan-up', 'pan-down', 'pinch-zoom', 'manipulation' ];
      const utilities = _.map(actions, action => ({
        [`.touch-${action}`]: {
          'touch-action': action
        }
      }));
      addUtilities(utilities, variants('touchActions'),
      );
    },
  ],
};

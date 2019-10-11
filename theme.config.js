/*
 |--------------------------------------------------------------------------
 | Tailwind Theming
 |--------------------------------------------------------------------------
 |
 | This configuration file holds the theme settings of your
 | application. This value will be imported into your CSS as CSS 
 | variables so you can use a powerful theming management client-side.
 |
 | For more informations, see here: 
 | https://github.com/hawezo/tailwindcss-theming
 |
 */

const { ThemingPlugin } = require('tailwindcss-theming');

const variants = [
  { name: 'default', value: 1 },
  { name: 'high-emphasis', value: 0.87 },
  { name: 'medium-emphasis', value: 0.6 },
  { name: 'inactive', value: 0.6 },
  { name: 'disabled', value: 0.38 },
  { name: 'muted', value: 0.425 },
  { name: 'selection', value: 0.25 },
  { name: 'slightly-visible', value: 0.1 },
];

const palette = [
  { name: 'transparent', value: 'transparent', opacityVariants: [], outputFormat: 'text' },

  // menu colors
  { name: 'menu-primary', value: '#3c4253', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'menu-secondary', value: '#303030', opacityVariants: variants, outputFormat: 'rgb' },

  { name: 'on-menu-primary', value: '#9aa2b6', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'on-menu-secondary', value: '#9aa2b6', opacityVariants: variants, outputFormat: 'rgb' },

  // mains colors
  { name: 'black', value: '#000000', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'primary', value: '#2196f3', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'primary-variant', value: '#1565c0', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'secondary', value: '#039be5', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'secondary-variant', value: '#0288d1', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'background', value: '#f4f4f4', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'surface', value: '#ffffff', opacityVariants: variants, outputFormat: 'rgb' },

  // infotypes colors
  { name: 'error', value: '#b00020', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'success', value: '#3ab577', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'warning', value: '#e65100', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'info', value: '#2481ea', opacityVariants: variants, outputFormat: 'rgb' },

  // on colors
  { name: 'on-primary', value: '#ffffff', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'on-secondary', value: '#ffffff', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'on-background', value: '#585851', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'on-surface', value: '#3c3c3c', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'on-error', value: '#ffffff', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'on-success', value: '#ffffff', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'on-warning', value: '#ffffff', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'on-info', value: '#ffffff', opacityVariants: variants, outputFormat: 'rgb' },
];

const lightNav = [
  { name: 'menu-primary', value: '#ffffff', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'menu-secondary', value: '#e1e1e1', opacityVariants: variants, outputFormat: 'rgb' },

  { name: 'on-menu-primary', value: '#000', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'on-menu-secondary', value: '#000', opacityVariants: variants, outputFormat: 'rgb' },
]

const primaryNav = [
  { name: 'menu-primary', value: '#2196f3', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'menu-secondary', value: '#1565c0', opacityVariants: variants, outputFormat: 'rgb' },

  { name: 'on-menu-primary', value: '#fff', opacityVariants: variants, outputFormat: 'rgb' },
  { name: 'on-menu-secondary', value: '#fff', opacityVariants: variants, outputFormat: 'rgb' },
]

const themes = {
  default: { type: 'light', colors: palette },
  'light-navigation': { type: 'light', colors: lightNav },
  'primary-navigation': { type: 'light', colors: primaryNav },
};

const config = {
  themeTypeKey: 'color-scheme',
  colorVariablePrefix: 'color',
  useVariants: true,
  outputThemePrefix: 'theme'
};

module.exports = {
  themes,
  config,
  plugin: new ThemingPlugin(themes, config)
};

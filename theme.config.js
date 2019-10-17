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

const { ThemeBuilder, Theme } = require('tailwindcss-theming');

const mainTheme = new Theme()
  .default()
  .colors({
    // A transparent color, which alpha value will be detected.
    'transparent': 'transparent',

    // Navigation
    'navigation': '#3f485d',
    'on-navigation': '#d3d4d6',

    // Brand colors
    'brand':'#2196f3',
    'brand-variant':'#1565c0',
    'on-brand':'#ffffff',
    'on-brand-variant':'#ffffff',
    
    // Background colors, but not limited to `bg` utilities.
    'background':'#f4f4f4',
    'surface':'#ffffff',
    'on-background':'#585851',
    'on-surface':'#3c3c3c',
    
    // Event colors.
    'error':'#b00020',
    'on-error':'#ffffff',
    'success':'#3ab577',
    'on-success':'#ffffff',
    'warning':'#e65100',
    'on-warning':'#ffffff',
    'info':'#2481ea',
    'on-info':'#ffffff',
  })

  // Color variants
  .colorVariant('hover', 'white', ['on-navigation'])
;

const darkTheme = new Theme()
  .name('dark')
  // .schemeDefault() // Makes this theme the default base on user scheme preference (OS/browser-wide), combine with .dark()
  .keep() // Let the theme be accessible for the current strategy
  .dark() // Set the theme under the `prefers-color-scheme` rule
  .colors({
    // We didn't include `transparent`, it will be inherit since it's the same.
    // Navigation
    'navigation': '#282828',
    'on-navigation': '#c1c1c1',

    // Brand colors
    'brand':'#2196f3',
    'brand-variant':'#1565c0',
    'on-brand':'#ffffff',
    'on-brand-variant':'#ffffff',
    
    // Background colors, but not limited to `bg` utilities.
    'background':'#1f1f1f',
    'surface':'#282828',
    'on-background':'#ffffff',
    'on-surface':'#ffffff',
    
    // Event colors.
    'error':'#b00020',
    'on-error':'#ffffff',
    'success':'#3ab577',
    'on-success':'#ffffff',
    'warning':'#e65100',
    'on-warning':'#ffffff',
    'info':'#2481ea',
    'on-info':'#ffffff',
  })

  // Color variants
  // .colorVariant('hover', 'white', 'on-navigation') // This could be omitted, since it's inherited.
;

module.exports = new ThemeBuilder()
  // .asClass()
  // .asPrefixedClass('theme')
  .asDataThemeAttribute()
  .default(mainTheme)
  .theme(darkTheme);

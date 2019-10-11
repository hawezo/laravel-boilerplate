const mix = require('laravel-mix');
require('laravel-mix-postcss-config');
require('laravel-mix-alias');
require('laravel-mix-purgecss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 | This boilerplate adds aliases for easy importation, and uses
 | TypeScript, PostCSS and PurgeCSS.
 |
 */

mix
  .alias({
    '@': './resources/js',
    '~': './',
    'ziggy': './vendor/tightenco/ziggy/dist/js/route.js'
  })
  .ts('resources/js/app.ts', 'public/js')
  .postCss('resources/css/app.css', 'public/css')
  .postCssConfig()
  .purgeCss();

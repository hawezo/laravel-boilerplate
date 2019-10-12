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

  // Adds aliases for cleaner import
  .alias({
    '@': './resources/js',
    '~': './',
    ziggy: './vendor/tightenco/ziggy/dist/js/route.js',
  })

  // Adds webpack rules
  .webpackConfig({
    module: {
      rules: [

        // Registers the translator loader
        {
          test: /resources[\\\/]lang.+\.(php|json)$/,
          loader: 'laravel-localization-loader',
        },
      ],
    },
  })

  // Defines application entry file
  .ts('resources/js/app.ts', 'public/js')

  // Registers CSS and PostCSS
  .postCss('resources/css/app.css', 'public/css')
  .postCssConfig()

  // Registers PurgeCSS
  .purgeCss();

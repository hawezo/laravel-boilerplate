const mix = require('laravel-mix');
const path = require('path');
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

  // Application entry file
  .ts('resources/js/app.ts', 'public/js')

  // Registers CSS and PostCSS
  .postCss('resources/css/app.css', 'public/css', [
    require('postcss-import'),
    require('postcss-calc'),
    require('postcss-url'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('postcss-custom-properties'),
  ])

  // Copies images
  .copyDirectory('resources/storage', 'public/storage')

  // Adds webpack rules
  .webpackConfig({
    // Code splitting options
    output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },

    // Adds aliases for cleaner import
    resolve: {
      alias: {
        vue$: path.resolve('vue/dist/vue.runtime.esm.js'),
        '@': path.resolve('./resources/js'),
        '~': path.resolve('./'),
        ziggy: path.resolve('./vendor/tightenco/ziggy/dist/js/route.js'),
      },
    },

    // Translator loader
    module: {
      rules: [
        {
          test: /resources[\\\/]lang.+\.(php|json)$/,
          loader: 'laravel-localization-loader',
        },
        {
          test: /\.(postcss)$/,
          use: [
            'vue-style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        }
      ],
    },
  })

  // Adds babel plugins
  .babelConfig({
    plugins: ['@babel/plugin-syntax-dynamic-import'],
  })

  // Registers PurgeCSS
  .purgeCss()

  // Enables versioning
  .version()
  .sourceMaps();

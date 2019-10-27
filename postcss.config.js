/*
 |--------------------------------------------------------------------------
 | PostCSS configuration
 |--------------------------------------------------------------------------
 |
 | You can configure PostCSS and adds plugins in this
 | configuration file.
 |
 */

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-calc'),
    require('postcss-url'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('postcss-custom-properties'),
    require('autoprefixer'),
  ],
};

import { shouldIgnore } from './shouldIgnore';
import { IgnoreList } from './Type/IgnoreList';
import { Catalogue } from './Type/Catalogue';

/*
 |--------------------------------------------------------------------------
 | Lang Importation
 |--------------------------------------------------------------------------
 |
 | This script takes advantage of `rmariuzzo/laravel-localization-loader`
 | to load all of your available translations. It find files in the
 | /resources/lang directory and imports them.
 |
 */

export function catalogue(ignore: IgnoreList): Catalogue {
  const catalogue: Catalogue = {};
  const include = require.context('~/resources/lang', true, /\.(php|json)$/);
  include.keys().forEach(function(file) {
    const lang = new RegExp('./(.*)/(.*).(?:php|json)').exec(file);

    if (lang.length === 3 && !shouldIgnore(ignore, lang[1], lang[2])) {
      catalogue[`${lang[1]}.${lang[2]}`] = include(file);
    }
  });

  return catalogue;
}

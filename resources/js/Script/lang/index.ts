import Translator, { Replacements } from 'lang.js';
import { IgnoreList } from './Type/IgnoreList';
import { catalogue } from './messages';

/*
 |--------------------------------------------------------------------------
 | Localization
 |--------------------------------------------------------------------------
 |
 | This wrapper adds localization to your Vue application. It will
 | automatically finds all of your app's translations. If you want,
 | you can ignore some translation files by adding them in the ignore
 | map below.
 |
 */

const ignore: IgnoreList = {
  // en: [ 'pagination', 'auth' ]
};

const i18n = new Translator({
  locale: 'en',
  messages: catalogue(ignore),
});

export const Lang = {
  methods: {
    $_: (key: string, replacements?: Replacements, locale?: string) => i18n.get(key, replacements, locale),
    $lang: () => i18n,
  },
};

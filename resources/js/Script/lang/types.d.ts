import Vue from 'vue';
import Lang, { Replacements } from 'lang.js';

declare module 'vue/types/vue' {
  interface Vue {
    $_: (key: string, replacements?: Replacements, locale?: string) => string,
    $lang: () => Lang
  }
}

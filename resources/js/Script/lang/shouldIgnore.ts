import { IgnoreList } from './Type/IgnoreList';

export function shouldIgnore(ignore: IgnoreList, locale: string, domain: string) {
  for (let [ignoreLocale, ignoreDomains] of Object.entries<string[]>(ignore)) {
    if (locale === ignoreLocale && ignoreDomains.includes(domain)) {
      return true;
    }
  }

  return false;
}

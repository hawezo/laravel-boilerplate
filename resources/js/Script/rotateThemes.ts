import theming from '~/theme.config.js';
const themes = theming._themes.map(theme => theme._name);
const strategyPrefix = theming._config.prefix;
const strategy = theming._config.strategy;

/*
 |--------------------------------------------------------------------------
 | Theme Rotation
 |--------------------------------------------------------------------------
 |
 | This script exports a function which will rotate through the themes 
 | found in your `theme.config.js` file.
 | You can see this as an example of how to use your theme config
 | to avoid repeating code (especially theme names).
 | If you wish to support more strategies, you can write your own rotate
 | function and change the `export` value of this file.
 |
 */

/**
 * Rotate through themes using the `data-theme-attribute` strategy.
 */
function rotateDataThemeStrategy() {
  let found = false;

  if ('theme' in document.body.dataset) {
    let current = document.body.dataset.theme;
    for (let i = 0; i < themes.length; i++) {
      if (current === themes[i]) {
        found = true;
        delete document.body.dataset.theme;

        if (i + 1 < themes.length) {
          document.body.dataset.theme = themes[i + 1];
        }
        break;
      }
    }
  }

  if (!found && themes.length > 1) {
    document.body.dataset.theme = themes[1];
  }
}

/**
 * Rotate through themes using the `prefixed-class` strategy.
 */
function rotatePrefixedClassStrategy(usePrefix: boolean = true) {
  let found = false;
  let prefix = usePrefix ? `${strategyPrefix}-` : '';

  for (let i = 0; i < themes.length; i++) {
    if (document.body.classList.contains(`${prefix}${themes[i]}`)) {
      found = true;
      document.body.classList.remove(`${prefix}${themes[i]}`);

      if (i + 1 < themes.length) {
        document.body.classList.add(`${prefix}${themes[i + 1]}`);
      }
      break;
    }
  }

  if (!found && themes.length > 1) {
    document.body.classList.add(`${prefix}${themes[1]}`);
  }
}

/**
 * Rotate through themes using the `class` strategy.
 */
function rotateClassStrategy() {
  return rotatePrefixedClassStrategy(false);
}

function rotate() {
  switch (strategy) {
    case 'class':
      return rotateClassStrategy();
    case 'prefixed-class':
      return rotatePrefixedClassStrategy();
    case 'data-theme-attribute':
      return rotateDataThemeStrategy();
    default:
      return () => console.warn(`The strategy roation method for ${strategy} is not supported, please write your own.`);
  }
}

export default rotate;

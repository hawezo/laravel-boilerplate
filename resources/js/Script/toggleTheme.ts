import { themes as tailwindThemes, config } from '~/theme.config.js';

const themes = Object.keys(tailwindThemes);
const prefix = config.outputThemePrefix;

export default function() {
  let found = false;

  for (let i = 0; i < themes.length; i++) {
    if (document.body.classList.contains(`${prefix}-${themes[i]}`)) {
      found = true;
      document.body.classList.remove(`${prefix}-${themes[i]}`);

      if (i + 1 < themes.length) {
        document.body.classList.add(`${prefix}-${themes[i + 1]}`);
      }
      break;
    }
  }

  if (!found && themes.length > 1) {
    document.body.classList.add(`${prefix}-${themes[1]}`);
  }
}

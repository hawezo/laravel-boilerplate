import _ from 'lodash';
import { ThemeApi } from './ThemeApi';
import { Themes } from './Theme';

export const Theme = {
  methods: {
    setTheme(theme?: Themes) {
      ThemeApi.update(theme);
    },
    removeTheme() {
      this.setTheme(null);
    },
  },
};

export { ThemeApi };
export { Themes };

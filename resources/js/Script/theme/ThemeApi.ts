import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';
import { Themes } from './Theme';
import { $path } from '@/Script/router';

export class ThemeApi {
  private static readonly baseUrl = 'api.settings.theme';
  private static _theme: Themes | false | undefined = false;

  /**
   * Gets the document theme.
   *
   * @static
   * @returns {(Themes | undefined)}
   * @memberof ThemeApi
   */
  public static documentCurrent(): Themes | undefined {
    return _.get(document, 'body.dataset.theme', undefined);
  }

  /**
   * Gets the current theme.
   *
   * @static
   * @returns {(Themes | null)}
   * @memberof ThemeApi
   */
  public static current(): Themes | false | undefined {
    return this._theme;
  }

  /**
   * Applies a theme.
   *
   * @static
   * @param {(Themes | null)} theme
   * @memberof ThemeApi
   */
  public static update(theme?: Themes) {
    let result: Promise<AxiosResponse<any>>;

    if (theme) {
      result = this.set(theme);
    } else {
      result = this.delete();
    }

    let themeBefore = this._theme;
    this._theme = theme;

    result
      .then(() => {
        this.apply();
      })
      .catch(() => {
        this._theme = themeBefore;
      });

    return this._theme;
  }

  /**
   * Updates the server-side preference.
   *
   * @static
   * @param {Themes} theme
   * @memberof ThemeApi
   */
  private static set(theme: Themes) {
    return axios.put(this.api('set'), { theme });
  }

  /**
   * Removes the server-side preference.
   *
   * @static
   * @param {Themes} theme
   * @memberof ThemeApi
   */
  private static delete() {
    return axios.delete(this.api('delete'));
  }

  /**
   * Gets an API endpoint.
   *
   * @private
   * @static
   * @param {string} name
   * @returns
   * @memberof ThemeApi
   */
  private static api(name: string) {
    return $path(`${this.baseUrl}.${name}`);
  }

  /**
   * Applies the theme.
   *
   * @static
   * @param {Themes} theme
   * @memberof ThemeApi
   */
  private static apply() {
    if (this._theme) {
      return _.set(document, 'body.dataset.theme', this._theme);
    } else {
      delete document.body.dataset.theme;
    }
  }
}

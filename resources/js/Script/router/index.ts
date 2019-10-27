import route from 'ziggy';
import { Router as IRouter, Ziggy as IZiggy } from './Ziggy';

/**
 * Wraps Ziggy's `Router` object and adds a `path` method that is just the
 * same, without the base url.
 */
function router(name: string, params: any, absolute: boolean, ziggy: IZiggy): IRouter | null {
  try {
    let result: IRouter = route(name, params, absolute, ziggy);

    let path = result.url().replace(ziggy.baseUrl, '');
    result['path'] = () => (path.startsWith('/') ? path : `/${path}`);

    return result;
  } catch (error) {
    console.warn(`Route ${name} could not be found, or it is missing parameters.`);
    return null;
  }
}

/**
 * Returns a path.
 */
function path(name: string, params: any, absolute: boolean, ziggy: IZiggy): string | '#' {
  let result = router(name, params, absolute, ziggy);

  return null === result ? '#' : result.path();
}

export const $path = GetRouter(false).methods.$path;

export function GetRouter(useWindow: boolean) {
  const { Ziggy } = useWindow ? window : require('./router.js');

  return {
    methods: {
      $route: (name: string, params?: any, absolute: boolean = false) => router(name, params, absolute, Ziggy),
      $path: (name: string, params?: any, absolute: boolean = false) => path(name, params, absolute, Ziggy),
    },
  };
}

export const Router = GetRouter(false);
export const WindowRouter = GetRouter(true);

import route from 'ziggy';
import { Router as IRouter, Ziggy as IZiggy } from './Ziggy';

/**
 * Wraps Ziggy's `Router` object and adds a `path` method that is just the
 * same, without the base url.
 */
function router(name: string, params: any, absolute: boolean, ziggy: IZiggy) {
  let result: IRouter = route(name, params, absolute, ziggy);

  let path = result.url().replace(ziggy.baseUrl, '');
  result['path'] = () => path.startsWith('/') ? path : `/${path}`;

  return result;
}

export function GetRouter(useWindow: boolean) {
  const { Ziggy } = useWindow ? window : require('./router.js');

  return {
    methods: {
      $route: (name: string, params: any, absolute: boolean) => router(name, params, absolute, Ziggy),
      $path: (name: string, params: any, absolute: boolean) => router(name, params, absolute, Ziggy).path(),
    },
  }
}

export const Router = GetRouter(false);
export const WindowRouter = GetRouter(true);

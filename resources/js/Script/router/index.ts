import route from 'ziggy';
import { Ziggy } from './router';
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

export const Router = {
  methods: {
    $route: (name: string, params: any, absolute: boolean) => router(name, params, absolute, Ziggy),
    $path: (name: string, params: any, absolute: boolean) => router(name, params, absolute, Ziggy).path(),
  },
};

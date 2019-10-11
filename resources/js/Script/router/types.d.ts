import { Ziggy, Router } from './Ziggy';

declare global {
  interface Window {
    route: any;
    Ziggy: Ziggy;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $route: (name: string, params: any, absolute: boolean) => Router;
    $path: (name: string, params: any, absolute: boolean) => string,
  }
}

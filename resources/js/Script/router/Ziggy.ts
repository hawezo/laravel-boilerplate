export interface Ziggy {
  namedRoutes: any;
  baseUrl: string;
  baseProtocol: 'http' | 'https' | string;
  baseDomain: string;
  basePort: boolean | string;
  defaultParameters: any[];
}

export interface Router {
  with: (params: any) => this;
  withQuery: (params: any) => this;
  matchUrl: () => boolean;
  current: (name?: string) => boolean | string;
  params: () => any;
  url: () => string;
  toString: () => string;
  valueOf: () => string;
  path: () => string;
}

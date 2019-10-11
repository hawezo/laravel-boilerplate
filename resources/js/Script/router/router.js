var Ziggy = {
  namedRoutes: {},
  baseUrl: 'http://localhost/',
  baseProtocol: 'http',
  baseDomain: 'localhost',
  basePort: false,
  defaultParameters: [],
};

if (typeof window.Ziggy !== 'undefined') {
  for (var name in window.Ziggy.namedRoutes) {
    Ziggy.namedRoutes[name] = window.Ziggy.namedRoutes[name];
  }
}

export { Ziggy };

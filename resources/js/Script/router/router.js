var Ziggy = {
  namedRoutes: {
    'debugbar.openhandler': { uri: '_debugbar/open', methods: ['GET', 'HEAD'], domain: null },
    'debugbar.clockwork': { uri: '_debugbar/clockwork/{id}', methods: ['GET', 'HEAD'], domain: null },
    'debugbar.telescope': { uri: '_debugbar/telescope/{id}', methods: ['GET', 'HEAD'], domain: null },
    'debugbar.assets.css': { uri: '_debugbar/assets/stylesheets', methods: ['GET', 'HEAD'], domain: null },
    'debugbar.assets.js': { uri: '_debugbar/assets/javascript', methods: ['GET', 'HEAD'], domain: null },
    'debugbar.cache.delete': { uri: '_debugbar/cache/{key}/{tags?}', methods: ['DELETE'], domain: null },
    index: { uri: '/', methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], domain: null },
    'password.confirm': { uri: 'confirm-password', methods: ['GET', 'HEAD'], domain: null },
    'password.confirm.attempt': { uri: 'confirm-password', methods: ['POST'], domain: null },
    login: { uri: 'login', methods: ['GET', 'HEAD'], domain: null },
    'login.attempt': { uri: 'login', methods: ['POST'], domain: null },
    logout: { uri: 'logout', methods: ['POST'], domain: null },
    dashboard: { uri: 'dashboard', methods: ['GET', 'HEAD'], domain: null },
    'admin.dashboard': { uri: 'admin/dashboard', methods: ['GET', 'HEAD'], domain: null },
    'api.settings.theme.set': { uri: 'api/settings/theme/set', methods: ['PUT'], domain: null },
    'api.settings.theme.delete': { uri: 'api/settings/theme/delete', methods: ['DELETE'], domain: null },
  },
  baseUrl: 'https://sudia.dev/',
  baseProtocol: 'https',
  baseDomain: 'sudia.dev',
  basePort: false,
  defaultParameters: [],
};

if (typeof window.Ziggy !== 'undefined') {
  for (var name in window.Ziggy.namedRoutes) {
    Ziggy.namedRoutes[name] = window.Ziggy.namedRoutes[name];
  }
}

export { Ziggy };

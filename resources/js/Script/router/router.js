    var Ziggy = {
        namedRoutes: {"index":{"uri":"\/","methods":["GET","HEAD"],"domain":null}},
        baseUrl: 'http://laravel-test.dev/',
        baseProtocol: 'http',
        baseDomain: 'laravel-test.dev',
        basePort: false,
        defaultParameters: []
    };

    if (typeof window.Ziggy !== 'undefined') {
        for (var name in window.Ziggy.namedRoutes) {
            Ziggy.namedRoutes[name] = window.Ziggy.namedRoutes[name];
        }
    }

    export {
        Ziggy
    }

# Laravel Boilerplate

This boilerplate is a good starter for any Laravel application using **Vue**, **Inertia**, **TailwindCSS** and **TypeScript**. 

## Inertia

[Inertia](https://inertiajs.com/) is installed and configured. [inertia-vue](https://github.com/inertiajs/inertia-vue) and the [Laravel adapter](https://github.com/inertiajs/inertia-laravel) are installed. 
To render a page, use `Inertia::view($component)`. You can find more information on the [documentation](https://inertiajs.com/server-side-setup).

## TypeScript

[TypeScript](http://www.typescriptlang.org/) is installed and configured, but the Vue components do not use it. I intend to use TypeScript only on scripts or modules, like this [theme toggle](resources/js/Script/toggleTheme.ts). You can still use TypeScript on components by following the [Vue documentation](https://vuejs.org/v2/guide/typescript.html).

## TailwindCSS

The following TailwindCSS plugins are included:
- [Elevation](https://github.com/jonaskay/tailwindcss-elevation) — To provide better shadow utilities
- [Theming](https://github.com/hawezo/tailwindcss-theming) — To provide powerful client-side theming

## PostCSS

The following PostCSS plugins are included:
- [Calc](https://github.com/postcss/postcss-calc) — To allow the use of `calc`
- [Custom Properties](https://github.com/postcss/postcss-custom-properties) — To allow the use of custom CSS properties
- [Import](https://github.com/postcss/postcss-import) — To allow CSS importation
- [Nested](https://github.com/postcss/postcss-nested) — To allow nesting of CSS rules
- [Url](https://github.com/postcss/postcss-url) — To rebase the `url` property
- [Autoprefixer](https://github.com/postcss/autoprefixer) — To add vendor prefixes to CSS rules


---

## Router

This boilerplate uses [Ziggy](https://github.com/tightenco/ziggy). The TypeScript entry point registers the router and adds it into Vue, so you can use `$router()` and `$path()` methods in any component. 

```typescript
$route: (name: string, params: any, absolute: boolean) => Router;
$path: (name: string, params: any, absolute: boolean) => string;
```

I decided not to include the routes in the Blade templates as they most likely don't change often, and instead export them into the scripts thanks to Ziggy's `artisan` command. 
So for the router to work, you need to extract the routes every time you change them with `composer update:routes` or `php artisan ziggy:generate "resources/js/Script/router/router.js"`. 

If you wish to use the `@routes` directive instead, you need to place it in your `app.blade.php` (just before `</head>` for instance), and to replace `import { Router } from '@/Script/router'` by `import { WindowRouter } from '@/Script/router'` in the entry file ([`app.ts`](resources/js/app.ts)). 

**You will still need a `router.js` file in the `router` directory**, even if it's empty, because Webpack will cry if there is no such file.

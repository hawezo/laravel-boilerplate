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
- [Theming](https://github.com/hawezo/tailwindcss-theming) — To provide powerful client-side theming [more info](#theming)
- [Transitions](https://github.com/benface/tailwindcss-transitions) — To provide transition support

## PostCSS

The following PostCSS plugins are included:
- [Calc](https://github.com/postcss/postcss-calc) — To allow the use of `calc`
- [Custom Properties](https://github.com/postcss/postcss-custom-properties) — To allow the use of custom CSS properties
- [Import](https://github.com/postcss/postcss-import) — To allow CSS importation
- [Nested](https://github.com/postcss/postcss-nested) — To allow nesting of CSS rules
- [Url](https://github.com/postcss/postcss-url) — To rebase the `url` property

## Lang

This boilerplate uses [laravel-localization-loader](https://github.com/rmariuzzo/laravel-localization-loader) and [Lang.js](https://github.com/rmariuzzo/Lang.js) together to import your localization into Vue. More specifically, this boilerplate *automatically* imports all localization files, unless you [ignore](resources/js/script/lang/index.ts) them. 

You can use the following helpers in your components: 

```typescript
$_: (key: string, replacements?: Replacements, locale?: string) => string,
$lang: () => Lang
```

An example is available in the [Index](resources/js/View/Index.vue) page.

## Router

This boilerplate uses [Ziggy](https://github.com/tightenco/ziggy). The TypeScript entry point registers the router and adds it into Vue, so you can use `$router()` and `$path()` methods in any component. 

```typescript
$route: (name: string, params: any, absolute: boolean) => Router;
$path: (name: string, params: any, absolute: boolean) => string;
```

An example is available in the [layout](resources/js/Layout/Layout.vue).

I decided not to include the routes in the Blade templates as they most likely don't change often, and instead export them into the scripts thanks to Ziggy's `artisan` command. 
So for the router to work, you need to extract the routes every time you change them with `composer update:routes` or `php artisan ziggy:generate "resources/js/Script/router/router.js"`. 

If you wish to use the `@routes` directive instead, you need to place it in your `app.blade.php` (just before `</head>` for instance), and to replace `import { Router } from '@/Script/router'` by `import { WindowRouter } from '@/Script/router'` in the entry file ([`app.ts`](resources/js/app.ts)). 

**You will still need a `router.js` file in the `router` directory**, even if it's empty, because Webpack will cry if there is no such file.

## Metadata

I added a helper that allows to easily set a page title from the view. You just have to set a `title` property to your component. It can be a string or a callback. The Vue instance is passed as the first parameter of the callback, so you can use an arrow function to contextually set the title of your page:

```javascript
export default {
  title: ({ user }) => `Welcome, ${user.name}`,
  data() {
    return {
      user: {
        name: 'Jon Doe'
      }
    }
  }
}
```

If you are not familiar with destructuration, this is the equivalent of:

```javascript
export default {
  title: (vm) => `Welcome, ${vm.user.name}`,
  data() {
    return {
      user: {
        name: 'Jon Doe'
      }
    }
  }
}
```

## Error Handling

With Inertia, you have to [replace the behavior](https://inertiajs.com/error-handling) of your [default error handler](app/Exceptions/Handler.php) in order display error pages. This boilerplate adds an [error page](resources/js/View/Error.vue) and handles default errors with localization. 

For a more advanced error handling, you can make an exception converter that would convert any `\Exception` into some `App\Exceptions\AppException` with a `$code` property, for example. You could map most common exceptions to a code, and let this code be sent in your views, so you can provide a documentation for your users. 

```php
// App\Exceptions\AppException

protected $map = [
    NotFoundHttpException::class => 0x03,
    \LogicException::class       => 0x02,
    \Exception::class            => 0x01,
];
```

# Theming

I'm using my [Tailwind theming plugin](hawezo/tailwindcss-theming) on every project now, so I fully configured it for this project. 

The configuration is a really good start for every project. It's all in the [`theme.config.js`](theme.config.js) file, and this file is included just like a plugin in [`tailwind.config.js`](tailwind.config.js).

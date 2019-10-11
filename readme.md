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

<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class BladeServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot()
    {
        $this->setupThemeDirective();
    }

    /**
     * Adds a `data-theme` if the user has a theme set up.
     */
    public function setupThemeDirective()
    {
        Blade::directive('theme', function () {
            return "<?php if (Auth::user() && Auth::user()->settings()->has('theme')) { echo \"data-theme='\" . e(Auth::user()->settings()->get('theme')) . \"'\"; } ?>";
        });
    }
}

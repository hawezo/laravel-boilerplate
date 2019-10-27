<?php

namespace App\Providers;

use App\Runners\Install;
use App\Runners\Update;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerRunners();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    }

    /**
     * Register the runners.
     *
     * @return void
     */
    public function registerRunners()
    {
        $this->app->bind('app.installer', Install::class);
        $this->app->bind('app.updater', Update::class);
    }
}

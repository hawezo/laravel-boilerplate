<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class InertiaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        $this->registerMixVersion();
        $this->shareApplication();
        $this->shareAuthentification();
        $this->shareFlashes();
    }

    /**
     * Sets the mix version from the manifest.
     */
    public function registerMixVersion()
    {
        Inertia::version(function () {
            return md5_file(public_path('mix-manifest.json'));
        });
    }

    /**
     * Share global application data.
     */
    public function shareApplication()
    {
        Inertia::share([
            'app' => function () {
                $file = file_get_contents(base_path('/composer.json'));
                $json = json_decode($file, true);

                return [
                    'name'      => config('app.name'),
                    'version'   => $json['version'],
                    'logo'      => Storage::url('static/logo.jpg'),
                    'load_time' => (microtime(true) - LARAVEL_START),
                    'locale'    => App::getLocale(),
                ];
            },
        ]);
    }

    /**
     * Share authentification data.
     */
    public function shareAuthentification()
    {
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user() ? [
                        'id'              => Auth::user()->id,
                        'username'        => Auth::user()->username,
                        'first_name'      => Auth::user()->first_name,
                        'last_name'       => Auth::user()->last_name,
                        'display_name'    => Auth::user()->display_name,
                        'email'           => Auth::user()->email,
                        'profile_picture' => Auth::user()->profile_picture,
                        'settings'        => Auth::user()->settings,
                    ] : null,
                ];
            },
        ]);
    }

    /**
     * Share flashes and errors.
     */
    public function shareFlashes()
    {
        Inertia::share([
            'flash' => function () {
                return [
                    'success' => Session::get('success'),
                ];
            },
            'errors' => function () {
                return Session::get('errors')
                    ? Session::get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
        ]);
    }
}

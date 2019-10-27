<?php

namespace App\Runners;

use MadWeb\Initializer\Contracts\Runner;
use PermissionSeeder;

class Install
{
    public function production(Runner $run)
    {
        return $run
            ->external('composer', 'install', '--no-dev', '--prefer-dist', '--optimize-autoloader')
            ->external('composer', 'update:routes')
            ->artisan('key:generate', ['--force' => true])
            ->artisan('migrate', ['--force' => true])
            ->artisan('db:seed', ['--class' => PermissionSeeder::class])
            ->artisan('storage:link')
            ->external('yarn', 'install')
            ->external('yarn', 'run', 'production')
            ->artisan('route:cache')
            ->artisan('config:cache')
            ->artisan('event:cache');
    }

    public function local(Runner $run)
    {
        return $run
            ->external('composer', 'install')
            ->external('composer', 'update:routes')
            ->artisan('key:generate')
            ->artisan('migrate')
            ->artisan('db:seed')
            ->artisan('storage:link')
            ->external('yarn', 'install')
            ->external('yarn', 'development');
    }
}

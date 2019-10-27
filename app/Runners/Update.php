<?php

namespace App\Runners;

use MadWeb\Initializer\Contracts\Runner;

class Update
{
    public function production(Runner $run)
    {
        return $run
            ->external('composer', 'install', '--no-dev', '--prefer-dist', '--optimize-autoloader')
            ->external('composer', 'update:routes')
            ->artisan('db:seed', ['--class' => PermissionSeeder::class])
            ->external('yarn', 'install')
            ->external('yarn', 'run', 'production')
            ->artisan('route:cache')
            ->artisan('config:cache')
            ->artisan('event:cache')
            ->artisan('migrate', ['--force' => true])
            ->artisan('config:clear')
            ->artisan('queue:restart'); // ->artisan('horizon:terminate');
    }

    public function local(Runner $run)
    {
        return $run
            ->external('composer', 'install')
            ->external('composer', 'update:routes')
            ->artisan('db:seed')
            ->external('yarn', 'install')
            ->external('yarn', 'development')
            ->artisan('migrate')
            ->artisan('config:clear');
    }
}

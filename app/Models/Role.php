<?php

namespace App\Models;

use Spatie\Permission\Models\Role as Model;

class Role extends Model
{
    const DEVELOPER     = 'developer';
    const ADMINISTRATOR = 'administrator';
    const GUEST         = 'guest';
}

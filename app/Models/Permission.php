<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as Model;

class Permission extends Model
{
    const BYPASS_EVERYTHING  = 'bypass any guard';
    const ACCESS_DASHBOARD   = 'access dashboard';
    const ACCESS_ADMIN_PANEL = 'access administration panel';
    const UPDATE_SETTINGS    = 'update settings';
}

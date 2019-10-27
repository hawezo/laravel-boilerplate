
<?php

use App\Http\Controllers\Api\Settings\ThemeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web API Routes
|--------------------------------------------------------------------------
|
| These routes can be called from the web without token, but will
| act as API.
|
*/

// Settings
Route::group(['as' => 'settings.', 'prefix' => 'settings/'], function () {
    // Theme
    Route::put('/theme/set', ThemeController::action('set'))->name('theme.set');
    Route::delete('/theme/delete', ThemeController::action('delete'))->name('theme.delete');
});

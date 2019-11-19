<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Auth\ConfirmPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Index
Route::permanentRedirect('/', '/dashboard')->name('index');

// Password confirmation
Route::get('/confirm-password')
    ->uses(ConfirmPasswordController::action('showConfirmForm'))
    ->name('password.confirm')
    ->middleware('auth');

Route::post('/confirm-password')
    ->uses(ConfirmPasswordController::action('confirm'))
    ->name('password.confirm.attempt')
    ->middleware('auth');

// Authentication
Route::get('/login')
    ->uses(LoginController::action('showLoginForm'))
    ->name('login')
    ->middleware('guest');

Route::post('/login')
    ->uses(LoginController::action('login'))
    ->name('login.attempt')
    ->middleware('guest');

Route::post('/logout')
    ->uses(LoginController::action('logout'))
    ->name('logout');

// Requires to be authenticated
Route::middleware('auth')->group(function () {
    App::setLocale('en'); // Try 'fr'

    // Dashboard
    Route::get('/dashboard')
        ->uses(DashboardController::action('index'))
        ->name('dashboard');
});

// Requires to be authenticated, to have confirmed a password
Route::middleware('auth', 'password.confirm')
    ->prefix('/admin')
    ->as('admin.')->group(function () {
        // Dashboard
        Route::get('/dashboard')
        ->uses(AdminDashboardController::action('index'))
        ->name('dashboard');
    });

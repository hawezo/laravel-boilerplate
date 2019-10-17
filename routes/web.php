<?php

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

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index');
})->name('index');

Route::get('/500', function () {
    throw new \Exception('An expected error occured');
});

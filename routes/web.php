<?php

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

Auth::routes();

Route::get('/', 'App\Http\Controllers\HomeController@index')->name('home');
Route::view('/welcome', 'welcome')->name('welcome');

// Route::get('/admin', 'AdminController@index')->name('admin')->middleware('can:isAdmin');
// Route::get('/modules', 'AdminController@modules')->middleware('can:isAdmin');
Route::middleware('can:isAdmin')->prefix('admin')->name('admin.')->group(function () {
    Route::get('#', function () {})->name('#');
    Route::get('/module', 'App\Http\Controllers\AdminController@module_list');
    Route::post('/module', 'App\Http\Controllers\AdminController@module_store');
    Route::get('/user', 'App\Http\Controllers\AdminController@user_list');
    Route::post('/user', 'App\Http\Controllers\AdminController@user_create');
    Route::post('/role', 'App\Http\Controllers\AdminController@role_create');
    Route::get('{any?}', function ($any = null) {
        return view('home');
    })->where('any', '.*');
});

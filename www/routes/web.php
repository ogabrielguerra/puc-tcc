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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes(['register' => false]);

Route::get('/home', 'HomeController@index')->name('home');

//Route::get('dashboard', 'App\Http\Controllers\UserController@dashboard')->middleware('auth');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/pass-grant-auth', function(){
    $http = new GuzzleHttp\Client;

    $response = $http->post('http://localhost/public/oauth/token',[
        'form_params' => [
            'grant_type' => 'password',
            'client_id' => 3,
            'client_secret' => '3cIiPSBkeRnbPgoXuzDRqio4EOXLYwbrjMAJARPW',
            'username' => 'gab@gab.com',
            'password' => 'admin123',
            'scope' => '*',
            'redirect_uri' => 'http://localhost',
        ],
    ]);

    $tokens = json_decode((string) $response->getBody(), true);
    print_r($tokens);
});
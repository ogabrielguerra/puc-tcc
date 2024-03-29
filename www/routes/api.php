<?php

use Illuminate\Http\Request;

// BUSINESS
Route::group(['prefix'=>'business/', 'namespace'=>'Api', 'middleware'=>['cors']],
    function(){
        Route::get('/', 'BusinessController@index')->name('business');
        Route::get('/highlight', 'BusinessController@highlights')->name('businessHighlights');
        Route::get('/{id}', 'BusinessController@show')->name('businessDetail');
        Route::get('/state/{id}', 'BusinessController@byState')->name('businessByState');
        Route::get('/city/{id}', 'BusinessController@byCity')->name('businessByCity');
        Route::get('/category/{id}', 'BusinessController@byCategory')->name('businessByCategory');
        Route::post('/add', 'BusinessController@add')->name('businessAdd')->middleware('auth');
        Route::get('/user/{id}', 'BusinessController@byUser')->name('businessByUser')->middleware('auth');
        Route::delete('/delete', 'BusinessController@delete')->name('businessDelete')->middleware('auth');
        Route::put('/update', 'BusinessController@update')->name('businessUpdate')->middleware('auth', 'permissions');
    });

// STATS
Route::group(['prefix'=>'stats/', 'namespace'=>'Api', 'middleware'=>['cors']],
    function() {
        Route::get('/category', 'StatsController@byCategory')->name('statsByCategory');
        Route::get('/city', 'StatsController@byCity')->name('statsByCity');
        Route::get('/state', 'StatsController@byState')->name('statsByState');
        Route::get('/favorite', 'StatsController@byFavorite')->name('statsByFavorites');
        Route::get('/register', 'StatsController@byRegisters')->name('statsByRegisters');
    });

// CATEGORY
Route::group(['prefix'=>'category/', 'namespace'=>'Api', 'middleware'=>['cors']],
    function() {
        Route::get('/', 'CategoryController@index')->name('category');
        Route::get('/{id}', 'CategoryController@show')->name('categoryShow');
        Route::delete('/delete', 'CategoryController@delete')->name('categoryDelete')->middleware('auth');
        Route::put('/update', 'CategoryController@update')->name('categoryUpdate')->middleware('auth');
        Route::post('/add', 'CategoryController@add')->name('categoryAdd')->middleware('auth');
    });

// FAVORITE
Route::group(['prefix'=>'favorites/', 'namespace'=>'Api', 'middleware'=>['cors', 'auth']],
    function(){
        Route::get('/{id}', 'FavoriteController@show')->name('favoritesShow');
        Route::post('/add', 'FavoriteController@add')->name('favoritesAdd');
        Route::delete('/delete', 'FavoriteController@delete')->name('favoritesDelete');
    });

// STATE
Route::group(['prefix'=>'state/', 'namespace'=>'Api', 'middleware'=>['cors']],
    function() {
        Route::get('/', 'StateController@index')->name('state');
        Route::get('/{id}', 'StateController@show')->name('stateShow');
        Route::post('/add', 'StateController@add')->name('stateAdd')->middleware('auth');
        Route::put('/update', 'StateController@update')->name('stateUpdate')->middleware('auth');
        Route::delete('/delete', 'StateController@delete')->name('stateDelete')->middleware('auth');
    });

// CITY
Route::group(['prefix'=>'city/', 'namespace'=>'Api', 'middleware'=>['cors']],
    function() {
        Route::get('/', 'CityController@index')->name('city');
        Route::get('/state/{id}', 'CityController@citiesByState')->name('citiesByState');
    });

// PDF
Route::group(['prefix'=>'pdf/', 'namespace'=>'Api', 'middleware'=>['cors']],
    function() {
        Route::get('state/{id}/{categoryId?}', 'PdfController@byState')->name('pdfByState');
        Route::get('city/{id}/{categoryId?}', 'PdfController@byCity')->name('pdfByCity');
    });

Route::group(['namespace'=>'Api', 'middleware'=>['cors']],
    function() {
        Route::post('/login/', 'AuthController@login')->name('login');
        Route::get('/oauth', 'AuthController@social')->name('category');
    });

Route::group(['prefix'=>'user', 'namespace'=>'Api', 'middleware'=>['cors']],
    function() {
        Route::get('/', 'UserController@index')->name('userList')->middleware('auth');
        Route::delete('/delete', 'UserController@delete')->name('userDelete')->middleware('auth');
        Route::put('/update', 'UserController@update')->name('userUpdate')->middleware('auth');
        Route::post('/add', 'AuthController@addUser')->name('userAdd');
        Route::get('/{id}', 'UserController@show')->name('userDetail')->middleware('auth');
    });

Route::group(['prefix'=>'auth', 'namespace'=>'Api', 'middleware'=>['cors', 'auth']],
    function() {
        Route::get('/getDataFromToken', 'UserController@getDataFromToken')->name('userListFoo');
        Route::post('/testCheckLogin', 'AuthController@checkLogin')->name('test');
    });

Route::group(['prefix'=>'role', 'namespace'=>'Api', 'middleware'=>['cors', 'auth', 'permissions']],
    function() {
        Route::get('/', 'RoleController@index')->name('roleIndex');
        Route::get('/{id}', 'RoleController@show')->name('roleShow');
        Route::post('/add', 'RoleController@add')->name('roleAdd');
        Route::delete('/delete', 'RoleController@delete')->name('roleDelete');
    });

Route::group(['prefix'=>'roleaction', 'namespace'=>'Api', 'middleware'=>['cors', 'auth', 'permissions']],
    function() {
        Route::get('/role/{id}', 'RoleActionController@byRoleId')->name('roleActionByRole');
    });


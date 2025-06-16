<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Request;
use App\Http\Controllers\PageController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\APIController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', [PageController::class, 'home']);
Route::get('/storepage_category/{category}', [PageController::class,'storepage_category']);
Route::get('/storepage_title/{title}', [PageController::class,'storepage_title']);
//Route::get('/storepage/{category?}/{title?}', [PageController::class,'storepage']);
Route::get('/item/{id}', [PageController::class,'item']);
Route::get('/help', [PageController::class,'help']);

Route::get('/get_storepage_items_category/{category}', [APIController::class,'get_storepage_items_by_category']);
Route::get('/get_storepage_items_title/{title}', [APIController::class,'get_storepage_items_by_title']);
Route::get('/get_item/{id}', [APIController::class,'get_item_by_id']);
Route::get('/search/{query}', [APIController::class,'search_items']);
Route::get('/get_currency_exchange/{old_currency}', [APIController::class,'get_currency_exchange']);
Route::post('/add_item_in_db', [APIController::class,'add_item_in_db']);
Route::get('/check_signup_email/{email}', [APIController::class,'check_signup_email']);

Route::get('/signup', [LoginController::class,'get_signup']);
Route::post('/signup', [LoginController::class,'post_signup']);
Route::get('/login', [LoginController::class,'get_login'])->name('login');
Route::post('/login', [LoginController::class,'post_login']);
Route::get('/logout', [LoginController::class,'logout']);

Route::get('/user/cart', [PageController::class, 'cart']);
Route::get('/user/get_cart', [UserController::class, 'get_cart']);
Route::post('/user/add_cart_item', [UserController::class, 'add_cart_item']);
Route::post('/user/delete_cart_item', [UserController::class, 'delete_cart_item']);
Route::get('/user/saved_items', [PageController::class, 'saved_items']);
Route::get('/user/get_saved_items', [UserController::class, 'get_saved_items']);
Route::post('/user/add_saved_item', [UserController::class, 'add_saved_item']);
Route::post('/user/delete_saved_item', [UserController::class, 'delete_saved_item']);
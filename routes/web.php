<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/api/books', [App\Http\Controllers\BookController::class, 'index']);
Route::get('/api/books/{id}', [App\Http\Controllers\BookController::class, 'show']);
Route::get('/api/categories', [App\Http\Controllers\CategoryController::class, 'index']);
Route::get('/api/search', [App\Http\Controllers\BookController::class, 'search']);

Route::get('/', function () {
    return view('welcome');
});
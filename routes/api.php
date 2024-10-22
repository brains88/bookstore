<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/books', [App\Http\Controllers\BookController::class, 'index']);
Route::get('/books/{id}', [App\Http\Controllers\BookController::class, 'show']);
Route::get('/categories', [App\Http\Controllers\CategoryController::class, 'index']);
Route::get('/search', [App\Http\Controllers\BookController::class, 'search']);
Route::get('/cart', [App\Http\Controllers\CartController::class, 'index']);
Route::post('/cart', [CartController::class, 'store']);
Route::put('/cart/{id}', [CartController::class, 'update']);
Route::delete('/cart/{id}', [CartController::class, 'destroy']);

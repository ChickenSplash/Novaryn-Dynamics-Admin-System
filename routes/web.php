<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [TaskController::class, 'dashboard'])->name('dashboard');
    Route::get('index', [TaskController::class, 'index'])->name('tasks.index');
    Route::patch('toggleStatus/{task}', [TaskController::class, 'toggleStatus'])->name('tasks.toggleStatus');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [TaskController::class, 'dashboard'])->name('dashboard');
    Route::get('task/index', [TaskController::class, 'index'])->name('tasks.index');
    Route::patch('task/toggleStatus/{task}', [TaskController::class, 'toggleStatus'])->name('tasks.toggleStatus');
    Route::get('task/create', [TaskController::class, 'create'])->name('tasks.create');
    Route::post('task/create', [TaskController::class, 'store'])->name('tasks.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

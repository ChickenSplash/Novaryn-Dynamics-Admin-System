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
    Route::get('task/edit/{task}', [TaskController::class, 'edit'])->name('tasks.edit');
    Route::put('task/edit/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('task/delete/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function dashboard(Request $request)
    {
        return Inertia::render('dashboard', [
            'tasks' => TaskResource::collection(
                Task::where('assigned_to', $request->user()->id)->get()
            ),
        ]);
    }

    public function index(Request $request)
    {
        return Inertia::render('tasks/index', [
            'tasks' => TaskResource::collection(
                Task::where('assigned_to', $request->user()->id)
                    ->where('status', 'In Progress')
                    ->orderBy('due_date', 'asc')
                    ->get()
            ),
        ]);
    }

    public function toggleStatus(Task $task)
    {
        $task->status = $task->status === 'In Progress' ? 'Completed' : 'In Progress';
        $task->save();

        return redirect()->back();
    }
 
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}

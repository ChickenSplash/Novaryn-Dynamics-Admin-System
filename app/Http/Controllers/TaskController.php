<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display Everything.
     */
    public function dashboard(Request $request)
    {
        return Inertia::render('dashboard', [
            'tasks' => TaskResource::collection(
                Task::where('assigned_to', $request->user()->id)->get()
            ),
        ]);
    }

    /**
     * Display a listing of the resource.
     */
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

    /**
     * Toggle the status of the specified resource.
     */
    public function toggleStatus(Request $request, Task $task)
    {
        if ($request->user()->cannot('update', $task)) {
            return back()->withErrors(['error' => 'You are not authorized to perform this action.']);
        }

        if ($task->status === 'In Progress') {
            $task->status = 'Completed';
            $task->save();
            return redirect()->back()->with('success', 'Task marked as complete.');
        } else {
            $task->status = 'In Progress';
            $task->save();
            return redirect()->back()->with('success', 'Task marked as in progress.');
        }
    }
 
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('tasks/create', [
            'users' => UserResource::collection(User::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:Low,Medium,High',
            'due_date' => 'required|date',
            'assigned_to' => 'required|exists:users,id',
        ]);

        $validated['created_by'] = $request->user()->id;

        Task::create($validated);

        return redirect()->route('tasks.index')->with('success', 'Task created successfully.');
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
        return Inertia::render('tasks/edit', [
            'users' => UserResource::collection(User::all()),
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        if ($request->user()->cannot('update', $task)) {
            return back()->withErrors(['error' => 'You are not authorized to perform this action.']);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:Low,Medium,High',
            'due_date' => 'required|date',
            'assigned_to' => 'required|exists:users,id',
        ]);

        $task->update($validated);

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if (request()->user()->cannot('delete', $task)) {
            return back()->withErrors(['error' => 'You are not authorized to perform this action.']);
        }

        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }
}

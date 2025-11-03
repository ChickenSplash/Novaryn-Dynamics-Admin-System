import { Task } from "@/types";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { destroy, edit, toggleStatus } from "@/routes/tasks";
import { DeleteConfirmation } from "./delete-confirmation";

export function TaskCard({ task }: { task: Task }) {
    function requestToggleStatus() {
        router.patch(toggleStatus(task.id).url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    function requestEditPage() {
        router.get(edit(task.id).url);
    };

    return (
        <li>
            <div className="flex flex-col overflow-hidden rounded-xl border mb-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 border-b p-4 bg-[#FAFAFA] dark:bg-[#171717]">
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">{task.id} - {task.title}</h2>
                    
                    <div className="flex items-center gap-2">
                        {task.status === 'Completed' && (
                            <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">Completed</span>
                        )}

                        {task.priority === 'High' && (
                            <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">High Priority</span>
                        )}
                        
                        {task.priority === 'Medium' && (
                            <span className="inline-flex items-center justify-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">Medium Priority</span>
                        )}
                        
                        {task.priority === 'Low' && (
                            <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">Low Priority</span>
                        )}
                    </div>

                </div>
                {/* Details Section */}
                <div className="grid grid-cols-1 gap-x-4 gap-y-2 border-b p-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1 py-2">
                        <p className="text-sm font-normal leading-normal">Creator</p>
                        <div className="flex items-center gap-2">
                            <div className="size-8 overflow-hidden rounded-full">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover bg-[#e7edf3]"></div>
                            </div>
                            <p className="font-medium leading-normal">{task.created_by.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 py-2">
                        <p className="text-sm font-normal leading-normal">Assignee</p>
                        <div className="flex items-center gap-2">
                            <div className="size-8 overflow-hidden rounded-full">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover bg-[#e7edf3]"></div>
                            </div>
                            <p className="font-medium leading-normal">{task.assigned_to.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 py-2">
                        <p className="text-sm font-normal leading-normal">Due Date</p>
                        <p className="font-medium leading-normal">{formatDate(task.due_date)}</p>
                    </div>
                    <div className="flex flex-col gap-1 py-2">
                        <p className="text-sm font-normal leading-normal">Date Created</p>
                        <p className="font-medium leading-normal">{formatDate(task.created_at)}</p>
                    </div>
                </div>
                {/* Body */}
                <div className="p-4">
                    <p className="text-base font-normal leading-relaxed">
                        {task.description}
                    </p>
                </div>
                {/* Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-3 border-t bg-slate-50/50 p-4 bg-[#FAFAFA] dark:bg-[#171717]">
                    <div className="flex flex-wrap justify-end gap-3">
                        <Button variant="secondary" size="sm" className="cursor-pointer" onClick={requestToggleStatus}>
                            {task.status === 'Completed' ? 'Reinstate Task' : 'Complete Task'}
                        </Button>
                        <Button variant="secondary" size="sm" className="cursor-pointer" onClick={requestEditPage}>
                            Manage Task
                        </Button>
                    </div>
                </div>
            </div>
        </li>
    );
}
import { Task } from "@/types";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { destroy, edit, toggleStatus } from "@/routes/tasks";
import { DeleteConfirmation } from "./delete-confirmation";

export function TaskCard({ task }: { task: Task }) {
    function requestToggleStatus() {
        router.patch(toggleStatus(task.id).url);
    };

    function requestEditPage() {
        router.get(edit(task.id).url);
    };

    function requestDeleteTask() {
        router.delete(destroy(task.id).url);
    }

    return (
        <li>
            {/* <div className="flex justify-between mb-4 pb-2 border-b">
                <h3 className="text-lg font-semibold">
                    {task.id} - {task.title}
                </h3>
                <p>{task.status}</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr_1fr] gap-4">
                <div className="xl:border-r xl:pr-4">
                    <p className="flex justify-between flex-wrap"><span>Creator:</span> <span>{task.created_by.name}</span></p>
                    <p className="flex justify-between flex-wrap"><span>Created:</span> <span>{formatDate(task.created_at)}</span></p>
                    <p className="flex justify-between flex-wrap"><span>Priority:</span> <span>{task.priority}</span></p>
                    <p className="flex justify-between flex-wrap"><span>Due:</span> <span>{formatDate(task.due_date)}</span></p>
                </div>
                <div>{task.description}</div>
                <div className="xl:border-l xl:pl-4">
                    <Button variant="outline" size="sm" className="cursor-pointer" onClick={requestToggleStatus}>
                        Complete Task
                    </Button>
                    <Button variant="outline" size="sm" className="cursor-pointer" onClick={requestEditPage}>
                        Manage Task
                    </Button>
                    <DeleteConfirmation onConfirm={requestDeleteTask} taskTitle={task.title}>
                        <Button variant="outline" size="sm" className="cursor-pointer">
                            Delete Task
                        </Button>
                    </DeleteConfirmation>
                </div>
            </div> */}
            
            <div className="flex flex-col overflow-hidden rounded-xl border mb-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 border-b p-4 dark:bg-[#171717]">
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-[#0d141b] dark:text-slate-50">{task.id} - {task.title}</h2>
                    <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">High Priority</span>
                </div>
                {/* Details Section */}
                <div className="grid grid-cols-1 gap-x-4 gap-y-2 border-b p-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1 py-2">
                        <p className="text-sm font-normal leading-normal text-[#4c739a] dark:text-slate-400">Creator</p>
                        <div className="flex items-center gap-2">
                            <div className="size-8 overflow-hidden rounded-full">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover bg-[#e7edf3] text-[#4c739a]"></div>
                            </div>
                            <p className="text-sm font-medium leading-normal text-[#0d141b] dark:text-slate-200">Alex Chen</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 py-2">
                        <p className="text-sm font-normal leading-normal text-[#4c739a] dark:text-slate-400">Due Date</p>
                        <p className="text-sm font-medium leading-normal text-[#0d141b] dark:text-slate-200">Nov 5, 2023</p>
                    </div>
                    <div className="flex flex-col gap-1 py-2">
                        <p className="text-sm font-normal leading-normal text-[#4c739a] dark:text-slate-400">Date Created</p>
                        <p className="text-sm font-medium leading-normal text-[#0d141b] dark:text-slate-200">Oct 26, 2023</p>
                    </div>
                    <div className="flex flex-col gap-1 py-2">
                        <p className="text-sm font-normal leading-normal text-[#4c739a] dark:text-slate-400">Assignees</p>
                        <div className="flex items-center">
                            <div className="-mr-3 size-8 overflow-visible">
                                <div className="aspect-square size-8 rounded-full border-2 border-white bg-[#e7edf3] bg-cover bg-center bg-no-repeat text-[#4c739a] dark:border-slate-900"></div>
                            </div>
                            <div className="-mr-3 size-8 overflow-visible">
                                <div className="aspect-square size-8 rounded-full border-2 border-white bg-[#e7edf3] bg-cover bg-center bg-no-repeat text-[#4c739a] dark:border-slate-900"></div>
                            </div>
                            <div className="-mr-3 size-8 overflow-visible">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-xs font-semibold text-slate-600 dark:border-slate-900 dark:bg-slate-700 dark:text-slate-300" data-alt="2 more assignees">+2</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Body */}
                <div className="p-4">
                    <p className="text-base font-normal leading-relaxed">
                        Compile all social media engagement data, analyze the results from the latest email campaign, and summarize the key findings into a presentation deck. The final report needs to be ready for the stakeholder meeting next Monday.
                    </p>
                </div>
                {/* Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-slate-50/50 p-4 dark:bg-[#171717]">
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-transparent px-4 py-2 text-sm font-bold leading-normal text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20">
                        <span className="truncate">Delete Task</span>
                    </button>
                    <div className="flex flex-wrap justify-end gap-3">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold leading-normal text-[#0d141b] transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600">
                            <span className="truncate">Manage Task</span>
                        </button>
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 py-2 text-sm font-bold leading-normal text-slate-50 transition-colors hover:bg-primary/90">
                            <span className="truncate">Complete Task</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
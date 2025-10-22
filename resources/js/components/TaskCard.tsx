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
        <li className="mb-4 p-4 border rounded-lg list-none">
            <div className="flex justify-between mb-4 pb-2 border-b">
                <h3 className="text-lg font-semibold">
                    {task.id} - {task.title}
                </h3>
                <p>{task.status}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4">
                <div className="md:border-r md:pr-4">
                    <p className="flex justify-between flex-wrap"><span>Creator:</span> <span>{task.created_by.name}</span></p>
                    <p className="flex justify-between flex-wrap"><span>Created:</span> <span>{formatDate(task.created_at)}</span></p>
                    <p className="flex justify-between flex-wrap"><span>Priority:</span> <span>{task.priority}</span></p>
                    <p className="flex justify-between flex-wrap"><span>Due:</span> <span>{formatDate(task.due_date)}</span></p>
                </div>
                <div>{task.description}</div>
                <div className="md:border-l md:pl-4">
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
            </div>
        </li>
    );
}
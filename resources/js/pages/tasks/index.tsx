import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { TaskResourceCollection, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { TaskCard } from '@/components/TaskCard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({tasks}: {tasks: TaskResourceCollection}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
                <ul>
                    {tasks.data.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}

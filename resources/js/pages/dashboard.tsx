import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { TaskResourceCollection, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import { TaskCard } from '@/components/TaskCard';
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import Search from '@/components/search';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({tasks}: {tasks: TaskResourceCollection}) {
    const { errors } = usePage().props;
    const [position, setPosition] = useState("bottom")

    console.log(errors);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="w-full sm:w-lg xl:w-4xl m-auto flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                    <Checkbox
                        id="toggle-2"
                        defaultChecked
                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                    <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                            Enable notifications
                        </p>
                    </div>
                </Label>
                <Search />
                <ul>
                    {tasks.data.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}

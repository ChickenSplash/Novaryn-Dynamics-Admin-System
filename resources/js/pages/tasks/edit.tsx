import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Task, TaskResource, UserResourceCollection, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { format, parse } from 'date-fns';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { update } from '@/routes/tasks';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar24 } from '@/components/calendar24';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function TaskUpdate({users, task} : {users: UserResourceCollection, task: TaskResource}) {
    const [date, setDate] = useState<Date | undefined>();
    const { post, setData, data, errors } = useForm({
        title: task.data.title,
        description: task.data.description ? task.data.description : '', // it doesnt like null
        priority: task.data.priority,
        due_date: task.data.due_date,
        assigned_to: String(task.data.assigned_to.id),
        _method: 'PUT',
    });

    // Parse the due_date string into a Date object and set it on component mount
    useEffect(() => {
        if (task.data.due_date) {
            const parsed = parse(task.data.due_date, 'yyyy-MM-dd HH:mm:ss', new Date());
            setDate(parsed);
        }
    }, [task.data.due_date]);

    const handleDateChange = (selectedDate?: Date) => {
        setDate(selectedDate);
        if (selectedDate) {
            setData('due_date', format(selectedDate, 'yyyy-MM-dd HH:mm:ss'));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(update(task.data.id).url);
                    }}
                >
                    {/* Row 1 — Title + Assign To */}
                    <div className="flex flex-col md:flex-row md:items-end md:gap-6 mb-4">
                        <div className="flex-1 mb-4 md:mb-0">
                            <Label htmlFor="title">Task Title</Label>
                            <Input
                                value={data.title}
                                id="title"
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-2 w-full"
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="assigned_to">Assign To</Label>
                            <Select value={data.assigned_to} onValueChange={(value) => setData('assigned_to', value)}>
                                <SelectTrigger id="assigned_to" className="w-full mt-2">
                                    <SelectValue placeholder="Select a user" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.data.map((user) => (
                                        <SelectItem key={user.id} value={String(user.id)}>
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                        <Label htmlFor="description">Task Description</Label>
                        <Textarea
                            value={data.description}
                            id="description"
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-2 w-full"
                        />
                    </div>

                    {/* Row 2 — Priority + Calendar */}
                    <div className="flex flex-col md:flex-row md:items-start md:gap-6 mt-4">
                        <div className="flex-1">
                            <Label>Priority</Label>
                            <RadioGroup
                                className="mt-2"
                                value={data.priority}
                                onValueChange={(value) => setData('priority', value)}
                            >
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="High" id="r1" />
                                    <Label htmlFor="r1">High</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="Medium" id="r2" />
                                    <Label htmlFor="r2">Medium</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="Low" id="r3" />
                                    <Label htmlFor="r3">Low</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="flex-1 mt-4 md:mt-0">
                            <div className="mt-2">
                                <Calendar24 date={date} setDate={handleDateChange} />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="mt-6">
                        Update Task
                    </Button>
                </form>
                {errors.title || errors.assigned_to || errors.due_date ? (
                    <Alert variant="destructive" className="mt-6">
                        <AlertTitle>Could not create task!</AlertTitle>
                        <AlertDescription>
                            {errors.title && <div>{errors.title}</div>}
                            {errors.assigned_to && <div>{errors.assigned_to}</div>}
                            {errors.due_date && <div>{errors.due_date}</div>}
                        </AlertDescription>
                    </Alert>
                ) : null}
            </div>
        </AppLayout>
    );
}

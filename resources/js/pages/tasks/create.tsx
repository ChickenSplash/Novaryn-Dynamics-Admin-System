import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { UserResourceCollection, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { store } from '@/routes/tasks';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar24 } from '@/components/calendar24';
import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({users} : {users: UserResourceCollection}) {
    const [date, setDate] = useState<Date | undefined>();
    const { post, setData, data, errors } = useForm({
        title: '',
        description: '',
        priority: 'Medium',
        due_date: '',
        assigned_to: '',
    });

    console.log(errors)

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
                    method="POST"
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(store().url);
                    }}
                >
                    <div>
                        <Label htmlFor='title'>Task Title</Label>
                        <Input 
                            id='title'
                            onChange={(e) => setData('title', e.target.value)}
                        />
                    </div>
                    <div className='mt-4'>
                        <Label htmlFor='description'>Task Description</Label>
                        <Textarea 
                            id='description'
                            onChange={(e) => setData('description', e.target.value)}
                        >
                        </Textarea>
                    </div>
                    <div className='mt-4'>
                        <RadioGroup 
                        className='mt-4'
                            defaultValue="Medium"
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
                    <div className='mt-4'>
                        <Calendar24 date={date} setDate={handleDateChange} />
                    </div>
                    <div className='mt-4'>
                        <select
                            onChange={(e) => setData('assigned_to', e.target.value)}
                        >
                            {users.data.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <Button type='submit' className='mt-4'>Create Task</Button>
                </form>
            </div>
        </AppLayout>
    );
}

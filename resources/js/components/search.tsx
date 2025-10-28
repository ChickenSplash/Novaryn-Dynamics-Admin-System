import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import { router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';

export default function Search() {
    const { filters }: any = usePage().props;

    console.log('Current filters:', filters);
    return (
        <>
            <Label htmlFor="search">Search</Label>
            <Input
                defaultValue={filters.search ?? ''}
                onChange={debounce((e) => {
                    router.get(
                    window.location.pathname, 
                    { search: e.target.value }, 
                    { 
                        preserveState: true, 
                        preserveScroll: true 
                    });
                }, 300)}
                id="search"
                className="mt-2 w-full"
            />
        </>
    )
}
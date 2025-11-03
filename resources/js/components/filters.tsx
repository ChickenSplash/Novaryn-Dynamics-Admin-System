import { dashboard } from '@/routes';
import { router, usePage } from '@inertiajs/react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';

export default function Filters() {
    const current = Object.fromEntries(new URLSearchParams(window.location.search))
    const { filters }: any = usePage().props;

    const handleToggle = (checked: boolean) => {
        applyFilter({
            show_completed: checked ? 1 : 0
        })
    }

    const handleSearch = (term: string) => {
        applyFilter({
            search: term
        })
    }

    const applyFilter = (newParams: {}) => {
        router.get(
            dashboard().url,
            {
                ...current,                // keep current query params
                ...newParams               // apply only the changed filter
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        )
    }

    return (
        <>
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                    id="toggle-2"
                    checked={filters.show_completed == 1}
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    onCheckedChange={handleToggle}
                />
                <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                        Show Completed Tasks
                    </p>
                </div>
            </Label>
            <div>
                <Label htmlFor="search">Search</Label>
                <Input
                    defaultValue={filters.search ?? ''}
                    onChange={debounce((e) => {
                        handleSearch(e.target.value);
                    }, 300)}
                    id="search"
                    className="mt-2 w-full"
                />
            </div>
        </>
    );
}
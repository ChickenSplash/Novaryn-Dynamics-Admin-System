import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { Toaster } from '@/components/ui/sonner';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type PropsWithChildren } from 'react';
import { toast } from 'sonner';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { flash, errors } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.warning) toast.warning(flash.warning);

        if (errors) {
            Object.values(errors).forEach((error) => {
                toast.error(error);
            });
        }
    }, [flash, errors]); // <– triggers useEffect when flash or errors change. Component loads -> flash and errors are checked -> toast shown if needed

    return (
        <>
            <AppShell variant="sidebar">
                <AppSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
            </AppShell>
            <Toaster position='top-center'/>
        </>
    );
}

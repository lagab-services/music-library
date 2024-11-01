import React from 'react';
import {Separator} from '@/components/ui/separator';
import ContentSidebar from '@/components/nav/content-sidebar';
import {NavLink} from '@/types/nav';
import {Bell, CircleAlert, MonitorCog, Palette, User, Wrench} from 'lucide-react';

interface SettingLayoutProps {
    children: React.ReactNode
}

const SettingsLayout = ({children}: SettingLayoutProps) => {
    const sidebarNavItems: NavLink[] = [
        {
            title: 'Profile',
            icon: <User size={18}/>,
            href: '/settings',
        },
        {
            title: 'Account',
            icon: <Wrench size={18}/>,
            href: '/settings/account',
        },
        {
            title: 'Appearance',
            icon: <Palette size={18}/>,
            href: '/settings/appearance',
        },
        {
            title: 'Notifications',
            icon: <Bell size={18}/>,
            href: '/settings/notifications',
        },
        {
            title: 'Display',
            icon: <MonitorCog size={18}/>,
            href: '/settings/display',
        },
        {
            title: 'Error Example',
            icon: <CircleAlert size={18}/>,
            href: '/settings/error-example',
        },
    ]
    return (
        <div className='p-4 md:overflow-hidden md:p-6 space-y-5 flex-1 flex flex-col'>
            <div className='space-y-0.5'>
                <h2 className='text-2xl font-bold tracking-tight'>
                    Settings
                </h2>
                <p className='text-muted-foreground'>
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className='my-4 lg:my-6'/>
            <div className='flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0'>
                <aside className='top-0 lg:sticky lg:w-1/5'>
                    <ContentSidebar links={sidebarNavItems}/>
                </aside>
                <div className='flex w-full p-1 pr-4 md:overflow-y-hidden'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
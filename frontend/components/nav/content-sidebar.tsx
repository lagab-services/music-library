'use client'
import React, {useState} from 'react';
import {NavLink} from '@/types/nav';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {cn} from '@/lib/utils';
import Link from 'next/link';
import {buttonVariants} from '@/components/ui/button';
import {usePathname, useRouter} from 'next/navigation';

interface ContentSidebarProps extends React.HTMLAttributes<HTMLElement> {
    links: NavLink[]
}

const ContentSidebar = ({
                            className,
                            links,
                            ...props
                        }: ContentSidebarProps) => {

    const router = useRouter();
    const pathname = usePathname();
    const [val, setVal] = useState(pathname ?? '/')

    // Gestion de la redirection
    const handleSelect = (href: string) => {
        router.push(href);
    };
    return (
        <>
            <div className='p-1 md:hidden'>
                <Select value={val} onValueChange={handleSelect}>
                    <SelectTrigger className='h-12 sm:w-48'>
                        <SelectValue placeholder='Theme'/>
                    </SelectTrigger>
                    <SelectContent>
                        {links.map((item) => (
                            <SelectItem key={item.href} value={item.href}>
                                <div className='flex gap-x-4 px-2 py-1'>
                                    <span className='scale-125'>{item.icon}</span>
                                    <span className='text-md'>{item.title}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className='hidden w-full overflow-x-auto bg-background px-1 py-2 md:block'>
                <nav
                    className={cn(
                        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
                        className
                    )}
                    {...props}
                >
                    {links.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                buttonVariants({variant: 'ghost'}),
                                pathname === item.href
                                    ? 'bg-muted hover:bg-muted'
                                    : 'hover:bg-transparent hover:underline',
                                'justify-start'
                            )}
                        >
                            <span className='mr-2'>{item.icon}</span>
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default ContentSidebar;
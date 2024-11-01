import React from 'react';
import {cn} from '@/lib/utils';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import Link from 'next/link';
import {Button, buttonVariants} from '@/components/ui/button';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@radix-ui/react-collapsible';
import {ChevronDown} from 'lucide-react';
import {SideLink} from '@/types/nav';
import useCheckActiveNav from '@/hooks/use-check-active-nav';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
    isCollapsed: boolean
    links: SideLink[]
}

export interface NavLinkProps extends SideLink {
    subLink?: boolean
}


const SidebarNav = ({
                        links,
                        isCollapsed,
                        className
                    }: NavProps) => {

    const renderLink = ({sub, ...rest}: SideLink) => {
        const key = `${rest.title}-${rest.href}`
        if (isCollapsed && sub)
            return (
                <NavLinkIconDropdown
                    {...rest}
                    sub={sub}
                    key={key}
                />
            )

        if (isCollapsed)
            return <NavLinkIcon {...rest} key={key}/>

        if (sub)
            return (
                <NavLinkDropdown {...rest} sub={sub} key={key}/>
            )

        return <NavLink {...rest} key={key}/>
    }
    return (
        <div
            data-collapsed={isCollapsed}
            className={cn(
                'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
                className
            )}
        >
            <TooltipProvider delayDuration={0}>
                <nav className='grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
                    {links.map(renderLink)}
                </nav>
            </TooltipProvider>
        </div>
    );
};


export const NavLink = ({
                            title,
                            icon,
                            label,
                            href,
                            subLink = false,
                        }: NavLinkProps) => {
    const {checkActiveNav} = useCheckActiveNav()
    return (
        <Link
            href={href}
            className={cn(
                buttonVariants({
                    variant: checkActiveNav(href) ? 'secondary' : 'ghost',
                    size: 'sm',
                }),
                'h-12 justify-start text-wrap rounded-none px-6 text-xs',
                checkActiveNav(href) && 'border-r border-r-slate-500',
                subLink && 'h-10 w-full px-2 pl-5'
            )}
            aria-current={checkActiveNav(href) ? 'page' : undefined}
        >
            <div className='mr-2'>{icon}</div>
            {title}
            {label && (
                <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>
                    {label}
                </div>
            )}
        </Link>
    );
};
const NavLinkDropdown = ({title, icon, label, sub}: NavLinkProps) => {
    const {checkActiveNav} = useCheckActiveNav()

    /* Open collapsible by default
     * if one of child element is active */
    const isChildActive = !!sub?.find((s) => checkActiveNav(s.href))

    return (
        <Collapsible defaultOpen={isChildActive}>
            <CollapsibleTrigger
                className={cn(
                    buttonVariants({variant: 'ghost', size: 'sm'}),
                    'group h-12 w-full justify-start rounded-none px-6 text-xs'
                )}
            >
                <div className='mr-2'>{icon}</div>
                {title}
                {label && (
                    <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>
                        {label}
                    </div>
                )}
                <span
                    className={cn(
                        'ml-auto transition-all group-data-[state="open"]:-rotate-180'
                    )}
                >
          <ChevronDown/>
        </span>
            </CollapsibleTrigger>
            <CollapsibleContent className='collapsibleDropdown' asChild>
                <ul>
                    {sub!.map((sublink) => (
                        <li key={sublink.title} className='my-1 ml-0'>
                            <NavLink {...sublink} subLink/>
                        </li>
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
};
export const NavLinkIcon = ({title, icon, label, href}: NavLinkProps) => {
    const {checkActiveNav} = useCheckActiveNav()
    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={cn(
                        buttonVariants({
                            variant: checkActiveNav(href) ? 'secondary' : 'ghost',
                            size: 'icon',
                        }),
                        'h-12 w-12'
                    )}
                >
                    {icon}
                    <span className='sr-only'>{title}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side='right' className='flex items-center gap-4'>
                {title}
                {label && (
                    <span className='ml-auto text-muted-foreground'>{label}</span>
                )}
            </TooltipContent>
        </Tooltip>
    );
};
const NavLinkIconDropdown = ({title, icon, label, sub}: NavLinkProps) => {
    const {checkActiveNav} = useCheckActiveNav()

    /* Open collapsible by default
     * if one of child element is active */
    const isChildActive = !!sub?.find((s) => checkActiveNav(s.href))

    return (
        <DropdownMenu>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={isChildActive ? 'secondary' : 'ghost'}
                            size='icon'
                            className='h-12 w-12'
                        >
                            {icon}
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side='right' className='flex items-center gap-4'>
                    {title}{' '}
                    {label && (
                        <span className='ml-auto text-muted-foreground'>{label}</span>
                    )}
                    <ChevronDown
                        size={18}
                        className='-rotate-90 text-muted-foreground'
                    />
                </TooltipContent>
            </Tooltip>
            <DropdownMenuContent side='right' align='start' sideOffset={4}>
                <DropdownMenuLabel>
                    {title} {label ? `(${label})` : ''}
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {sub!.map(({title, icon, label, href}) => (
                    <DropdownMenuItem key={`${title}-${href}`} asChild>
                        <Link
                            href={href}
                            className={`${checkActiveNav(href) ? 'bg-secondary' : ''}`}
                        >
                            {icon} <span className='ml-2 max-w-52 text-wrap'>{title}</span>
                            {label && <span className='ml-auto text-xs'>{label}</span>}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default SidebarNav;
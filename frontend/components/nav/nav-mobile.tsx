import React from 'react';
import {Sheet, SheetContent, SheetHeader, SheetTrigger} from '@/components/ui/sheet';
import {Menu} from 'lucide-react';
import {SideLink} from '@/types/nav';
import SidebarNav from '@/components/nav/sidebar-nav';

interface NavMobileProps extends React.HTMLAttributes<HTMLDivElement> {
    links: SideLink[]
}

const NavMobile = ({
                       links,
                       className,
                   }: NavMobileProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button data-collapse-toggle="navbar-multi-level" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-multi-level" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <Menu size={24}/>
                </button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>

                </SheetHeader>
                <SidebarNav
                    id='sidebar-mobile'
                    className={`-mx-5`}
                    closeNav={() => {
                    }}
                    isCollapsed={false}
                    links={links}
                />
            </SheetContent>
        </Sheet>
    );
};

export default NavMobile;
import React, {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {BadgePercent, ChevronsLeft} from 'lucide-react';
import {cn} from '@/lib/utils';
import SidebarNav from '@/components/nav/sidebar-nav';
import UserAvatar from '@/components/nav/user-avatar';
import OrgSwitcher from '@/components/nav/org-switcher';
import NavMobile from '@/components/nav/nav-mobile';
import {useMediaQuery} from '@/hooks/use-media-query';
import {sidelinks} from '@/components/nav/menu-config';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({
                     className,
                     isCollapsed,
                     setIsCollapsed
                 }: SidebarProps) => {
    const [navOpened, setNavOpened] = useState(false)
    useEffect(() => {
        if (navOpened) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [navOpened])

    const isMobile = !useMediaQuery('md');


    return (
        <aside
            className={cn(
                `flex flex-col fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh  ${isCollapsed ? 'md:w-14' : 'md:w-56'}`,
                className
            )}
        >

            {isMobile ?
                <div className=" items-center gap-4 bg-background p-4 flex-none sticky top-0 z-50 flex justify-between px-4 py-3 md:px-4">
                    <a className="py-3 mx-auto flex-none overflow-hidden md:w-auto" href="/">
                        <BadgePercent className="inline-block mr-2"/>
                        <span className="inline-block font-semibold text-green-900">Admin</span>
                    </a>
                    {/* Toggle Button in mobile */}
                    <NavMobile links={sidelinks}/>
                </div>
                :
                <>
                    <div className="grid gap-1 mx-auto my-2">
                        <a className="py-3 mx-auto flex-none w-[2.0625rem] overflow-hidden md:w-auto" href="/">
                            {!isCollapsed ?
                                <>
                                    <BadgePercent className="inline-block mr-2"/>
                                    <span className="inline-block font-semibold text-green-900">Admin</span>
                                </>
                                :
                                <BadgePercent/>
                            }

                        </a>
                        {!isCollapsed &&
                            <OrgSwitcher/>
                        }
                    </div>

                    {/* Navigation links */}
                    <SidebarNav
                        id='sidebar-menu'
                        className={`z-40 h-full  overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
                        isCollapsed={isCollapsed}
                        links={sidelinks}
                    />
                    <div>
                        <div className="grid gap-1 my-2">
                            {!isCollapsed ?
                                <UserAvatar className="justify-start space-x-1 gap-2.5 flex px-5 py-2" showUserName={true} showMail={true}/>
                                :
                                <UserAvatar className="inline-flex items-center justify-center h-14 w-14" showUserName={false} showMail={false}/>
                            }
                        </div>
                        {/* Scrollbar width toggle button */}
                        <Button
                            onClick={() => setIsCollapsed((prev) => !prev)}
                            size='icon'
                            variant='outline'
                            className='absolute -right-3 top-4 z-50 hidden rounded-full md:inline-flex w-6 h-6'
                        >
                            <ChevronsLeft
                                className={`h-4 w-4 ${isCollapsed ? 'rotate-180' : ''}`}
                            />
                        </Button>
                    </div>
                </>}
        </aside>
    );
};

export default Sidebar;
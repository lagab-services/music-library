'use client'
import useIsCollapsed from "@/hooks/use-is-collapsed";
import Sidebar from '@/components/layout/sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
    const [isCollapsed, setIsCollapsed] = useIsCollapsed();
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
                <div className="relative">
                    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
                </div>
                <div className="flex w-0 flex-1 flex-col">
                    <main
                        id='content'
                        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-56'} h-full`}
                    >
                        {children}
                    </main>
                </div>
            </div>

        </div>

    );
};

export default DashboardLayout;
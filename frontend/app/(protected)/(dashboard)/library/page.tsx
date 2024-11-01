import React from 'react';
import ContentSection from '@/components/layout/content-section';
import {cn} from '@/lib/utils';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable';
import UserList from '@/app/(protected)/(dashboard)/dashboard/user-list';
import {searchParamsSchema} from '@/app/(protected)/(dashboard)/dashboard/_lib/validations';
import {fetchUsers} from '@/app/(protected)/(dashboard)/dashboard/_lib/queries';
import {SearchParams} from '@/types/table';
import ModeToggle from '@/components/layout/mode-toggle';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub, SidebarProvider
} from '@/components/ui/sidebar';
import {ChevronRight, Folder, ListMusic} from 'lucide-react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';

export interface LibraryPageProps {
    searchParams: SearchParams
}
const LibraryPage = ({searchParams}: LibraryPageProps) => {
    const search = searchParamsSchema.parse(searchParams)

    const usersPromise = fetchUsers(search);
    const data = {
        changes: [
            {
                file: "README.md",
                state: "M",
            },
            {
                file: "api/hello/route.ts",
                state: "U",
            },
            {
                file: "app/layout.tsx",
                state: "M",
            },
        ],
        tree: [
            [
                "app",
                [
                    "api",
                    ["hello", ["route.ts"]],
                    "page.tsx",
                    "layout.tsx",
                    ["blog", ["voici un nom de playlist long page.tsx"]],
                ],
            ],
            [
                "components",
                ["ui", "button.tsx", "card card card card.tsx"],
                "header.tsx",
                "footer.tsx",
            ],
            ["lib", ["util.ts"]],
            ["public", "favicon.ico", "vercel.svg"],
            ".eslintrc.json",
            ".gitignore",
            "next.config.js",
            "tailwind.config.js",
            "package.json",
            "README.md",
        ],
    }

    return (
        <>
            <div className="flex flex-col sm:gap-4 sm:py-4 px-6">
                <header
                    className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent ">
                    <ModeToggle/>
                </header>


            </div>
            <div className="p-6 space-y-5">
                <div className='mb-2 flex items-center justify-between space-y-2'>
                    <div className={cn(
                        ' py-4 md:overflow-hidden'
                    )}>
                        <h2 className='text-2xl font-bold tracking-tight'>dashboard page</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of your tasks for this month!
                        </p>
                    </div>
                </div>
                <ResizablePanelGroup direction="horizontal" className="min-h-[200px]">
                    <ResizablePanel defaultSize={15}>
                        <div className="flex h-full items-center justify-center py-2">
                            <SidebarProvider>
                            <SidebarGroup>
                                <SidebarGroupLabel>Files</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {data.tree.map((item, index) => (
                                            <Tree key={index} item={item} />
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                            </SidebarProvider>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={85}>
                        <div className="flex h-full items-center px-2">
                            <UserList usersPromise={usersPromise}/>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    );
};

const Tree = ({ item }: { item: string | any[] }) => {
    const [name, ...items] = Array.isArray(item) ? item : [item];

    if (!items.length) {
        return (
            <SidebarMenuButton
                isActive={name === "button.tsx"}
                className="data-[active=true]:bg-transparent"
            >
                <ListMusic />
                {name}
            </SidebarMenuButton>
        );
    }

    return (
        <SidebarMenuItem>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                defaultOpen={name === "components" || name === "ui"}
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ChevronRight className="transition-transform" />
                        <Folder />
                        {name}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.map((subItem, index) => (
                            <Tree key={index} item={subItem} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
};


export default LibraryPage;
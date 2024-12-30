import * as React from "react";
import {ChevronRight, Folder, ListMusic} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sample data
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
            ["ui", "button.tsx", "card card card card avec un titre tres long.tsx"],
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
};


export const AppSidebar = ({...props}: React.ComponentProps<typeof Sidebar>) => (
    <Sidebar {...props}>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Files</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {data.tree.map((item, index) => (
                            <Tree key={index} item={item}/>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarRail/>
    </Sidebar>
);


const Tree = ({item}: { item: string | any[] }) => {
    const [name, ...items] = Array.isArray(item) ? item : [item];

    if (!items.length) {
        return (
            <SidebarMenuButton
                isActive={name === "button.tsx"}
                className="data-[active=true]:bg-transparent"
            >
                <ListMusic/>
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
                        <ChevronRight className="transition-transform"/>
                        <Folder/>
                        {name}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.map((subItem, index) => (
                            <Tree key={index} item={subItem}/>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
};

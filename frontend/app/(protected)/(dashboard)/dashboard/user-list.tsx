'use client'
import React from 'react';
import {getColumns} from '@/app/(protected)/(dashboard)/dashboard/user-columns';
import {DataTableFilterField} from '@/types/table';
import {useDataTable} from '@/hooks/use-data-table';
import DataTable from '@/components/table/data-table';
import {SheetContent, SheetDescription, SheetHeader, SheetTitle} from '@/components/ui/sheet';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import DataTableToolBar from '@/components/table/data-table-toolbar';
import {useSheet} from '@/contexts/sheet-context';
import {fetchUsers} from '@/app/(protected)/(dashboard)/dashboard/_lib/queries';
import {User} from '@/app/(protected)/(dashboard)/dashboard/_lib/validations';
import {ColumnDef} from '@tanstack/react-table';


interface UsersListProps {
    usersPromise: ReturnType<typeof fetchUsers>
}

const UserList = ({usersPromise}: UsersListProps) => {

    const {data, pageCount} = React.use(usersPromise)
    const columns = React.useMemo<ColumnDef<User>[]>(() => getColumns(), [])


    const filterFields: DataTableFilterField<User>[] = [
        {
            label: "Email",
            value: "email",
            placeholder: "Filter email...",
        }
    ]

    const {table} = useDataTable({
        data,
        columns,
        pageCount,
        filterFields,
        enableAdvancedFilter: false,
        initialState: {
            // sorting: [{id: "createdAt", desc: true}],
            // columnPinning: {right: ["actions"]},
        },
        // For remembering the previous row selection on page change
        getRowId: (originalRow, index) => `${originalRow.id}`,
    });
    const {openSheet, closeSheet} = useSheet();

    return (
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable table={table} onRowClick={(row) => {

                openSheet(
                    <SheetContent className="md:w-1/2 md:max-w-full " overlay="bg-white/80 dark:bg-background/80">
                        <SheetHeader>
                            <SheetTitle>Contenu dynamique</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="py-4">
                            <Tabs defaultValue="account" className="relative mr-auto w-full">
                                <TabsList
                                    className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
                                    <TabsTrigger value="account" light={true}>Account</TabsTrigger>
                                    <TabsTrigger value="password" light={true}>Password</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account">
                                    <Card className="border-none shadow-none">
                                        <CardHeader>
                                            <CardTitle>Account</CardTitle>
                                            <CardDescription>
                                                Make changes to your account here. Click save when you're done.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            content
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="password">
                                    <Card className="border-none shadow-none">
                                        <CardHeader>
                                            <CardTitle>Password</CardTitle>
                                            <CardDescription>
                                                Change your password here. After saving, you'll be logged out.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            content 2
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </SheetContent>
                );
            }}>
                <DataTableToolBar table={table} filterFields={filterFields}>

                </DataTableToolBar>
            </DataTable>
        </div>
    );
};

export default UserList;
import {ColumnDef} from '@tanstack/react-table'
import {Checkbox} from '@/components/ui/checkbox'
import {DataTableColumnHeader} from "@/components/table/data-table-column-header";
import {User} from '@/app/(protected)/(dashboard)/dashboard/_lib/validations';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import React from 'react';
import {DataTableRowActions} from '@/app/(protected)/(dashboard)/dashboard/row-actions';


export const getColumns = (): ColumnDef<User>[] => {
    const getInitials = (firstName: string, lastName: string): string => {
        if (!firstName || !lastName) {
            throw new Error("Le nom et le prénom ne doivent pas être vides.");
        }

        const initalFirstName = firstName.charAt(0).toUpperCase();
        const initialLastName = lastName.charAt(0).toUpperCase();

        return `${initalFirstName}${initialLastName}`;
    };
    return [
        {
            id: 'select',
            header: ({table}) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label='Select all'
                    className='translate-y-[2px]'
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label='Select row'
                    className='translate-y-[2px]'
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },

        {
            accessorKey: 'name',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title='Name'/>
            ),
            cell: ({row}) => <div className='flex items-center space-x-4'>
                <Avatar className='h-7 w-7 inline-block'>
                    <AvatarFallback>{getInitials(row.original.firstname, row.original.lastname)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium leading-none">{row.original.firstname} {row.original.lastname}</p>
                    <p className="text-sm text-muted-foreground">{row.getValue('email')}</p>
                </div>

            </div>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'email',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title='Email'/>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'username',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title='Username'/>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: 'actions',
            cell: ({row}) => <DataTableRowActions row={row}/>,
        },

    ]
}
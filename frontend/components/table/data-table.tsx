"use client"
import {flexRender, type Table as TanstackTable} from '@tanstack/react-table'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import React from "react";
import {DataTablePagination} from "@/components/table/data-table-pagination";
import {cn} from '@/lib/utils';


interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
    table: TanstackTable<TData>
    onRowClick?: (row: TData) => void
}

const DataTable = <TData, >({
                                table,
                                children,
                                className,
                                onRowClick,
                                ...props
                            }: DataTableProps<TData>) => {

    return (
        <div className={cn('space-y-4 ', className)}>
            {children}
            <div className='rounded-md border bg-background'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    onClick={() => onRowClick?.(row.original)}
                                    className={onRowClick && "hover:bg-muted cursor-pointer"}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className='p-2'>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllColumns().length}
                                    className='h-24 text-center'
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table}/>
        </div>
    )

}
export default DataTable;
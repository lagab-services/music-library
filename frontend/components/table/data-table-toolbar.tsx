import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Table} from '@tanstack/react-table'
import {X} from "lucide-react";
import {DataTableViewOptions} from "@/components/table/data-table-view-options";
import {DataTableFilterField} from '@/types/table';
import {DataTableFacetedFilter} from '@/components/table/data-table-faceted-filter';
import {useMemo} from 'react';
import {cn} from '@/lib/utils';

interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
    table: Table<TData>
    filterFields?: DataTableFilterField<TData>[]
}


const DataTableToolBar = <TData, >({
                                       table,
                                       filterFields = [],
                                       children,
                                       className
                                   }: DataTableToolbarProps<TData>) => {

    const isFiltered = table.getState().columnFilters.length > 0

    // Memoize computation of searchableColumns and filterableColumns
    const {searchableColumns, filterableColumns} = useMemo(() => {
        return {
            searchableColumns: filterFields.filter((field) => !field.options),
            filterableColumns: filterFields.filter((field) => field.options),
        }
    }, [filterFields])


    return (
        <div className={cn(
            "flex items-center justify-between",
            className
        )}>
            <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
                {searchableColumns.length > 0 &&
                    searchableColumns.map(
                        (column) =>
                            table.getColumn(column.value ? String(column.value) : "") && (
                                <Input
                                    key={String(column.value)}
                                    placeholder={column.placeholder}
                                    value={
                                        (table
                                            .getColumn(String(column.value))
                                            ?.getFilterValue() as string) ?? ""
                                    }
                                    onChange={(event) =>
                                        table
                                            .getColumn(String(column.value))
                                            ?.setFilterValue(event.target.value)
                                    }
                                    className="h-8 w-40 lg:w-64"
                                />
                            )
                    )}
                {filterableColumns.length > 0 &&
                    filterableColumns.map(
                        (column) =>
                            table.getColumn(column.value ? String(column.value) : "") && (
                                <DataTableFacetedFilter
                                    key={String(column.value)}
                                    column={table.getColumn(
                                        column.value ? String(column.value) : ""
                                    )}
                                    title={column.label}
                                    options={column.options ?? []}
                                />
                            )
                    )}
                {isFiltered && (
                    <Button
                        variant='ghost'
                        onClick={() => table.resetColumnFilters()}
                        className='h-8 px-2 lg:px-3'
                    >
                        Reset
                        <X className='ml-2 h-4 w-4'/>
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                {children}
                <DataTableViewOptions table={table}/>
            </div>
        </div>
    )
}
export default DataTableToolBar
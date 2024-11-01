import {cn} from "@/lib/utils";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import React from 'react';
import UserList from '@/app/(protected)/(dashboard)/dashboard/user-list';
import {SearchParams} from '@/types/table';
import {fetchUsers} from '@/app/(protected)/(dashboard)/dashboard/_lib/queries';
import {searchParamsSchema} from '@/app/(protected)/(dashboard)/dashboard/_lib/validations';
import ModeToggle from '@/components/layout/mode-toggle';

export interface IndexPageProps {
    searchParams: SearchParams
}

const DashBoardPage = ({searchParams}: IndexPageProps) => {

    const search = searchParamsSchema.parse(searchParams)

    const usersPromise = fetchUsers(search);

    return (
        <>
            <div className="flex flex-col sm:gap-4 sm:py-4 px-6">
                <header
                    className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent ">
                    <Breadcrumb className="hidden2 md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Products</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>All Products</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="ml-auto flex items-center space-x-4">
                        <ModeToggle/>
                    </div>

                </header>
            </div>
            <div className="bg-gray-50 dark:bg-background  p-6 space-y-5">
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
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Revenue
                            </CardTitle>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                className='h-4 w-4 text-muted-foreground'
                            >
                                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'/>
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>$45,231.89</div>
                            <p className='text-xs text-muted-foreground'>
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Subscriptions
                            </CardTitle>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                className='h-4 w-4 text-muted-foreground'
                            >
                                <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'/>
                                <circle cx='9' cy='7' r='4'/>
                                <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'/>
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>+2350</div>
                            <p className='text-xs text-muted-foreground'>
                                +180.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                className='h-4 w-4 text-muted-foreground'
                            >
                                <rect width='20' height='14' x='2' y='5' rx='2'/>
                                <path d='M2 10h20'/>
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>+12,234</div>
                            <p className='text-xs text-muted-foreground'>
                                +19% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Active Now
                            </CardTitle>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                className='h-4 w-4 text-muted-foreground'
                            >
                                <path d='M22 12h-4l-3 9L9 3l-3 9H2'/>
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>+573</div>
                            <p className='text-xs text-muted-foreground'>
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                    <Card className='col-span-1 lg:col-span-4'>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className='pl-2'>
                            Overview
                        </CardContent>
                    </Card>
                    <Card className='col-span-1 lg:col-span-3'>
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>
                                You made 265 sales this month.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            RecentSales
                        </CardContent>
                    </Card>
                </div>
                <div className="md:overflow-hidden">

                </div>
                <div className="md:overflow-hidden">
                    <UserList usersPromise={usersPromise}/>
                </div>
            </div>

        </>
    )
}


export default DashBoardPage;
"use client"
import { FC, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useGetAllInstructorsQuery } from '@/redux/api/instructorApi/instructorApi';
import DataNotFound from '@/components/shared/DataNotFound';
import { IInstructor } from '@/types/instructor';
import { IUser } from '@/types/user';
import { useSearchParams } from 'next/navigation';

import TablePagination from '@/app/dashboard/components/shared/TablePagination';
import Loading from '@/components/shared/Loading';
import PendingInstructorActions from './PendingInstructorActions';
import TableSkeleton from '@/app/dashboard/components/shared/TableSkeleton';

const PendingInstructorsTable: FC = () => {
    const urlSearchParams = useSearchParams();
    const [page, setPage] = useState(urlSearchParams.get('page') || '1');
    const [limit, setLimit] = useState(urlSearchParams.get('limit') || '8');
    const [isSearched, setIsSearched] = useState(false);

    const { data, isLoading } = useGetAllInstructorsQuery(
        {
            status: "pending",
            searchKey: urlSearchParams.get('searchKey') || '',
            limit: limit,
            page: page
        });

    useEffect(() => {
        setPage(urlSearchParams.get('page') || '1');
        setLimit(urlSearchParams.get('limit') || '8');

        if (urlSearchParams.get('searchKey')?.length) {
            setIsSearched(true);
        } else {
            setIsSearched(false);
        }
    }, [urlSearchParams])

    if (isLoading) {
        return <TableSkeleton />
    }

    return (
        <div className='min-h-[calc(100vh-189px)] flex flex-col text-primary'>
            {
                data?.data.result.length ?
                    <div className='flex-1'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">No.</TableHead>
                                    <TableHead className=''>Name & Username</TableHead>
                                    <TableHead className=''>Email & Phone</TableHead>
                                    <TableHead className=''>Experience</TableHead>
                                    <TableHead className='text-center'>Hourly Rate</TableHead>
                                    <TableHead className='text-center'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.data.result.map((instructor: IInstructor, index: number) => {
                                        const user: IUser | undefined = typeof instructor.user !== 'string' ? instructor.user : undefined;

                                        return (
                                            <TableRow key={instructor._id}>
                                                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                                <TableCell className="font-medium">
                                                    <div className=''>
                                                        <h3>{user?.name?.fullName}</h3>
                                                        {user?.username && <span className="text-sm text-gray-500">{user?.username}</span>}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">{
                                                    <div>
                                                        <h3>{user?.email}</h3>
                                                        {user?.phone && <span className="text-sm text-gray-500">{user?.phone}</span>}
                                                    </div>
                                                }</TableCell>
                                                <TableCell className="font-medium">{instructor.experience}</TableCell>
                                                <TableCell className="font-medium text-center">${instructor.pricePerHour}</TableCell>
                                                <TableCell className="font-medium">
                                                    <div className='flex items-center justify-center gap-2'>
                                                        <PendingInstructorActions id={instructor._id || ""} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                    :
                    <div className='flex-1 flex items-center justify-center'>
                        <DataNotFound isSearched={urlSearchParams.get('searchKey')?.length ? true : false} dataName='Pending Instructors' />
                    </div>
            }
            <TablePagination meta={data?.data.meta} />
        </div>
    );
};

export default PendingInstructorsTable;
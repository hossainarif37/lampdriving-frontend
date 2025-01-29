"use client"
import { FC, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DataNotFound from '@/components/shared/DataNotFound';
import { useSearchParams } from 'next/navigation';
import TablePagination from '@/app/dashboard/components/shared/TablePagination';
import { useGetAllLearnersQuery } from '@/redux/api/learnerApi/learnerApi';
import { ILearner } from '@/types/learner';
import ManageLearnersActions from './ManageLearnersActions';
import TableSkeleton from '@/app/dashboard/components/shared/TableSkeleton';

const LearnersTable: FC = () => {
    const urlSearchParams = useSearchParams();
    const [page, setPage] = useState(urlSearchParams.get('page') || '1');
    const [limit, setLimit] = useState(urlSearchParams.get('limit') || '8');
    const [isSearched, setIsSearched] = useState(false);

    const { data, isLoading } = useGetAllLearnersQuery(
        {
            userStatus: urlSearchParams.get('userStatus') === "active" ? 'active' : urlSearchParams.get('userStatus') === "blocked" ? 'blocked' : "",
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
                                    <TableHead className='text-nowrap'>Name & Username</TableHead>
                                    <TableHead className='text-nowrap'>Email & Phone</TableHead>
                                    <TableHead className='text-nowrap text-center'>Total Bookings</TableHead>
                                    <TableHead className='text-center'>Status</TableHead>
                                    <TableHead className='text-center'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.data.result.map((learner: ILearner, index: number) => {
                                        const user = typeof learner.user !== 'string' ? learner.user : undefined;

                                        return (
                                            <TableRow key={learner._id}>
                                                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                                <TableCell className="font-medium">
                                                    <div className=''>
                                                        <h3>{user?.name?.fullName}</h3>
                                                        {user?.username && <span className="text-sm text-gray-500">{user?.username}</span>}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div>
                                                        <h3>{user?.email}</h3>
                                                        {user?.phone && <span className="text-sm text-gray-500">{user?.phone}</span>}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium text-center">{learner.bookings.length || 0}</TableCell>
                                                <TableCell className="font-medium text-center">
                                                    {user?.status === 'active' ? 'Active' : 'Blocked'}
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    <ManageLearnersActions id={learner._id} />
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
                        <DataNotFound isSearched={isSearched} dataName='Learners' />
                    </div>
            }
            <TablePagination meta={data?.data.meta} />
        </div>
    );
};

export default LearnersTable;
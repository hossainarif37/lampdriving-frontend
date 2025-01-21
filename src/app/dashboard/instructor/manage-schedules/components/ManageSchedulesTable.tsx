"use client"
import { FC, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DataNotFound from '@/components/shared/DataNotFound';
import { useSearchParams } from 'next/navigation';
import TablePagination from '@/app/dashboard/components/shared/TablePagination';
import TableSkeleton from '@/app/dashboard/components/shared/TableSkeleton';
import { useGetInstructorsSchedulesQuery } from '@/redux/api/scheduleApi/scheduleApi';
import { useAppSelector } from '@/redux/hook';
import { ISchedule } from '@/types/schedule';
import ManageSchedulesActions from './ManageSchedulesActions';
import { formatDate } from 'date-fns';


const ManageSchedulesTable: FC = () => {
    const urlSearchParams = useSearchParams();
    const [page, setPage] = useState(urlSearchParams.get('page') || '1');
    const [limit, setLimit] = useState(urlSearchParams.get('limit') || '8');
    const [isSearched, setIsSearched] = useState(false);
    const user = useAppSelector(state => state.authSlice.user);
    const { data, isLoading } = useGetInstructorsSchedulesQuery(
        {
            id: (typeof user?.instructor === "string" ? user?.instructor : "") || "",
            type: "lesson",
            status: "upcoming",
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
                                    <TableHead className="min-w-[100px] text-center">No.</TableHead>
                                    <TableHead className='min-w-[214px]'>Learner</TableHead>
                                    <TableHead className='min-w-[250px]'>Duration</TableHead>
                                    <TableHead className='min-w-[120px] text-center'>Pickup Address</TableHead>
                                    <TableHead className='min-w-[140px] text-center'>Drop-off Address</TableHead>
                                    <TableHead className='min-w-[205px] text-center'>Status</TableHead>
                                    <TableHead className='min-w-[100px] text-center'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.data.result.map((schedule: ISchedule, index: number) => {
                                        const learner = typeof schedule.learner !== 'string' ? typeof (schedule?.learner as any).user !== 'string' ? (schedule?.learner as any).user : undefined : undefined;

                                        return (
                                            <TableRow key={schedule._id}>
                                                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                                <TableCell className="font-medium">
                                                    <div className=''>
                                                        <h3>{learner?.name.fullName}</h3>
                                                        <span className="text-sm text-gray-500">{learner?.email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {
                                                        <>
                                                            <h3>{formatDate(new Date(schedule.date || '12/12/2023'), 'dd/MM/yyyy')} at {schedule.time[0]}</h3>
                                                            <p>Duration {schedule?.duration} Hours</p>
                                                        </>
                                                    }
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    <div className=''>
                                                        <h3>{schedule.pickupAddress.address}</h3>
                                                        <span className="text-sm text-gray-500">{schedule.pickupAddress.suburb}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    {
                                                        schedule.pickupAddress ?
                                                            <div className=''>
                                                                <h3>{schedule.pickupAddress?.address}</h3>
                                                                <span className="text-sm text-gray-500">{schedule.pickupAddress?.suburb}</span>
                                                            </div>
                                                            :
                                                            "N/A"
                                                    }
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    <ManageSchedulesActions id={schedule._id} />
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
                        <DataNotFound isSearched={isSearched} dataName='Upcoming schedules' />
                    </div>
            }
            <TablePagination meta={data?.data.meta} />
        </div>
    );
};

export default ManageSchedulesTable;
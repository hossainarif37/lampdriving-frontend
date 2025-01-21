"use client"
import { FC, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DataNotFound from '@/components/shared/DataNotFound';
import { useSearchParams } from 'next/navigation';
import TablePagination from '@/app/dashboard/components/shared/TablePagination';
import { useGetAllBookingsQuery } from '@/redux/api/bookingApi/bookingApi';
import { IBooking } from '@/types/booking';
import OngoingBookingActions from './OngoingBookingActions';
import { formatDate } from 'date-fns';
import TableSkeleton from '@/app/dashboard/components/shared/TableSkeleton';
import { ISchedule } from '@/types/schedule';

const OngoingBookingsTable: FC = () => {
    const urlSearchParams = useSearchParams();
    const [page, setPage] = useState(urlSearchParams.get('page') || '1');
    const [limit, setLimit] = useState(urlSearchParams.get('limit') || '8');
    const [isSearched, setIsSearched] = useState(false);

    const { data, isLoading } = useGetAllBookingsQuery(
        {
            status: "ongoing",
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
                data?.data?.result?.length ?
                    <div className='flex-1'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[100px] text-center">No.</TableHead>
                                    <TableHead className='min-w-[214px]'>Learner</TableHead>
                                    <TableHead className='min-w-[214px]'>Instructor</TableHead>
                                    <TableHead className='min-w-[250px]'>Payment</TableHead>
                                    <TableHead className='min-w-[120px] text-center'>Booking Hours</TableHead>
                                    <TableHead className='min-w-[140px] text-center'>Upcoming Schedule</TableHead>
                                    <TableHead className='min-w-[205px] text-center'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.data?.result?.map((booking: IBooking, index: number) => {
                                        const learner = typeof booking.learner !== 'string' ? typeof booking.learner.user !== 'string' ? booking.learner.user : undefined : undefined;
                                        const instructor = typeof booking.instructor !== 'string' ? typeof booking.instructor.user !== 'string' ? booking.instructor.user : undefined : undefined;
                                        // sort the schedules by date
                                        const schedules: ISchedule[] = typeof booking.schedules !== 'string' ? [...booking.schedules].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) : [];
                                        
                                        // find the first upcoming or rescheduled schedule
                                        const upcomingSchedule = schedules.find((schedule: ISchedule) => (schedule.status === 'upcoming' || schedule.status === 'rescheduled'));
                                        return (
                                            <TableRow key={booking._id}>
                                                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                                <TableCell className="font-medium">
                                                    <div className=''>
                                                        <h3>{learner?.name.fullName}</h3>
                                                        <span className="text-sm text-gray-500">{learner?.email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div className=''>
                                                        <h3>{instructor?.name.fullName}</h3>
                                                        <span className="text-sm text-gray-500">{instructor?.email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div>
                                                        <p>
                                                            ${(booking.price).toFixed(2)}
                                                        </p>
                                                        <p>
                                                            {(booking.payment as any).transactionId}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    <h3>{booking.bookingHours}</h3>
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    {
                                                        <>
                                                            <h3>{formatDate(new Date(upcomingSchedule?.date || '12/12/2023'), 'dd/MM/yyyy')} at {upcomingSchedule?.time[0]}</h3>
                                                            <p>Duration {upcomingSchedule?.duration} Hours</p>
                                                        </>
                                                    }
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    <OngoingBookingActions id={booking._id} />
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
                        <DataNotFound isSearched={isSearched} dataName='Ongoing Bookings' />
                    </div>
            }
            <TablePagination meta={data?.data.meta} />
        </div>
    );
};

export default OngoingBookingsTable;
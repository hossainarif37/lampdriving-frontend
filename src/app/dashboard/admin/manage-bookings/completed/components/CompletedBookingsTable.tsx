"use client"
import { FC, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DataNotFound from '@/components/shared/DataNotFound';
import { useSearchParams } from 'next/navigation';
import TablePagination from '@/app/dashboard/components/shared/TablePagination';
import Loading from '@/components/shared/Loading';
import { useGetAllBookingsQuery } from '@/redux/api/bookingApi/bookingApi';
import { IBooking } from '@/types/booking';
import CompletedBookingActions from './CompletedBookingActions';
import TableSkeleton from '@/app/dashboard/components/shared/TableSkeleton';

const CompletedBookingsTable: FC = () => {
    const urlSearchParams = useSearchParams();
    const [page, setPage] = useState(urlSearchParams?.get('page') || '1');
    const [limit, setLimit] = useState(urlSearchParams?.get('limit') || '8');
    const [isSearched, setIsSearched] = useState(false);

    const { data, isLoading } = useGetAllBookingsQuery(
        {
            status: "completed",
            searchKey: urlSearchParams?.get('searchKey') || '',
            limit: limit,
            page: page
        });

    useEffect(() => {
        setPage(urlSearchParams?.get('page') || '1');
        setLimit(urlSearchParams?.get('limit') || '8');

        if (urlSearchParams?.get('searchKey')?.length) {
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
                                    <TableHead className=''>Learner</TableHead>
                                    <TableHead className=''>Instructor</TableHead>
                                    <TableHead className=''>Payment</TableHead>
                                    <TableHead className='text-center'>Rating</TableHead>
                                    <TableHead className='text-nowrap text-center'>Booking Hours</TableHead>
                                    <TableHead className='text-center'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.data.result.map((booking: IBooking, index: number) => {
                                        const learner = typeof booking.learner !== 'string' ? typeof booking.learner.user !== 'string' ? booking.learner.user : undefined : undefined;
                                        const instructor = typeof booking.instructor !== 'string' ? typeof booking.instructor.user !== 'string' ? booking.instructor.user : undefined : undefined;

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
                                                            ${(booking.price).paidAmount.toFixed(2)}
                                                        </p>
                                                        <p>
                                                            {(booking.payment as any).transactionId}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    <h3>{booking.review?.rating}</h3>
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    <h3>{booking.bookingHours}</h3>
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    <CompletedBookingActions id={booking._id} />
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
                        <DataNotFound isSearched={isSearched} dataName='Completed Bookings' />
                    </div>
            }
            <TablePagination meta={data?.data.meta} />
        </div>
    );
};

export default CompletedBookingsTable;
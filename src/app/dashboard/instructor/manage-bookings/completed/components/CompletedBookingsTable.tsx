"use client"
import { FC, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DataNotFound from '@/components/shared/DataNotFound';
import { useSearchParams } from 'next/navigation';
import TablePagination from '@/app/dashboard/components/shared/TablePagination';
import Loading from '@/components/shared/Loading';
import { useGetMyBookingsQuery } from '@/redux/api/bookingApi/bookingApi';
import { IBooking } from '@/types/booking';
import CompletedBookingActions from './CompletedBookingActions';

const CompletedBookingsTable: FC = () => {
    const urlSearchParams = useSearchParams();
    const [page, setPage] = useState(urlSearchParams.get('page') || '1');
    const [limit, setLimit] = useState(urlSearchParams.get('limit') || '8');
    const [isSearched, setIsSearched] = useState(false);

    const { data, isLoading } = useGetMyBookingsQuery(
        {
            status: "completed",
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
        return <Loading />
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
                                    <TableHead className='min-w-[214px]'>Instructor</TableHead>
                                    <TableHead className='min-w-[250px]'>Transaction</TableHead>
                                    <TableHead className='min-w-[140px]'>Price</TableHead>
                                    <TableHead className='min-w-[120px] text-center'>Booking Hours</TableHead>
                                    <TableHead className='min-w-[140px] text-center'>Status</TableHead>
                                    <TableHead className='min-w-[205px] text-center'>Actions</TableHead>
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
                                                <TableCell className="font-medium">{(booking.payment as any).transactionId}</TableCell>
                                                <TableCell className="font-medium">${booking.price}</TableCell>
                                                <TableCell className="font-medium text-center">
                                                    <h3>{booking.bookingHours}</h3>
                                                </TableCell>
                                                <TableCell className="font-medium text-center">
                                                    {booking.status === "completed" ? "Completed" : booking.status === "accepted" ? "Accepted" : booking.status === "pending" ? "Pending" : "Rejected"}
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
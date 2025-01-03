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
import { Button } from '@/components/ui/button';
import { UserRoundSearch } from 'lucide-react';
import TablePagination from '@/app/dashboard/components/shared/TablePagination';
import Loading from '@/components/shared/Loading';
import UpdateInstructorStatus from './UpdateInstructorStatus';

const PendingInstructorsTable: FC = () => {
    const urlSearchParams = useSearchParams();
    const [page, setPage] = useState(urlSearchParams.get('page') || '1');
    const [limit, setLimit] = useState(urlSearchParams.get('limit') || '8');

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
    }, [urlSearchParams])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='min-h-[calc(100vh-189px)] flex flex-col text-secondary'>
            {
                data?.data.result.length ?
                    <div className='flex-1'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="min-w-[100px] text-center">No.</TableHead>
                                    <TableHead className='min-w-[214px]'>Name & Username</TableHead>
                                    <TableHead className='min-w-[280px]'>Email & Phone</TableHead>
                                    <TableHead className='min-w-[140px]'>Experience</TableHead>
                                    <TableHead className='min-w-[250px]'>Vehicle</TableHead>
                                    <TableHead className='min-w-[120px] text-center'>Hourly Rate</TableHead>
                                    <TableHead className='min-w-[140px] text-center'>Status</TableHead>
                                    <TableHead className='min-w-[205px] text-center'>Actions</TableHead>
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
                                                <TableCell className="font-medium">
                                                    <div>
                                                        <h3>{instructor.vehicle.name} - <span className='text-gray-500'>{instructor.vehicle.model}</span></h3>
                                                        <h3>{instructor.vehicle.rating}</h3>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium text-center">${instructor.pricePerHour}</TableCell>
                                                <TableCell className="font-medium text-center">
                                                    {instructor.status === "verified" ? "Verified" : instructor.status === "pending" ? "Pending" : "Rejected"}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    <div className='flex items-center justify-center gap-2'>
                                                        <Button
                                                            title='View Instructor'
                                                            size={"icon"}>
                                                            <UserRoundSearch />
                                                        </Button>
                                                        <UpdateInstructorStatus status='verify' id={instructor._id || ""} />
                                                        <UpdateInstructorStatus status='reject' id={instructor._id || ""} />
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
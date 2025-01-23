import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from 'react';
import TablePagination from './TablePagination';


interface ITableSkeletonProps {
    rows?: number
}

const TableSkeleton: FC<ITableSkeletonProps> = ({ rows }) => {
    return (
        <div className='min-h-[calc(100vh-189px)] flex flex-col text-primary'>
            <div className='flex-1'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[100px] text-center">
                                <Skeleton className="w-12 h-6 mx-auto" />
                            </TableHead>
                            <TableHead className='min-w-[214px]'>
                                <Skeleton className="w-20 h-6" />
                            </TableHead>
                            <TableHead className='min-w-[214px]'>
                                <Skeleton className="w-24 h-6" />
                            </TableHead>
                            <TableHead className='min-w-[250px]'>
                                <Skeleton className="w-20 h-6" />
                            </TableHead>
                            <TableHead className='min-w-[120px] text-center'>
                                <Skeleton className="w-28 h-6 mx-auto" />
                            </TableHead>
                            <TableHead className='min-w-[140px] text-center'>
                                <Skeleton className="w-32 h-6 mx-auto" />
                            </TableHead>
                            <TableHead className='min-w-[205px] text-center'>
                                <Skeleton className="w-20 h-6 mx-auto" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(rows || 7)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium text-center">
                                    <Skeleton className="w-6 h-6 mx-auto" />
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-2">
                                        <Skeleton className="w-4/5 h-5" />
                                        <Skeleton className="w-3/5 h-4" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-2">
                                        <Skeleton className="w-4/5 h-5" />
                                        <Skeleton className="w-3/5 h-4" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-2">
                                        <Skeleton className="w-24 h-5" />
                                        <Skeleton className="w-32 h-4" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className="w-16 h-6 mx-auto" />
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-2">
                                        <Skeleton className="w-32 h-5 mx-auto" />
                                        <Skeleton className="w-24 h-4 mx-auto" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center gap-2">
                                        <Skeleton className="size-8" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <TablePagination meta={undefined} />
        </div>
    );
};

export default TableSkeleton;
"use client"

import { useGetAllTransactionHistoryQuery, useGetTransactionHistoryQuery } from '@/redux/api/transactionApi/transactionApi';
import { FC } from 'react';
import DataNotFound from '@/components/shared/DataNotFound';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import TablePagination from '@/app/dashboard/components/shared/TablePagination';
import TableSkeleton from '@/app/dashboard/components/shared/TableSkeleton';

const TransactionHistoryTable: FC = () => {
    const { data, isLoading } = useGetAllTransactionHistoryQuery(undefined);

    if (isLoading) {
        return <TableSkeleton />
    }

    if (!data?.data.result.length) {
        return <DataNotFound dataName="Transaction History" />
    }

    return (
        <div className='min-h-[calc(100vh-189px)] flex flex-col text-primary'>
            <div className='flex-1'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[100px] text-center">No.</TableHead>
                            <TableHead className='min-w-[214px]'>Transaction ID</TableHead>
                            <TableHead className='min-w-[214px]'>Method</TableHead>
                            <TableHead className='min-w-[120px] text-center'>Amount</TableHead>
                            <TableHead className='min-w-[140px] text-center'>Type</TableHead>
                            <TableHead className='min-w-[140px] text-center'>Status</TableHead>
                            <TableHead className='min-w-[205px] text-center'>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.data.result.map((transaction: any, index: number) => (
                            <TableRow key={transaction._id}>
                                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                <TableCell className="font-medium">{transaction.transactionId}</TableCell>
                                <TableCell className="font-medium">{transaction.method}</TableCell>
                                <TableCell className="font-medium text-center">${transaction.amount.toFixed(2)}</TableCell>
                                <TableCell className="font-medium text-center">{transaction.type}</TableCell>
                                <TableCell className="font-medium text-center">{transaction.status}</TableCell>
                                <TableCell className="font-medium text-center">{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <TablePagination meta={data.data.meta} />
        </div>
    );
};

export default TransactionHistoryTable;
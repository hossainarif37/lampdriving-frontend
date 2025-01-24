"use client"

import React from 'react';
import { useGetTransactionHistoryQuery } from '@/redux/api/transactionApi/transactionApi';
import Loading from '@/components/shared/Loading';
import DataNotFound from '@/components/shared/DataNotFound';
import { ClipboardList } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const TransactionHistoryPage: React.FC = () => {
    const { data, isLoading } = useGetTransactionHistoryQuery(undefined);

    if (isLoading) {
        return <Loading />;
    }

    if (data?.data?.result?.length === 0) {
        return <DataNotFound dataName="Transaction History" />;
    }

    const transactions = data?.data?.result || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <ClipboardList className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction: any) => (
                            <TableRow key={transaction._id}>
                                <TableCell className="font-medium">
                                    {transaction.transactionId.slice(0, 15)}...
                                </TableCell>
                                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                <TableCell className="capitalize">{transaction.method}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${transaction.status === 'paid'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {transaction.status.toUpperCase()}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TransactionHistoryPage;
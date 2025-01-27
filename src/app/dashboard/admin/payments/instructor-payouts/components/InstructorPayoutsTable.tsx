"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, BanknoteIcon, HistoryIcon, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreateInstructorPayoutMutation } from '@/redux/api/transactionApi/transactionApi';
import DataNotFound from '@/components/shared/DataNotFound';
import { toast } from '@/hooks/use-toast';
import { useGetAllWalletQuery } from '@/redux/api/walletApi/walletApi';
import TableSkeleton from '@/app/dashboard/components/shared/TableSkeleton';
import TablePagination from '@/app/dashboard/components/shared/TablePagination';
import PayoutModal from './PayoutModal';
import { IUser } from '@/types/user';

interface IWalletResult {
    _id: string;
    balance: {
        currentBalance: number;
        pendingBalance: number;
        totalWithdraw: number;
        totalEarnings: number;
    };
    bankAccount: {
        payId: string;
    };
    instructor: {
        _id: string;
        completedLessons: number;
        user: IUser;
    };
    transactions: string[];
    createdAt: string;
    updatedAt: string;
}

export interface IInstructorPayout {
    _id: string;
    name: string;
    lessons: number;
    amount: number;
    lastPayout: string;
    status: 'ready' | 'processing';
    payId: string;
}

const InstructorPayoutsTable = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedInstructor, setSelectedInstructor] = useState<IInstructorPayout | null>(null);
    const [transactionId, setTransactionId] = useState<string>('');
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const [createInstructorPayout, { isLoading: isPayoutLoading }] = useCreateInstructorPayoutMutation();
    const { data, isLoading } = useGetAllWalletQuery(undefined);
    if (isLoading) {
        return <TableSkeleton />;
    }

    const instructors: IInstructorPayout[] = data.data?.result?.map((result: IWalletResult) => ({
        _id: result?.instructor?._id as string,
        name: result?.instructor?.user?.name?.fullName,
        lessons: result?.instructor?.completedLessons,
        amount: result?.balance?.currentBalance,
        lastPayout: new Date(result?.updatedAt)?.toLocaleDateString(),
        status: result?.balance?.currentBalance > 0 ? 'ready' : 'processing',
        payId: result?.bankAccount?.payId,
    })) || [];



    const handleProcessPayout = (instructor: IInstructorPayout) => {
        setSelectedInstructor(instructor);
        setIsModalOpen(true);
    };

    const handleSubmitPayout = (instructorId: string) => {
        if (!transactionId.trim()) return;

        createInstructorPayout({ instructorId, transactionId }).unwrap().then((res) => {
            setIsModalOpen(false);
            setTransactionId('');
            setSelectedInstructor(null);
            toast({
                message: res.message
            })
        }).catch((err) => {
            toast({
                success: false,
                message: err?.data?.message || "Something went wrong"
            })
        })
    };

    const copyPayId = async (payId: string) => {
        if (payId) {
            await navigator.clipboard.writeText(payId);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        }
    };

    return (
        <div className='min-h-[calc(100vh-189px)] flex flex-col text-primary'>
            {
                data?.data?.result?.length ?
                    <div className='flex-1'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Instructor</TableHead>
                                    <TableHead>PayID</TableHead>
                                    <TableHead>Completed Lessons</TableHead>
                                    <TableHead>Amount Due</TableHead>
                                    <TableHead>Last Payout</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {instructors.map((instructor, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{instructor.name}</TableCell>
                                        <TableCell className="text-gray-600">
                                            {instructor.payId}
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {instructor.lessons} lessons
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            ${instructor.amount}
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {instructor.lastPayout}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={cn(
                                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                    instructor.status === "ready"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                )}
                                            >
                                                {instructor.status === "ready"
                                                    ? "Ready for payout"
                                                    : "Processing"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0"
                                                        disabled={instructor.status !== "ready"}
                                                    >
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        disabled={instructor.status !== "ready"}
                                                        onClick={() => handleProcessPayout(instructor)}
                                                    >
                                                        <BanknoteIcon className="mr-2 h-4 w-4" />
                                                        <span>Process Payout</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <HistoryIcon className="mr-2 h-4 w-4" />
                                                        <span>View History</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    :
                    <div className='flex-1 flex items-center justify-center'>
                        <DataNotFound dataName='Instructor Payouts' />
                    </div>
            }

            <PayoutModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedInstructor={selectedInstructor}
                handleSubmitPayout={handleSubmitPayout}
                isCopied={isCopied}
                copyPayId={copyPayId}
                transactionId={transactionId}
                setTransactionId={setTransactionId}
                isPayoutLoading={isPayoutLoading}
            />

            <TablePagination meta={data?.data.meta} />
        </div>
    );
};

export default InstructorPayoutsTable;

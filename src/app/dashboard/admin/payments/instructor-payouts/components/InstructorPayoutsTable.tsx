"use client";

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, BanknoteIcon, HistoryIcon, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetAllWalletQuery } from '@/redux/api/walletApi/walletApi';
import Loading from '@/components/shared/Loading';
import { useCreateInstructorPayoutMutation } from '@/redux/api/transactionApi/transactionApi';
import DataNotFound from '@/components/shared/DataNotFound';
import { toast } from '@/hooks/use-toast';

interface IWalletResponse {
    meta: {
        page: number;
        limit: number;
        totalData: number;
        totalPage: number;
    };
    result: IWalletResult[];
}

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

interface IUser {
    _id: string;
    name: {
        firstName: string;
        lastName: string;
        fullName: string;
    };
    email: string;
    phone: string;
    username: string;
    dateOfBirth: string;
    profileImg: string;
    gender: string;
    role: string;
    status: string;
    isEmailVerified: boolean;
    isDeleted: boolean;
    instructor: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

interface IInstructorPayout {
    _id: string;
    name: string;
    lessons: number;
    amount: number;
    lastPayout: string;
    status: 'ready' | 'processing';
    payId: string;
}

const InstructorPayoutsTable = ({ data }: { data: IWalletResult[] }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedInstructor, setSelectedInstructor] = useState<IInstructorPayout | null>(null);
    const [transactionId, setTransactionId] = useState<string>('');
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const [createInstructorPayout, { isLoading: isPayoutLoading }] = useCreateInstructorPayoutMutation();

    const instructors: IInstructorPayout[] = data?.map((result: IWalletResult) => ({
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

    if (instructors.length === 0) {
        return <div className='min-h-[70vh] flex flex-col items-center justify-center'>
            <DataNotFound dataName="Pending Instructor Payouts" />
        </div>;
    }

    return (
        <>
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

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Process Payout</DialogTitle>
                        <DialogDescription>
                            Please send ${selectedInstructor?.amount} to the instructor&apos;s PayID account,
                            then enter the transaction ID below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Instructor&apos;s PayID</Label>
                            <div className="flex items-center space-x-2">
                                <div className="flex-1 p-3 bg-light-green text-primary rounded-md text-sm font-mono">
                                    {selectedInstructor?.payId}
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => copyPayId(selectedInstructor?.payId || '')}
                                    className="h-10 w-10"
                                >
                                    {
                                        isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />
                                    }
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="transactionId">PayID Transaction ID</Label>
                            <Input
                                id="transactionId"
                                placeholder="Enter transaction ID after sending payment"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                className="h-11"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => handleSubmitPayout(selectedInstructor?._id || '')} disabled={!transactionId.trim() || isPayoutLoading}>
                            Confirm Payout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default InstructorPayoutsTable;

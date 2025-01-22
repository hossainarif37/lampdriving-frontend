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

interface IInstructorPayout {
    name: string;
    lessons: number;
    amount: number;
    lastPayout: string;
    status: 'ready' | 'processing';
    payId: string; // Added PayID field
}

const instructors: IInstructorPayout[] = [
    {
        name: 'John Doe',
        lessons: 12,
        amount: 960,
        lastPayout: '2024-03-15',
        status: 'ready',
        payId: 'john.doe$payid.example.com'
    },
    {
        name: 'Sarah Smith',
        lessons: 8,
        amount: 640,
        lastPayout: '2024-03-15',
        status: 'ready',
        payId: 'sarah.smith$payid.example.com'
    },
    {
        name: 'Mike Johnson',
        lessons: 15,
        amount: 1200,
        lastPayout: '2024-03-15',
        status: 'processing',
        payId: 'mike.johnson$payid.example.com'
    }
];

const InstructorPayoutsTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState<IInstructorPayout | null>(null);
    const [transactionId, setTransactionId] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleProcessPayout = (instructor: IInstructorPayout) => {
        setSelectedInstructor(instructor);
        setIsModalOpen(true);
    };

    const handleSubmitPayout = () => {
        if (!transactionId.trim()) return;

        // Here you would typically make an API call to process the payout
        console.log('Processing payout:', {
            instructor: selectedInstructor,
            transactionId,
        });

        setIsModalOpen(false);
        setTransactionId('');
        setSelectedInstructor(null);
    };

    const copyPayId = async () => {
        if (selectedInstructor?.payId) {
            await navigator.clipboard.writeText(selectedInstructor.payId);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        }
    };

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
                                    onClick={copyPayId}
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
                        <Button onClick={handleSubmitPayout} disabled={!transactionId.trim()}>
                            Confirm Payout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default InstructorPayoutsTable;
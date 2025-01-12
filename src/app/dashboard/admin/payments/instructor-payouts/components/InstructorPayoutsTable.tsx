import React from 'react';
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
import { MoreHorizontal, BanknoteIcon, HistoryIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const instructors = [
    {
        name: 'John Doe',
        lessons: 12,
        amount: 960,
        lastPayout: '2024-03-15',
        status: 'ready'
    },
    {
        name: 'Sarah Smith',
        lessons: 8,
        amount: 640,
        lastPayout: '2024-03-15',
        status: 'ready'
    },
    {
        name: 'Mike Johnson',
        lessons: 15,
        amount: 1200,
        lastPayout: '2024-03-15',
        status: 'processing'
    }
];

const InstructorPayoutsTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Completed Lessons</TableHead>
                    <TableHead>Amount Due</TableHead>
                    <TableHead>Last Payout</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {instructors.map((instructor, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{instructor.name}</TableCell>
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
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        disabled={instructor.status !== "ready"}
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        disabled={instructor.status !== "ready"}
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
    );
};

export default InstructorPayoutsTable;
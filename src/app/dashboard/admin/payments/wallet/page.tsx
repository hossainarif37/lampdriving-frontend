"use client"

import TotalRevenue from './components/TotalRevenue';
import PlatformEarnings from './components/PlatformEarnings';
import PendingBalance from './components/PendingBalance';
import TotalPaidOut from './components/TotalPaidOut';
import RevenueOverviewChart from './components/RevenueOverviewChart';
import { Wallet } from 'lucide-react';

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
import Link from 'next/link';

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



const WalletPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Financial Dashboard</h1>
                        <p className="text-gray-600">Manage payments and instructor payouts</p>
                    </div>
                    <Link href={'/dashboard/admin/payments/instructor-payouts'} className="flex items-center gap-2 bg-blue-500 text-light hover:bg-primary/90 duration-150 rounded-md px-4 py-2">
                        <Wallet size={20} />
                        Process Weekly Payouts
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Revenue */}
                    <TotalRevenue />

                    {/* Platform Earnings (20%) */}
                    <PlatformEarnings />

                    {/* Pending Payouts */}
                    <PendingBalance />

                    {/* Total Paid Out */}
                    <TotalPaidOut />
                </div>

                {/* Chart Section */}
                <RevenueOverviewChart />
            </div>
        </div>
    );
}

export default WalletPage;
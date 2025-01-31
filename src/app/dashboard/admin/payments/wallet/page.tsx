"use client"
import TotalRevenue from './components/TotalRevenue';
import PlatformEarnings from './components/PlatformEarnings';
import PendingBalance from './components/PendingBalance';
import TotalPaidOut from './components/TotalPaidOut';
import RevenueOverviewChart from './components/RevenueOverviewChart';
import { Wallet } from 'lucide-react';
import Link from 'next/link';
import { useGetAdminWalletQuery } from '@/redux/api/walletApi/walletApi';
import { FC } from 'react';
import WalletSkeleton from './components/WalletSkeleton';
import { Button } from '@/components/ui/button';


const WalletPage: FC = () => {
    const { data, isLoading } = useGetAdminWalletQuery(undefined);

    if (isLoading) {
        return <WalletSkeleton />
    }

    const totalRevenue = data?.data?.totalRevenue;
    const platformEarnings = data?.data?.platformEarnings;
    const pendingBalance = data?.data?.pendingBalance;
    const totalPayouts = data?.data?.totalPayouts;
    const lastSixMonthsStats = data?.data?.lastSixMonthsStats;

    return (
        <div className="dashboard-wrapper p-3 lg:p-6">
            <div className="space-y-6">
                {/* Header */}
                <div className="dashboard-heading">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Financial Dashboard</h1>
                        <p className="text-gray-600">Manage payments and instructor payouts</p>
                    </div>
                    <Link href={'/dashboard/admin/payments/instructor-payouts'}>
                        <Button className='bg-primary capitalize'>
                            <Wallet size={20} />
                            Process Weekly Payouts
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Revenue */}
                    <TotalRevenue totalRevenue={totalRevenue} />

                    {/* Platform Earnings (20%) */}
                    <PlatformEarnings platformEarnings={platformEarnings} />

                    {/* Pending Payouts */}
                    <PendingBalance pendingPayouts={pendingBalance} />

                    {/* Total Paid Out */}
                    <TotalPaidOut totalPaidOut={totalPayouts} />
                </div>

                {/* Chart Section */}
                <RevenueOverviewChart lastSixMonthsStats={lastSixMonthsStats} />
            </div>
        </div>
    );
}

export default WalletPage;
"use client"

import React, { FC } from 'react';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Clock,
    LineChart,
    ArrowRight,
    CalendarCheck
} from 'lucide-react';
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import TotalEarnings from './components/TotalEarnings';
import PendingBalance from './components/PendingBalance';
import CurrentBalance from './components/CurrentBalance';
import TotalWithdraw from './components/TotalWithdraw';
import { useGetInstructorWalletQuery } from '@/redux/api/walletApi/walletApi';
import { useAppSelector } from '@/redux/hook';
import Loading from '@/components/shared/Loading';

// Mock data for the chart
const monthlyData = [
    { month: 'Jan', earnings: 2400 },
    { month: 'Feb', earnings: 3200 },
    { month: 'Mar', earnings: 2800 },
    { month: 'Apr', earnings: 3600 },
    { month: 'May', earnings: 3100 },
    { month: 'Jun', earnings: 3800 }
];

const WalletPage: FC = () => {
    const { user } = useAppSelector(state => state.authSlice);
    const instructorId = typeof user?.instructor === 'string' ?
        user?.instructor :
        user?.instructor?._id;

    const { data, isLoading } = useGetInstructorWalletQuery({ instructorId });

    if (isLoading) {
        return <Loading />
    }

    console.log(user);
    console.log('Instructor ID', instructorId);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Instructor Earnings</h1>
                        <p className="text-gray-600">Track your earnings and upcoming payouts</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-600">Next payout:</p>
                        <p className="text-sm font-medium text-gray-900">March 22, 2024</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Earnings */}
                    <TotalEarnings totalEarnings={data?.data?.balance?.totalEarnings} />

                    {/* Pending Balance */}
                    <PendingBalance pendingBalance={data?.data?.balance?.pendingBalance} />

                    {/* Current Balance */}
                    <CurrentBalance currentBalance={data?.data?.balance?.currentBalance} />

                    {/* Total Withdraw */}
                    <TotalWithdraw totalWithdraw={data?.data?.balance?.totalWithdraw} />
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Earnings Overview</h2>
                            <p className="text-gray-600">Your earnings over the last 6 months</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <LineChart size={20} className="text-blue-600" />
                            <span className="text-blue-600 font-medium">Monthly Trend</span>
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="earnings"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    dot={{ fill: '#2563eb', strokeWidth: 2 }}
                                />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
"use client"

import React, { FC, useMemo, useState } from 'react';
import { LineChart } from 'lucide-react';
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
import AddBankAccount from './components/AddBankAccount';

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
    const instructorId = useMemo(() => {
        return typeof user?.instructor === 'string' ?
            user?.instructor :
            user?.instructor?._id;
    }, [user]);

    const { data, isLoading } = useGetInstructorWalletQuery(
        { instructorId: instructorId || "" },
        { skip: !instructorId }
    );

    console.log(data);

    const totalEarnings = data?.data?.wallet.balance?.totalEarnings;
    const pendingBalance = data?.data?.wallet.balance?.pendingBalance;
    const currentBalance = data?.data?.wallet.balance?.currentBalance;
    const totalWithdraw = data?.data?.wallet.balance?.totalWithdraw;

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="dashboard-wrapper p-3 lg:p-6">
            <div className="space-y-6">
                {/* Header */}
                <div className="dashboard-heading">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Instructor Earnings</h1>
                        <p className="text-gray-600">Track your earnings and upcoming payouts</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* <p className="text-sm text-gray-600">Next payout:</p>
                        <p className="text-sm font-medium text-gray-900">March 22, 2024</p> */}
                        <AddBankAccount id={data?.data?.wallet._id || ""} bankAccount={data?.data.wallet.bankAccount} />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Earnings */}
                    <TotalEarnings totalEarnings={totalEarnings || 0} />

                    {/* Pending Balance */}
                    <PendingBalance pendingBalance={pendingBalance || 0} />

                    {/* Current Balance */}
                    <CurrentBalance currentBalance={currentBalance || 0} />

                    {/* Total Withdraw */}
                    <TotalWithdraw totalWithdraw={totalWithdraw || 0} />
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
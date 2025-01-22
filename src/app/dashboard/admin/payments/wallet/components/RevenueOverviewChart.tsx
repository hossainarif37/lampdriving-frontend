'use client'

import { toFixedNumber } from '@/lib/utils';
import { formatDate } from 'date-fns';
import React, { FC } from 'react';
import { Line, Tooltip, CartesianGrid, ResponsiveContainer, YAxis, LineChart, XAxis } from 'recharts';

// Mock data for the chart
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const RevenueOverviewChart: FC<{ lastSixMonthsStats: any }> = ({ lastSixMonthsStats }) => {
    const monthlyData = lastSixMonthsStats?.map((item: any, index: number) => ({
        month: months[index],
        totalAmount: toFixedNumber(item.totalRevenue),
        platformFee: toFixedNumber(item.platformFee),
        instructorPayout: toFixedNumber(item.instructorPayout)
    }));

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Revenue Breakdown</h2>
                    <p className="text-gray-600">Platform fees vs instructor payouts</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Total Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Platform Fee (20%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Instructor Payout (80%)</span>
                    </div>
                </div>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="totalAmount"
                            name="Total Revenue"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={{ fill: '#2563eb', strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="platformFee"
                            name="Platform Fee"
                            stroke="#9333ea"
                            strokeWidth={2}
                            dot={{ fill: '#9333ea', strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="instructorPayout"
                            name="Instructor Payout"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={{ fill: '#22c55e', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueOverviewChart;
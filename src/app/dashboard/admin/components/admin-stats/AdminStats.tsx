/* eslint-disable react/no-unescaped-entities */
"use client";
import { FC, useState } from "react";
import DashboardStats from "./DashboardStats";
import BookingFilters from "./BookingFilters";
import BookingCalendar from "./BookingCalendar";
import { useAppSelector } from "@/redux/hook";
import { BookingList } from "./BookingList";
import { useGetAdminStatsQuery } from "@/redux/api/statsApi/statsApi";
import Loading from "@/components/shared/Loading";
import RevenueOverviewChart from "../../payments/wallet/components/RevenueOverviewChart";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import BookingStatsChart from "./BookingStatsChart";
import AdminStatsSkeleton from "./AdminStatsSkeleton";

// Define the Booking type



const AdminStats: FC = () => {
    const { user } = useAppSelector(state => state.authSlice);
    const { data, isLoading } = useGetAdminStatsQuery(undefined);

    if (isLoading) return <AdminStatsSkeleton />;

    return (
        <div className="dashboard-wrapper">
            <div className="p-3 lg:p-6 w-full">
                <div className="mb-8">
                    <DashboardStats
                        totalBookings={data?.data?.totalBookings}
                        completedBookings={data?.data?.completedBookings}
                        ongoingBookings={data?.data?.ongoingBookings}
                        totalRevenue={data?.data?.totalRevenue}
                        upcomingBookings={data?.data?.upcomingBookings}
                        totalLearners={data?.data?.totalLearners}
                        totalInstructors={data?.data?.totalInstructors}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <BookingStatsChart data={data?.data?.lastSixMonthsBookings} />
                    <BookingList bookings={data?.data?.recentBookings} />
                </div>
            </div>
        </div>
    );
};

export default AdminStats;

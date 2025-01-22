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

// Define the Booking type



const AdminStats: FC = () => {
    const { user } = useAppSelector(state => state.authSlice);
    const [activeFilter, setActiveFilter] = useState('running');
    const { data, isLoading } = useGetAdminStatsQuery(undefined);

    if (isLoading) return <Loading />;

    console.log('Data', data);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto px-6 py-8 bg-gray-50">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        Welcome back, {user?.name?.firstName}!
                    </h1>
                    <p className="text-accent">
                        Here's what's happening with your driving school today.
                    </p>
                </div>

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
                    <BookingCalendar />
                    <BookingList bookings={data?.data?.recentBookings} />
                </div>
            </div>
        </div>
    );
};

export default AdminStats;

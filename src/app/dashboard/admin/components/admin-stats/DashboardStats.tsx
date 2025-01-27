import { FC } from 'react';
import React from 'react';
import { BookOpen, CheckCircle, Clock, DollarSign, Users } from 'lucide-react';
import StatsCard from '@/app/dashboard/shared/StatsCard';
import { toFixedNumber } from '@/lib/utils';

interface DashboardStatsProps {
    totalBookings: number;
    completedBookings: number;
    ongoingBookings: number;
    totalRevenue: number;
    upcomingBookings: number;
    totalLearners: number;
    totalInstructors: number;
}

const DashboardStats: FC<DashboardStatsProps> = ({
    totalBookings,
    completedBookings,
    ongoingBookings,
    totalRevenue,
    upcomingBookings,
    totalLearners,
    totalInstructors
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <StatsCard bgColor="bg-blue-50 text-blue-500" icon={<BookOpen size={24} />} title="Total bookings" value={toFixedNumber(totalBookings ?? 0)} />
            <StatsCard bgColor="bg-green-50 text-green-500" icon={<CheckCircle size={24} />} title="Completed Bookings" value={toFixedNumber(completedBookings ?? 0)} />
            <StatsCard bgColor="bg-purple-50 text-purple-500" icon={<Clock size={24} />} title="Ongoing Bookings" value={toFixedNumber(ongoingBookings ?? 0)} />
            <StatsCard bgColor="bg-purple-50 text-purple-500" icon={<Clock size={24} />} title="Upcoming Bookings" value={toFixedNumber(upcomingBookings ?? 0)} />
            <StatsCard bgColor="bg-blue-50 text-blue-500" icon={<Users size={24} />} title="Total Learners" value={toFixedNumber(totalLearners ?? 0)} />
            <StatsCard bgColor="bg-blue-50 text-blue-500" icon={<Users size={24} />} title="Total Instructors" value={toFixedNumber(totalInstructors ?? 0)} />
            <StatsCard bgColor="bg-blue-50 text-blue-500" icon={<DollarSign size={24} />} title="Total Revenue" value={toFixedNumber(totalRevenue ?? 0)} />
        </div>
    );
};

export default DashboardStats;

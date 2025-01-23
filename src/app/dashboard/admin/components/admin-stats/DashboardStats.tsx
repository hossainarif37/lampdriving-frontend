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
            <StatsCard bgColor="bg-blue-100 text-primary" icon={<BookOpen size={24} />} title="Total bookings" value={toFixedNumber(totalBookings)} />
            <StatsCard bgColor="bg-green-100 text-green-600" icon={<CheckCircle size={24} />} title="Completed Bookings" value={toFixedNumber(completedBookings)} />
            <StatsCard bgColor="bg-purple-100 text-purple-600" icon={<Clock size={24} />} title="Ongoing Bookings" value={toFixedNumber(ongoingBookings)} />
            <StatsCard bgColor="bg-purple-100 text-purple-600" icon={<Clock size={24} />} title="Upcoming Bookings" value={toFixedNumber(upcomingBookings)} />
            <StatsCard bgColor="bg-blue-100 text-primary" icon={<Users size={24} />} title="Total Learners" value={toFixedNumber(totalLearners)} />
            <StatsCard bgColor="bg-blue-100 text-primary" icon={<Users size={24} />} title="Total Instructors" value={toFixedNumber(totalInstructors)} />
            <StatsCard bgColor="bg-blue-100 text-primary" icon={<DollarSign size={24} />} title="Total Revenue" value={toFixedNumber(totalRevenue)} />
        </div>
    );
};

export default DashboardStats;

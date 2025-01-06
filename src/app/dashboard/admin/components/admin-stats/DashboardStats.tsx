import { FC } from 'react';
import React from 'react';
import { BookOpen, CheckCircle, Clock, DollarSign } from 'lucide-react';
import StatsCard from '@/app/dashboard/shared/StatsCard';
// import StatsCard from './StatsCard';

const DashboardStats: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard bgColor='bg-blue-100 text-indigo' icon={<BookOpen size={24} />} title='Total bookings' value="156" />
            <StatsCard bgColor='bg-green-100 text-green-600' icon={<CheckCircle size={24} />} title="Completed Bookings" value="107" />
            <StatsCard bgColor='bg-purple-100 text-purple-600' icon={<Clock size={24} />} title="Running Bookings" value="30" />
            <StatsCard bgColor='bg-blue-100 text-indigo' icon={<DollarSign size={24} />} title='Total bookings' value="1546" />
        </div>
    );
};

export default DashboardStats;
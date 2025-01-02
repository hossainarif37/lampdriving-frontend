import { FC } from 'react';
import React from 'react';
import { BookOpen, CheckCircle, Clock, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';

const DashboardStats: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
                title="Total Bookings"
                value="156"
                icon={<BookOpen size={24} />}
                color="bg-white"
            />
            <StatsCard
                title="Completed Bookings"
                value="89"
                icon={<CheckCircle size={24} />}
                color="bg-white"
            />
            <StatsCard
                title="Running Bookings"
                value="34"
                icon={<Clock size={24} />}
                color="bg-white"
            />
            <StatsCard
                title="Total Earnings"
                value="$12,450"
                icon={<DollarSign size={24} />}
                color="bg-white"
            />
        </div>
    );
};

export default DashboardStats;
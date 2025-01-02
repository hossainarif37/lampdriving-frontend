import { FC } from 'react';
import React from 'react';
import { BookOpen, CheckCircle, Clock, DollarSign } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
    <div className={`${color} rounded-lg p-6 shadow-sm`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-secondary mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gradient">{value}</h3>
            </div>
            <div className="text-primary opacity-80">{icon}</div>
        </div>
    </div>
);

const DashboardStats: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Total Bookings"
                value="156"
                icon={<BookOpen size={24} />}
                color="bg-white"
            />
            <StatCard
                title="Completed Bookings"
                value="89"
                icon={<CheckCircle size={24} />}
                color="bg-white"
            />
            <StatCard
                title="Running Bookings"
                value="34"
                icon={<Clock size={24} />}
                color="bg-white"
            />
            <StatCard
                title="Total Earnings"
                value="$12,450"
                icon={<DollarSign size={24} />}
                color="bg-white"
            />
        </div>
    );
};

export default DashboardStats;
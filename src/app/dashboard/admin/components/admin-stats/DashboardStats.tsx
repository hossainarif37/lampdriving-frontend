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
    <div className={`${color} rounded-lg p-6 shadow-lg`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-100 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
            </div>
            <div className="text-white opacity-80">{icon}</div>
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
                color="bg-blue-600"
            />
            <StatCard
                title="Completed Bookings"
                value="89"
                icon={<CheckCircle size={24} />}
                color="bg-green-600"
            />
            <StatCard
                title="Running Bookings"
                value="34"
                icon={<Clock size={24} />}
                color="bg-orange-600"
            />
            <StatCard
                title="Total Earnings"
                value="$12,450"
                icon={<DollarSign size={24} />}
                color="bg-purple-600"
            />
        </div>
    );
};

export default DashboardStats;
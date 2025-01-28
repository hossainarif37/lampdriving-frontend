import { FC } from 'react';

interface StatsCardProps {
    bgColor: string;
    icon: React.ReactNode;
    title: string;
    value: string | number;
}

const StatsCard: FC<StatsCardProps> = ({ bgColor, icon, title, value }) => {
    return (
        <div className="bg-white rounded-xl border p-6 flex items-center">
            <div className={`rounded-full p-3 mr-4 ${bgColor}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-accent">{title}</p>
                <p className="text-2xl font-bold text-gradient">{value}</p>
            </div>
        </div>
    );
};

export default StatsCard;
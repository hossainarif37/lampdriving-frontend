import { FC } from 'react';


interface IStatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}
const StatsCard: FC<IStatsCardProps> = ({ title, value, icon, color }) => {
    return (
        <div className={`bg-light rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-secondary mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gradient">{value}</h3>
                </div>
                <div className="text-primary opacity-80">{icon}</div>
            </div>
        </div>
    );
};

export default StatsCard;
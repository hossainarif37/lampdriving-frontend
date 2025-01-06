import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

const BenefitCard = ({ icon: Icon, title, description }: BenefitCardProps) => {
    return (
        <div className="flex flex-col items-center p-6 text-center group">
            <div className="mb-4 p-3 rounded-full bg-blue-50 text-blue-600 transition-colors">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

export default BenefitCard;
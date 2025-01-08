import { LucideIcon } from 'lucide-react';
import { FC } from 'react';

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
}

const AboutCard: FC<Card> = ({ icon: Icon, title, description }: Card) => {
    return (
        <div className="flex flex-col items-center p-6 text-center group">
            <div className="relative w-20 h-20 mb-6">
                {/* Diamond Background */}
                <div className="absolute w-20 h-20 bg-secondary/5 transform rotate-45 top-0 left-0"></div>
                {/* Icon Centered in the Diamond Background */}
                <div className="absolute inset-0 flex items-center justify-center text-secondary">
                    <Icon size={28} strokeWidth={1.5} />
                </div>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
            <p className="text-gray-500 leading-relaxed">{description}</p>
        </div>
    );
};

export default AboutCard;
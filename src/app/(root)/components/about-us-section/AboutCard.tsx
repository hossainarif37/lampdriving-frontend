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
            <div className="mb-4 p-3 rounded-full bg-green-100 text-secondary transition-colors">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
            <p className="text-gray-500 leading-relaxed">{description}</p>
        </div>
    );
};

export default AboutCard;
import { FC } from 'react';

interface FeatureCardProps {
    Icon: React.ElementType;
    title: string;
    description: string;
    alignment: 'left' | 'right';
}

const FeatureCard: FC<FeatureCardProps> = ({ Icon, title, description, alignment }) => {
    const justifyContent = alignment === 'right' ? 'justify-end' : 'justify-start';
    return (
        <div className="space-y-2">
            <div className={`flex ${justifyContent}`}>
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-emerald-500" />
                </div>
            </div>
            <div className={`flex items-center ${justifyContent === 'justify-end' ? 'justify-end gap-4' : 'justify-start gap-4'}`}>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
                    <p className="text-accent text-sm leading-6">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;

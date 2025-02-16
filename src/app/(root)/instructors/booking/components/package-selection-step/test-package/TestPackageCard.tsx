import { Check } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface ITestPackageCardProps {
    heading: string;
    description: string;
    price: number;
    features: { title: string; icon: React.ElementType }[];
    onSelect: () => void;
    selected: boolean;
    mockTestCount: number;
    customContent?: ReactNode;
}

const TestPackageCard: FC<ITestPackageCardProps> = ({ heading, description, price, features, onSelect, selected, customContent }) => {
    return (
        <div
            onClick={onSelect}
            className={`bg-gradient-to-br from-primary/5 to-white rounded-xl p-3 sm:p-4 lg:p-6 cursor-pointer border-2 border-gray-200 relative 
        ${selected ? 'bg-primary/5  border-primary' : 'bg-white border-gray-200 hover:border-primary/70'}`}>
            <div className="inline-block bg-primary text-white px-4 py-1 rounded-[4px] text-sm font-medium mb-4">
                {heading}
            </div>
            <div className="text-4xl font-bold text-primary mb-4">${price}</div>
            <div className="text-sm text-gray-500 mb-6">{description}</div>

            <div className="space-y-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <feature.icon className="w-5 h-5 text-gray-400" />
                        <span>{feature.title}</span>
                    </div>
                ))}
            </div>
            {customContent}
            <div className={`size-6 absolute -top-2 -right-2 rounded-xl border-2 flex items-center justify-center
                  ${selected
                    ? 'border-secondary bg-secondary'
                    : 'border-gray-300 bg-white'}`}
            >
                {selected && (
                    <Check className="w-4 h-4 text-white" />
                )}
            </div>
        </div>
    );
};

export default TestPackageCard;
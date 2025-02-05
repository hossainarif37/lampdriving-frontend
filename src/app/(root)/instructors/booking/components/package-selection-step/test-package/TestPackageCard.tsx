import { Circle, CircleCheck } from 'lucide-react';
import { FC, useState } from 'react';

interface ITestPackageCardProps {
    heading: string;
    description: string;
    price: number;
    features: { title: string; icon: React.ElementType }[];
    handleAddTestPackage: () => void;
    selected: boolean;
}

const TestPackageCard: FC<ITestPackageCardProps> = ({ heading, description, price, features, handleAddTestPackage, selected }) => {
    return (
        <div
            onClick={handleAddTestPackage}
            className={`bg-gradient-to-br from-primary/5 to-white rounded-xl p-4 lg:p-6 cursor-pointer border-2 border-gray-200
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
            {/* <div className='absolute top-4 right-4'>
                {
                    selected ?
                        <CircleCheck className='size-6' />
                        :
                        <Circle className='size-6' />
                }
            </div> */}
        </div>
    );
};

export default TestPackageCard;
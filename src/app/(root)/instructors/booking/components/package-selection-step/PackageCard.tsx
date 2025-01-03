import { FC, ReactNode } from 'react';

interface IPackageCardProps {
    hours: number;
    price: number;
    description: string;
    discount?: string;
    recommended?: boolean;
    selected: boolean;
    onSelect: () => void;
    customContent?: ReactNode;
}

const PackageCard: FC<IPackageCardProps> = ({ hours, price, description, discount, recommended, selected, onSelect, customContent }) => {
    return (
        <div
            onClick={onSelect}
            className={`relative p-6 rounded-xl transition-all cursor-pointer border-2 border-gray-200
        ${selected ? 'bg-primary/5  border-primary' : 'bg-white border-gray-200 hover:border-primary/70'}`}
        >
            {recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    Recommended
                </span>
            )}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold">{hours} Hours</h3>
                    <p className="text-gray-600 mt-1">${price}/hour</p>
                </div>
                {discount && (
                    <span className="text-sm font-medium bg-[#dbeafe] text-primary px-2 py-1 rounded">
                        {discount}
                    </span>
                )}
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
            {customContent}
        </div>
    );
};

export default PackageCard;
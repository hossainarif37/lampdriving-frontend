import { Check } from 'lucide-react';
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
            className={`relative p-3 sm:p-4 lg:p-6 rounded-xl transition-all cursor-pointer border-2 border-gray-200 flex
        ${selected ? 'bg-primary/5  border-primary' : 'bg-white border-gray-200 hover:border-primary/70'}`}
        >
            <div className='w-full'>
                {recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                        Recommended
                    </span>
                )}
                <div className="flex justify-between items-center sm:items-start sm:mb-4">
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold">{hours} Hours</h3>
                        <p className="text-gray-600 sm:mt-1 text-sm sm:text-base">${price}/hour</p>
                    </div>
                    {discount && (
                        <span className="text-sm font-medium bg-[#dbeafe] text-primary px-2 py-1 rounded">
                            {discount}
                        </span>
                    )}
                </div>
                <p className="text-gray-600 text-sm hidden sm:block">{description}</p>
            </div>
            <div className={`size-6 absolute -top-2 -right-2 rounded-xl border-2 flex items-center justify-center
                  ${selected
                    ? 'border-secondary bg-secondary'
                    : 'border-gray-300 bg-white'}`}
            >
                {selected && (
                    <Check className="w-4 h-4 text-white" />
                )}
            </div>
            {customContent}
        </div>
    );
};

export default PackageCard;
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';


interface IPackageProps {
    packageCardInfo: {
        hours: number;
        price: number;
        savings: string;
    };
}
const PackageCard: FC<IPackageProps> = ({ packageCardInfo }) => {
    const { hours, price, savings } = packageCardInfo
    return (
        <div className="bg-gradient-to-b from-white to-indigo/5 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">{hours} Hours Package</h3>
            </div>
            <div className="mb-4">
                <p className="text-3xl font-bold text-gradient">${price}</p>
                <p className="text-sm text-green-600">Save ${savings}</p>
            </div>
            <Button size="lg" className="w-full capitalize">
                Purchase Package
            </Button >
        </div>
    );
};

export default PackageCard;
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface IPricingCardProps {
    title: string;
    subtitle: string;
    price: number;
    savings: number;
    features: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; title: string; description: string }[];
    buttonText: string;
    bestValue?: boolean;
}
const PricingCard: FC<IPricingCardProps> = ({
    title,
    subtitle,
    price,
    savings,
    features,
    buttonText,
    bestValue = false,
}) => {
    return (
        <div
            className={`rounded-2xl  p-8 border border-light/30  hover:border-secondary transition-all duration-300 backdrop-blur-sm ${bestValue ? 'bg-gradient-to-br from-secondary/5 to-primary/80' : 'bg-primary/90'}`}
        >
            {bestValue && (
                <div className="absolute md:top-4 top-2 md:right-4 right-2 ">
                    <span className="bg-secondary text-light px-3 py-1 rounded-full text-sm font-semibold">Best Value</span>
                </div>
            )}

            <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 ${bestValue ? 'bg-secondary/20' : 'bg-secondary/10'} rounded-lg`}>
                    <Car className="w-8 h-8 text-secondary" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-light/70">{title}</h3>
                    <p className="text-light-green/70">{subtitle}</p>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                {features.map(({ icon: Icon, title, description }) => (
                    <div className="flex items-start gap-3" key={title}>
                        <Icon className="w-5 h-5 text-secondary mt-1" />
                        <div>
                            <p className="font-semibold text-light/80">{title}</p>
                            <p className="text-light-green/60 text-sm">{description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-3xl font-bold text-light">${price}</p>
                    <p className="text-secondary text-sm">Save ${savings}</p>
                </div>
                <Link href='/instructors'>
                    <Button className="px-6 py-3 border border-light/40 bg-primary/5 text-light rounded-lg font-semibold cursor-pointer">
                        {buttonText}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default PricingCard;
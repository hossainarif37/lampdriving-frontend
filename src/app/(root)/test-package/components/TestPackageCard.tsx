import { FC } from 'react';
import { CheckCircle2, Car, Clock, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import cardImg from "@/assets/dummy-images/test-package-image.avif"
import { Button } from '@/components/ui/button';

const features = [
    {
        icon: Clock,
        title: '2-hour pre-test warm-up',
        description: 'Get comfortable before the big day'
    },
    {
        icon: Car,
        title: 'School vehicle included',
        description: 'Modern car with dual controls'
    },
    {
        icon: MapPin,
        title: 'Test route practice',
        description: 'Familiarize with actual test routes'
    }
];

const additionalFeatures = [
    'Mock test simulation',
    'Test preparation simplified',
    'Expert Guidance',
    'Flexible scheduling options'
];


const TestPackageCard: FC = () => {
    return (
        <div className="bg-light rounded-3xl shadow-lg overflow-hidden max-w-5xl mx-auto z-50">
            <div className="grid md:grid-cols-2">
                {/* Left Column - Image */}
                <div className="relative">
                    <Image
                        src={cardImg}
                        alt="Driving lesson"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-indigo/80 mix-blend-multiply" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-light">
                        <h3 className="text-2xl font-bold mb-2">Complete Test Package</h3>
                        <p className="text-blue-200">Everything you need to pass your test with confidence</p>
                    </div>
                </div>

                {/* Right Column - Content */}
                <div className="md:p-7 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-sm text-accent">Starting from</span>
                            <div className="text-4xl font-bold text-gradient">$299</div>
                        </div>
                        <Button size="lg">
                            Book Now
                            <ArrowRight />
                        </Button>
                    </div>

                    {/* Main Features */}
                    <div className="space-y-6 mb-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                    <feature.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-secondary">{feature.title}</h4>
                                    <p className="text-sm text-accent">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Features */}
                    <div className="border-t pt-6">
                        <h4 className="font-semibold text-secondary mb-4">Also Included:</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {additionalFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm text-accent">
                                    <CheckCircle2 className="text-indigo mr-2 h-4 w-4" />
                                    <span className='text-sm'>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TestPackageCard;
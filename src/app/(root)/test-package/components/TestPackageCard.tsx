import { FC } from 'react';
import { CheckCircle2, Car, Clock, MapPin, ArrowRight, Link, Package } from 'lucide-react';
import Image from 'next/image';
import cardImg from "@/assets/dummy-images/test-package-image.jpg"
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
        <div className="">
            <h1 className="text-3xl font-bold text-primary mb-8 text-center">Driving Test Packages</h1>

            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {/* Test Day Package */}
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <span className="px-4 py-1.5 bg-teal-100 text-teal-500 font-medium rounded-full text-sm">
                                Test Day
                            </span>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">From</p>
                                <p className="text-3xl font-bold text-primary">$220</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="bg-teal-50 p-2 rounded-lg">
                                    <Clock className="w-5 h-5 text-teal-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-primary">2 hour test day</p>
                                    <p className="text-sm text-gray-500">Complete test preparation</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-teal-50 p-2 rounded-lg">
                                    <MapPin className="w-5 h-5 text-teal-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-primary">Pick-up & Drop-off Service</p>
                                    <p className="text-sm text-gray-500">Door-to-door convenience</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-teal-50 p-2 rounded-lg">
                                    <Car className="w-5 h-5 text-teal-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-primary">1 hour revision practice</p>
                                    <p className="text-sm text-gray-500">Final preparation before test</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mock Tests Package */}
                    <div className="relative p-8 bg-gradient-to-br from-teal-50/50 to-transparent">
                        <div className="absolute bottom-2 right-2">
                            <span className="px-3 py-1 bg-secondary/10 text-secondary/90 text-xs font-semibold rounded-full">
                                Save $20
                            </span>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <span className="px-4 py-1.5 bg-teal-500 text-white font-medium rounded-full text-sm">
                                2 Mock Tests + Test Day
                            </span>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">From</p>
                                <p className="text-3xl font-bold text-primary">$390</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 p-2 rounded-lg">
                                    <Clock className="w-5 h-5 text-teal-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-primary">2 hours 1st session</p>
                                    <p className="text-sm text-gray-500">Comprehensive mock test</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 p-2 rounded-lg">
                                    <Clock className="w-5 h-5 text-teal-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-primary">1 hour 2nd session</p>
                                    <p className="text-sm text-gray-500">Focused practice</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 p-2 rounded-lg">
                                    <Package className="w-5 h-5 text-teal-500" />
                                </div>
                                <div>
                                    <p className="font-medium text-primary">Including test day package</p>
                                    <p className="text-sm text-gray-500">Complete test day preparation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestPackageCard;
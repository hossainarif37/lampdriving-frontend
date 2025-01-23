import { FC } from 'react';
import React from 'react';
import { ChevronRight, Clock, Shield } from 'lucide-react';
import bgImg from "@/assets/about-page-image/facts-counter-v1-1.jpg"
import PricingCard from './PricingCard';
import { Button } from '@/components/ui/button';
const testPackage = [
    {
        icon: Clock,
        title: '2 hour test day',
        description: 'Complete test preparation',
    },
    {
        icon: Clock,
        title: 'Pick-up & Drop-off Service',
        description: 'Door-to-door convenience',
    },
    {
        icon: Shield,
        title: '1 hour revision practice',
        description: 'Final preparation before test',
    },
]

const testAndMockTestPackage = [
    {
        icon: Clock,
        title: '2 hours 1st session',
        description: 'Comprehensive mock test',
    },
    {
        icon: Clock,
        title: '1 hour 2nd session',
        description: 'Focused practice',
    },
    {
        icon: Shield,
        title: 'Including test day package',
        description: 'Complete test day preparation',
    },
]
const Pricing: FC = () => {
    return (
        <div className="relative py-16 md:py-20 bg-cover" style={{ backgroundImage: `url(${bgImg.src})` }}>
            <div className="absolute inset-0 bg-primary opacity-90 z-0" />
            <div className="z-10 wrapper">
                {/* Header Section */}
                <div className="text-center mb-14 z-10 relative">
                    <h2 className="text-4xl font-bold text-light/60 mb-4">Choose Your Path to Success</h2>
                    <p className="text-light/50 text-lg max-w-2xl mx-auto">
                        Professional driving instruction packages tailored to help you become a confident and skilled driver
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 relative z-30">
                    {/* Standard Package */}
                    <PricingCard
                        title="Test Package"
                        subtitle="Preparation + Test"
                        price={220}
                        // savings={20}
                        features={testPackage}
                        buttonText="Book Now"
                    />

                    {/* Ultimate Package */}
                    <PricingCard
                        title="2 Mock Tests + Test Package"
                        subtitle="Preparation + 2 Mock Tests + Test"
                        price={390}
                        savings={20}
                        bestValue={true}
                        features={testAndMockTestPackage}
                        buttonText="Book Now"
                    />
                </div>
            </div>
        </div>
    );
};

export default Pricing;
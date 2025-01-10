import { FC } from 'react';
import React from 'react';
import { ChevronRight, Clock, Shield } from 'lucide-react';
import bgImg from "@/assets/about-page-image/facts-counter-v1-1.jpg"
import PricingCard from './PricingCard';
import { Button } from '@/components/ui/button';
const standard = [
    {
        icon: Clock,
        title: '90-minute Initial Session',
        description: 'Complete review of 19 test items and 110 points',
    },
    {
        icon: Clock,
        title: '60-minute Follow-up Session',
        description: 'Mock test practice with detailed feedback',
    },
    {
        icon: Shield,
        title: 'Official Test Preparation',
        description: '1-hour revision with RMS testing officer',
    },
]

const ultimate = [
    {
        icon: Clock,
        title: '90-minute Initial Session',
        description: 'Complete review of 19 test items and 110 points',
    },
    {
        icon: Clock,
        title: '4 Practice Sessions',
        description: '60 minutes each with comprehensive feedback',
    },
    {
        icon: Shield,
        title: 'Official Test Preparation',
        description: '1-hour revision with RMS testing officer',
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
                        title="Standard Package"
                        subtitle="2 Sessions + Test"
                        price={390}
                        savings={20}
                        features={standard}
                        buttonText="Book Now"
                    />

                    {/* Ultimate Package */}
                    <PricingCard
                        title="Ultimate Package"
                        subtitle="5 Sessions + Test"
                        price={550}
                        savings={50}
                        bestValue={true}
                        features={ultimate}
                        buttonText="Book Now"
                    />
                </div>

                {/* Bottom CTA */}
                <div className="relative text-center wrapper group mt-14">
                    {/* Horizontal border */}
                    <hr className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full z-0 border-gray-500" />

                    {/* Centered button */}
                    <Button
                        variant="outline"
                        className="bg-gray-300  border hover:border-primary/25 h-12 rounded-3xl relative z-10"
                    >
                        <span className="text-gray-600 mr-2 md:block hidden">Discover what others are saying.</span>
                        <ChevronRight className='group-hover:translate-x-2 duration-300' />
                        <span className="font-bold text-secondary">VIEW ALL</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
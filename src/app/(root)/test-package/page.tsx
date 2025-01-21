import { FC } from 'react';

import TestPackageBanner from './components/TestPackageBanner';
import TestPackageCard from './components/TestPackageCard';
import SectionHeading from '../components/shared/section-heading/SectionHeading';
import Features from './components/Features';
import PremiumPackageSection from './components/PremiumPackageSection';


const TestPackage: FC = () => {
    return (
        <div className=''>
            {/* banner Section */}
            <div className='relative'>
                <TestPackageBanner />
            </div>

            {/* Package card Section */}
            <div className="wrapper -mt-32 py-16 z-50 relative">
                <TestPackageCard />
            </div>

            {/* Features Section */}
            <div className="md:mt-10 mt-6">
                <SectionHeading
                    title='Why Choose Our Test Package?'
                    subtitle='We provide everything you need to pass your driving test with confidence'
                />
                <Features />
            </div>

            {/* Premium package Section */}
            <div className='pb-16 '>
                <PremiumPackageSection />
            </div>
        </div>
    );
};

export default TestPackage;
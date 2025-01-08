import React from 'react';

import TestPackageBanner from './components/TestPackageBanner';
import TestPackageCard from './components/TestPackageCard';
import SectionHeading from '../components/shared/section-heading/SectionHeading';
import Features from './components/Features';
import PremiumPackageSection from './components/PremiumPackageSection';

function App() {
    return (
        <div className="bg-gradient-to-t from-primary/0 to-primary/15">
            {/* banner Section */}
            <div>
                <TestPackageBanner />
            </div>

            {/* Package card Section */}
            <div className="wrapper -mt-32 py-16">
                <TestPackageCard />
            </div>

            {/* Features Section */}
            <div className=" pt-20">
                <SectionHeading
                    title='Why Choose Our Test Package?'
                    subtitle='We provide everything you need to pass your driving test with confidence'
                />
                <Features />
            </div>

            {/* Features Section */}
            <div className=''>
                <PremiumPackageSection />
            </div>
        </div>
    );
}

export default App;
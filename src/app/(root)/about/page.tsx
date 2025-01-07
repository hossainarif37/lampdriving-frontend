import { FC } from 'react';
import AboutSection from './components/AboutSection';
import MissionVisionSection from './components/MissionVisionSection';
import WhyChooseUs from './components/WhyChoseUs/WhyChooseUs';
import AboutStats from './components/AboutStats/AboutStats';

const aboutPage: FC = () => {
    return (
        <div>
            {/* <Banner /> */}
            <AboutSection />
            <MissionVisionSection />
            <WhyChooseUs />
            <AboutStats />
        </div>
    );
};

export default aboutPage;
import { FC } from 'react';
import Banner from './components/Banner';
import AboutSection from './components/AboutSection';
import MissionVisionSection from './components/MissionVisionSection';
import WhyChooseUs from './components/WhyChooseUs';

const aboutPage: FC = () => {
    return (
        <div>
            {/* <Banner /> */}
            <AboutSection />
            <MissionVisionSection />
            {/* <WhyChooseUs /> */}
        </div>
    );
};

export default aboutPage;
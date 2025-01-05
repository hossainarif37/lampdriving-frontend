import { FC } from 'react';
import Banner from './components/Banner';
import AboutSection from './components/AboutSection';
import MissionVisionSection from './components/MissionVisionSection';

const aboutPage: FC = () => {
    return (
        <div>
            <Banner />
            <AboutSection />
            <MissionVisionSection />
        </div>
    );
};

export default aboutPage;
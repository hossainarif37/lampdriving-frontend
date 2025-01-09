import { FC } from 'react';
import AboutSection from './components/AboutSection';
import MissionVisionSection from './components/MissionVisionSection';
import WhyChooseUs from './components/WhyChoseUs/WhyChooseUs';
import AboutStats from './components/AboutStats/AboutStats';
import ExpertTeamMember from './components/ExpertTeamMember/ExpertTeamMember';

const AboutPage: FC = () => {
    return (
        <div className=''>
            {/* <Banner /> */}
            <AboutSection />
            <MissionVisionSection />
            <WhyChooseUs />
            <AboutStats />
            <ExpertTeamMember />
        </div>
    );
};

export default AboutPage;
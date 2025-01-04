import { FC } from 'react';
import Banner from './components/Banner';
import AboutSection from './components/AboutSection';

const aboutPage: FC = () => {
    return (
        <div>
            <Banner />
            <AboutSection />
        </div>
    );
};

export default aboutPage;
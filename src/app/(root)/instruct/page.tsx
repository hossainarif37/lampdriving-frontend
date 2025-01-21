import { FC } from 'react';
import EarningsCalculator from './components/EarningsCalculator';
import SuccessStories from './components/SuccessStories';
import AccordionDesign from './components/FAQ';
import Stats from './components/Stats/Stats';
import Flexibility from './components/Flexibility/Flexibility';

const BecomeInstructorPage: FC = () => {
    return (
        <div className='bg-light'>
            <EarningsCalculator />
            <Flexibility />
            <Stats />
            <SuccessStories />
            <AccordionDesign />
        </div>
    );
};

export default BecomeInstructorPage;
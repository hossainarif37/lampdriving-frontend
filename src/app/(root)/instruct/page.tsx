import { FC } from 'react';
import EarningsCalculator from './components/EarningsCalculator';
import LearnerStats from './components/LearnerStats';
import SuccessStories from './components/SuccessStories';
import AccordionDesign from '../instruct/components/AccordionDesign';

const page: FC = () => {
    return (
        <div className='bg-gradient-to-b from-primary/5 to-white'>
            <EarningsCalculator />
            <LearnerStats />
            <AccordionDesign />
            <SuccessStories />
        </div>
    );
};

export default page;
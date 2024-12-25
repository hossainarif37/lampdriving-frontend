import { FC } from 'react';
import EarningsCalculator from './components/EarningsCalculator';
import SuccessStories from './components/SuccessStories';
import AccordionDesign from '../instruct/components/AccordionDesign';
import Stats from './components/Stats/Stats';

const page: FC = () => {
    return (
        <div className='bg-gradient-to-b from-primary/5 to-white'>
            <EarningsCalculator />
            <Stats />
            <SuccessStories />
            <AccordionDesign />
        </div>
    );
};

export default page;
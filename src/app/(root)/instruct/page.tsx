import { FC } from 'react';
import EarningsCalculator from './components/EarningsCalculator';
import SuccessStories from './components/SuccessStories';
import AccordionDesign from './components/FAQ';
import Stats from './components/Stats/Stats';
import Flexibility from './components/Flexibility/Flexibility';

const page: FC = () => {
    return (
        <div className='bg-gradient-to-b from-light-green to-white'>
            <EarningsCalculator />
            <Flexibility />
            <Stats />
            <SuccessStories />
            <AccordionDesign />
        </div>
    );
};

export default page;
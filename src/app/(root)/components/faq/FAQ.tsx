"use client"
import { FC } from 'react';

import SectionHeading from '../shared/section-heading/SectionHeading';
import TabsDesign from './TabsDesign';
import FaqAccordion from '../shared/faq-accordion/FaqAccordion';

const FAQ: FC = () => {

    return (
        <div className='space-y-3 md:space-y-6 gradient-to-t py-16 md:py-20 p-3'>
            {/*Section Heading*/}
            <SectionHeading title='Top Frequently Asked Questions' subtitle='Find answers to common queries about our driving courses, instructors, fees, and more.' />
            {/*Tabs button part*/}
            <div>
                <TabsDesign />
            </div>
            {/*Accordion part*/}
            <div className='mx-auto px-4 md:px-0 max-w-4xl'>
                {Array(5).fill(null).map((_, index) => (
                    <FaqAccordion key={index} />
                ))}
            </div>
        </div>
    );
};

export default FAQ;
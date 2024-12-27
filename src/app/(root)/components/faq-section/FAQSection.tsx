"use client"
import { FC } from 'react';

import SectionHeading from '../shared/section-heading/SectionHeading';
import TabsDesign from './TabsDesign';
import FaqAccordion from '../shared/faq-accordion/FaqAccordion';

const FAQSection: FC = () => {

    return (
        <div className=' p-3 md:space-y-6 space-y-3 bg-gradient-to-b md:py-20 py-16 from-[#F0F7F3] to-[#ffff]'>
            {/*Section Heading*/}
            <SectionHeading title='Top Frequently Asked Questions' subtitle='Find answers to common queries about our driving courses, instructors, fees, and more.' />
            {/*Tabs button part*/}
            <div>
                <TabsDesign />
            </div>
            {/*Accordion part*/}
            <div className='max-w-4xl mx-auto px-4 md:px-0'>
                {Array(5).fill(null).map((_, index) => (
                    <FaqAccordion key={index} />
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
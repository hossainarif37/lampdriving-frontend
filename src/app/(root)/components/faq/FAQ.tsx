"use client"
import { FC, useEffect, useState } from 'react';
import SectionHeading from '../shared/section-heading/SectionHeading';
import FaqAccordion from '../shared/faq-accordion/FaqAccordion';
import { Accordion } from '@radix-ui/react-accordion';


const FAQ: FC = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const response = await fetch('/faqInfo.json');
            const data = await response.json();
            setFaqs(data);
        };
        fetchTestimonials();
    }, []);

    return (
        <div className='space-y-3 md:space-y-6 pt-20 p-3 bg-light-green pb-40'>
            {/*Section Heading*/}
            <SectionHeading title='Frequently Asked Questions' subtitle='Find answers to common queries about our driving courses, instructors, fees, and more.' className='md:mb-14' />
            {/*Tabs button part*/}
            <div>
                {/* <TabsDesign /> */}
            </div>
            {/*Accordion part*/}
            <div className='mx-auto px-4 md:px-0 max-w-5xl'>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faqInfo, index) => (
                        <FaqAccordion key={index} faqInfo={faqInfo} />
                ))}
                </Accordion>
            </div>
        </div>
    );
};

export default FAQ;
"use client"
import { FC, useEffect, useState } from 'react';
import FaqAccordion from '../../components/shared/faq-accordion/FaqAccordion';
import { Accordion } from '@radix-ui/react-accordion';
import SectionHeading from '../../components/shared/section-heading/SectionHeading';

const FAQ: FC = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const response = await fetch('/instructorFaqInfo.json');
            const data = await response.json();
            setFaqs(data);
        };
        fetchTestimonials();
    }, []);

    return (
        <section className='px-4 md:px-0 bg-light'>
            <SectionHeading
                title='Frequently Asked Questions'
                subtitle='Find answers to common questions about becoming an instructor with Lamp Driving.'
            />
            <div className='max-w-4xl mx-auto'>
                <div className='mx-auto px-4 md:px-0 max-w-5xl pb-16'>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faqInfo, index) => (
                            <FaqAccordion key={index} faqInfo={faqInfo} />
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
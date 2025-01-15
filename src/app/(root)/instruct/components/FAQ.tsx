"use client"
import { FC, useEffect, useState } from 'react';
import FaqAccordion from '../../components/shared/faq-accordion/FaqAccordion';
import { Accordion } from '@radix-ui/react-accordion';

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
        <section className='px-4 md:px-0 md:py-20 py-10 bg-light-green'>
            <div className='max-w-4xl mx-auto'>
                <h2 className='text-3xl font-semibold text-primary my-4'>Your questions, answered</h2>
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
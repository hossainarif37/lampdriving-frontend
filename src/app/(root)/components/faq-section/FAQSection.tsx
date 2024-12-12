import { FC } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import SectionHeading from '../shared/section-heading/SectionHeading';

const FAQSection: FC = () => {
    return (
        <div className=' md:p-32 p-3'>
            {/*Section Heading*/}
            <SectionHeading title='Top Frequently Asked Questions' subtitle='Find answers to common queries about our driving courses, instructors, fees, and more.' />
            <div className='max-w-4xl mx-auto px-4 md:px-0'>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='hover:no-underline text-secondary'>Is it accessible?</AccordionTrigger>
                        <AccordionContent className='text-accent'>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the other
                            components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default FAQSection;
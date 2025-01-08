import { FC } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
const FaqAccordion: FC = () => {
    return (
        <div>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className=''>
                    <AccordionTrigger className='hover:no-underline text-primary'>Getting Started with Lamp Driving</AccordionTrigger>
                    <AccordionContent className='text-accent'>
                        Description: Discover how to enroll and begin your journey toward becoming a confident driver.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FaqAccordion;
import { FC } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const AccordionDesign: FC = () => {
    return (
        <div>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className=''>
                    <AccordionTrigger className='hover:no-underline text-secondary'>Getting Started with Lamp Driving</AccordionTrigger>
                    <AccordionContent className='text-accent'>
                        Description: Discover how to enroll and begin your journey toward becoming a confident driver.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className='hover:no-underline text-secondary'>Courses We Offer</AccordionTrigger>
                    <AccordionContent className='text-accent'>
                        Description: Learn about our beginner, advanced, and refresher driving courses designed for all levels.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className='hover:no-underline text-secondary'>Flexible Scheduling Options</AccordionTrigger>
                    <AccordionContent className='text-accent'>
                        Description: We offer convenient training times to suit your busy lifestyle.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default AccordionDesign;

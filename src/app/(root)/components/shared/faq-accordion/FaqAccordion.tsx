import { FC } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
interface IFaqProps {
    faqInfo: {
        title: string;
        description: string;
        val: string;
    };
    title?: string;
    description?: string;
}
const FaqAccordion: FC<IFaqProps> = ({ faqInfo }) => {
    const { title, description, val } = faqInfo;
    return (
        <div>
            {/* <Accordion type="single" collapsible className="w-full"> */}
            <AccordionItem value={val} className=''>
                <AccordionTrigger className='hover:no-underline text-primary'>{title}</AccordionTrigger>
                    <AccordionContent className='text-accent'>
                    {description}
                    </AccordionContent>
                </AccordionItem>
            {/* </Accordion> */}
        </div>
    );
};

export default FaqAccordion;
import { FC } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
interface IFaqProps {
    faqInfo: {
        title: string;
        description: string;
        val: string;
    };
}
const FaqAccordion: FC<IFaqProps> = ({ faqInfo }) => {
    const { title, description, val } = faqInfo;
    return (
        <AccordionItem value={val} className='text-left'>
            <AccordionTrigger className='hover:no-underline text-primary text-left'>{title}</AccordionTrigger>
            <AccordionContent className='text-accent '>
                {description}
            </AccordionContent>
        </AccordionItem>
    );
};

export default FaqAccordion;
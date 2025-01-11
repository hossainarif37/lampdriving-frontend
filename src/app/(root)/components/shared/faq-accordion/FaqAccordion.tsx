import { FC } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
interface IFaqProps {
    faqInfo: {
        question: string;
        answer: string;
        value: string;
    };
}
const FaqAccordion: FC<IFaqProps> = ({ faqInfo }) => {
    const { question, answer, value } = faqInfo;
    return (
        <AccordionItem value={value} className='text-left'>
            <AccordionTrigger className='hover:no-underline text-primary text-left'>{question}</AccordionTrigger>
            <AccordionContent className='text-accent '>
                {answer}
            </AccordionContent>
        </AccordionItem>
    );
};

export default FaqAccordion;
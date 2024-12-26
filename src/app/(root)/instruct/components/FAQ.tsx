import { FC } from 'react';
import FaqAccordion from '../../components/shared/faq-accordion/FaqAccordion';

const FAQ: FC = () => {
    return (
        <div className='max-w-4xl mx-auto px-4 md:px-0 py-20'>
            <h2 className='text-3xl font-semibold text-secondary my-4'>Your questions, answered</h2>
            <div className='max-w-4xl mx-auto px-4 md:px-0'>
                {Array(5).fill(null).map((_, index) => (
                    <FaqAccordion key={index} />
                ))}
            </div>
        </div>
    );
};

export default FAQ;
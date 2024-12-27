import { FC } from 'react';
import FaqAccordion from '../../components/shared/faq-accordion/FaqAccordion';

const FAQ: FC = () => {

    return (
        <section className='px-4 md:px-0 md:py-20 py-10 bg-gradient-to-t from-primary/0 to-indigo/5'>
            <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-semibold text-secondary my-4'>Your questions, answered</h2>
            <div className='max-w-4xl mx-auto px-4 md:px-0'>
                {Array(5).fill(null).map((_, index) => (
                    <FaqAccordion key={index} />
                ))}
            </div>
        </div>
        </section>
    );
};

export default FAQ;
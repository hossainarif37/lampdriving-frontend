import { FC } from 'react';
import InstractorBoxDesign from './InstractorBoxDesign';
import { CarTaxiFront, Mails, Repeat, Star } from 'lucide-react';
import SectionHeading from '../shared/section-heading/SectionHeading';

const instructorBoxes = [
    {
        Icon: Star,
        title: "Instructor ratings",
        description: "Access peer reviews & find an instructor who has consistently provided a great learning experience.",
    },
    {
        Icon: Repeat,
        title: "Accredited",
        description: "We obtain up to date copies of relevant instructor accreditations & verify their working with children credentials.",
    },
    {
        Icon: CarTaxiFront,
        title: "Vehicle safety",
        description: "Gain access to instructor vehicle make, model, year & safety rating.",
    },
    {
        Icon: Mails,
        title: "Always your choicef",
        description: "Don't like your current instructor? Select a new instructor via our online portal, no questions asked.",
    },
];


const ChooseBestInstructorSelections: FC = () => {

    return (
        <section className='flex flex-col gap-5 lg:gap-10 mb-20'>
            <SectionHeading
                title="Book driving lessons with confidence"
                subtitle="Choose a driving instructor you can trust"
            />
            <div className='wrapper grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-6'>
                {instructorBoxes.map((box, index) => (
                    <InstractorBoxDesign
                        key={index}
                        Icon={box.Icon}
                        title={box.title}
                        description={box.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default ChooseBestInstructorSelections;
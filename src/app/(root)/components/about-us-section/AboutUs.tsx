import { FC } from 'react';
import SectionHeading from '../shared/section-heading/SectionHeading';
import { ShieldCheck, BellElectric, Clock3, CircleDollarSign, ShipWheel, Banknote, LucideIcon } from 'lucide-react';
import AboutCard from './AboutCard';

const cards = [
    {
        icon: ShieldCheck,
        title: "BEST SAFETY MEASURES",
        description: "Our Instructors are Highly Trained in the latest Safety Techniques & Rules of the Road.",
    },
    {
        icon: BellElectric,
        title: "EXPERIENCED INSTRUCTORS",
        description: "All our Instructors are DMV Licensed, mentally and physically fit and have decade or more of Instruction History.",
    },
    {
        icon: Clock3,
        title: "PERFECT TIMING",
        description: "Now is the perfect time to start your In Class, Online or Behind The Wheel Training.",
    },
    {
        icon: CircleDollarSign,
        title: "AFFORDABLE FEE",
        description: "We know this process can be expensive. So we constantly monitor our competition's pricing.",
    },
    {
        icon: ShipWheel,
        title: "CLASS FORMATS",
        description: "We offer In Classroom Drivers Education as well as Online Drivers Education.",
    },
    {
        icon: Banknote,
        title: "PAYMENT PLANS",
        description: "We allow you to decide when and how you want to pay. We accept all major forms of payments.",
    },
];

const AboutUs: FC = () => {
    const sub = 'We understand learning to drive can be expensive, but we won’t take advantage by charging more than necessary.'
    return (
        <section className="bg-light px-4 py-16">
            {/* Section Heading */}
            <SectionHeading title="Why Choose Us?" subtitle={sub} className='mb-8 md:mb-10' />

            {/* Cards Grid */}
            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 wrapper">
                {cards.map((card, index) => (
                    <AboutCard key={index} {...card} />
                ))}
            </div>
        </section>
    );
};

export default AboutUs;

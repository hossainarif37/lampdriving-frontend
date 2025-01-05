import { FC } from 'react';
import SectionHeading from '../shared/section-heading/SectionHeading';
import { ShieldCheck, BellElectric, Clock3, CircleDollarSign, ShipWheel, Banknote } from 'lucide-react';
import AboutCard from './AboutCard';

interface Card {
    icon: JSX.Element;
    title: string;
    description: string;
}

const cards: Card[] = [
    {
        icon: <ShieldCheck className="w-14 h-14 text-indigo" />,
        title: "BEST SAFETY MEASURES",
        description: "Our Instructors are Highly Trained in the latest Safety Techniques & Rules of the Road.",
    },
    {
        icon: < BellElectric className="w-14 h-14 text-indigo" />,
        title: "EXPERIENCED INSTRUCTORS",
        description: "All our Instructors are DMV Licensed, mentally and physically fit and have decade or more of Instruction History.",
    },
    {
        icon: < Clock3 className="w-14 h-14 text-indigo" />,
        title: "PERFECT TIMING",
        description: "Now is the perfect time to start your In Class, Online or Behind The Wheel Training.",
    },
    {
        icon: < CircleDollarSign className="w-14 h-14 text-indigo" />,
        title: "AFFORDABLE FEE",
        description: "We know this process can be expensive. So we constantly monitor our competition's pricing.",
    },
    {
        icon: <ShipWheel className="w-14 h-14 text-indigo" />,
        title: "CLASS FORMATS",
        description: "We offer In Classroom Drivers Education as well as Online Drivers Education.",
    },
    {
        icon: <Banknote className="w-14 h-14 text-indigo" />,
        title: "PAYMENT PLANS",
        description: "We allow you to decide when and how you want to pay. We accept all major forms of payments.",
    },
];

const AboutUs: FC = () => {
    const sub = 'We understand that learning to drive isn’t cheap, many driving schools will take advantage of this and charge you a larger sum than necessary; not us.'
    return (
        <section className="gradient-to-b px-4 py-16">
            {/* Section Heading */}
            <SectionHeading title="Why Choose Us?" subtitle={sub} />

            {/* Cards Grid */}
            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 wrapper">
                {cards.map((card, index) => (
                    <AboutCard key={index} card={card} />
                ))}
            </div>
        </section>
    );
};

export default AboutUs;

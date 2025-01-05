import React from 'react';
import { Star, Shield, Car, Users } from 'lucide-react';
import BenefitCard from './BenefitCard';
import SectionHeading from '../shared/section-heading/SectionHeading';

const Benefits: React.FC = () => {
    const benefits = [
        {
            icon: Star,
            title: "Instructor Ratings",
            description: "Access verified reviews and find experienced instructors with proven track records of success."
        },
        {
            icon: Shield,
            title: "Fully Accredited",
            description: "All instructors are certified professionals with up-to-date accreditations and credentials."
        },
        {
            icon: Car,
            title: "Vehicle Safety",
            description: "Modern, well-maintained vehicles with comprehensive safety features and regular inspections."
        },
        {
            icon: Users,
            title: "Your Perfect Match",
            description: "Easily switch instructors to find the perfect teaching style for your learning journey."
        }
    ];

    return (
        <section className="py-10 md:py-20 gradient-to-t">
            <div className="max-w-6xl mx-auto px-4">
                {/* <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Book driving lessons with confidence
                    </h2>
                    <p className="text-xl text-gray-600">
                        Choose a driving instructor you can trust
                    </p>
                </div> */}
                <SectionHeading
                    title="Book driving lessons with confidence"
                    subtitle="Choose a driving instructor you can trust"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Benefits;
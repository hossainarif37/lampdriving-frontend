import { Clock, Car, Calendar } from 'lucide-react'

import { FC } from 'react';

const cardData = [
    {
        icon: <Clock className="h-6 w-6 text-blue-200 mb-2 mx-auto" />,
        title: "2-Hour Session",
        description: "Intensive preparation",
    },
    {
        icon: <Car className="h-6 w-6 text-blue-200 mb-2 mx-auto" />,
        title: "Test Vehicle",
        description: "Latest model cars",
    },
    {
        icon: <Calendar className="h-6 w-6 text-blue-200 mb-2 mx-auto" />,
        title: "Flexible Scheduling",
        description: "Choose your time",
    },
]

const PremiumPackageSection: FC = () => {
    return (
        <section className="pt-12 md:pt-24 pb-5 md:pb-10 wrapper">
            <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12">

                {/* Gradient animation overlay */}
                <div className="absolute inset-0 bg-size-500"></div>

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <div className="inline-block rounded-lg bg-primary/50 px-3 py-1 text-sm text-light mb-4">
                        Premium Package
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-light/70 mb-6">
                        Master Your Driving Test
                    </h2>
                    <p className="text-blue-100 md:text-xl max-w-2xl mx-auto mb-8">
                        Get ready for success with our comprehensive test preparation package. Expert instruction,
                        real test routes, and guaranteed vehicle availability.
                    </p>

                    {/* Feature cards */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {
                            cardData.map((card, index) => (
                                <div
                                    key={index}
                                    className="bg-light/10 backdrop-blur-md rounded-xl p-4 border border-light/20"
                                >
                                    {card.icon}
                                    <h3 className="font-semibold text-light">{card.title}</h3>
                                    <p className="text-blue-100 text-sm">{card.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PremiumPackageSection;


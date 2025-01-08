import { Check } from 'lucide-react';
import { FC } from 'react';
import Counter from './Counter';

const LearnerStats: FC = () => {
    return (
        <div className="w-full bg-[#020617] py-12 md:py-16">
            {/* Container for the entire section */}
            <div className="mx-auto wrapper space-y-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Stats Section */}
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <h2 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
                                100,000
                            </h2>
                            <h3 className="text-3xl font-medium text-white sm:text-5xl">
                                Learners
                            </h3>
                            <p className="text-xl text-white/90 sm:text-2xl">
                                have booked through our platform
                            </p>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-white">
                            The Onboarding Process & How We Support You
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "One-to-one guidance from our specialised team",
                                "Fully verified and ready to take bookings within 48 hours",
                                "Learn at your own pace with a wealth of training materials",
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    {/* Icon Section */}
                                    <div className="mt-1">
                                        <Check className="h-5 w-5 text-primary" />
                                    </div>
                                    {/* Text for each point */}
                                    <span className="text-white/90">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Counter Component */}
                <Counter />
            </div>
        </div>
    );
};

export default LearnerStats;

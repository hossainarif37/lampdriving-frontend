import { FC } from 'react';
import FeatureCard from './FeaturedCard';
import { Calendar, Car, ChevronRight, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '../shared/section-heading/SectionHeading';
import Link from 'next/link';

const HowLampDrivingWork: FC = () => {
    return (
        <div className="gradient-to-b py-10 md:py-20 min-h-screen">
            <div className="mx-auto px-4 max-w-6xl">
                {/* <div className="mb-16 text-center">
                    <h2 className="mb-4 font-bold text-4xl text-gray-900">
                        How Lamp Driving Works
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600 text-xl">
                        Your journey to becoming a confident driver starts here with our simple, trusted, and flexible booking system
                    </p>
                </div> */}
                <SectionHeading
                    title="How Lamp Driving Works"
                    subtitle="Simple, Trusted & Flexible Booking System"
                />

                <div className="gap-12 grid md:grid-cols-3 mb-12">
                    <FeatureCard
                        number={1}
                        icon={Car}
                        title="Find Your Instructor"
                        description="Browse through our verified driving instructors, read reviews, and choose the perfect match for your learning style."
                    />
                    <FeatureCard
                        number={2}
                        icon={Calendar}
                        title="Schedule Lessons"
                        description="Book lessons at times that suit you with our flexible scheduling system. Manage your calendar with ease."
                    />
                    <FeatureCard
                        number={3}
                        icon={GraduationCap}
                        title="Learn & Progress"
                        description="Track your progress, receive detailed feedback, and develop your driving skills with structured lessons."
                    />
                    <FeatureCard
                        number={4}
                        icon={GraduationCap}
                        title="Learn & Progress"
                        description="Track your progress, receive detailed feedback, and develop your driving skills with structured lessons."
                    />
                    <FeatureCard
                        number={5}
                        icon={GraduationCap}
                        title="Learn & Progress"
                        description="Track your progress, receive detailed feedback, and develop your driving skills with structured lessons."
                    />
                    <FeatureCard
                        number={6}
                        icon={GraduationCap}
                        title="Learn & Progress"
                        description="Track your progress, receive detailed feedback, and develop your driving skills with structured lessons."
                    />
                </div>

                <div className="text-center">
                    <Link href="/register">
                        <Button variant={"gradient"} className="">
                            Start Your Journey Today
                            <ChevronRight size={20} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HowLampDrivingWork;
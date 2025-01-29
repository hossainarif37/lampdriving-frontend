import { FC } from 'react';
import FeatureCard from './FeaturedCard';
import { Award, Calendar, Car, ChevronRight, ClipboardCheck, GraduationCap, MapPin, ShipWheel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '../shared/section-heading/SectionHeading';
import Link from 'next/link';

const HowLampDrivingWork: FC = () => {
    return (
        <div className="py-10 md:pt-20 md:pb-10 min-h-screen bg-light">
            <div className="mx-auto px-8 lg:px-0 max-w-6xl">
                <SectionHeading
                    title="How Lamp Driving Works"
                    subtitle="Simple, Trusted & Flexible Booking System"
                />

                <div className="gap-12 grid md:grid-cols-2 lg:grid-cols-3 mb-12">
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
                        icon={ShipWheel}
                        title="Master the Basics"
                        description="Learn essential driving techniques and safety measures to build a strong foundation for driving."
                    />
                    <FeatureCard
                        number={4}
                        icon={MapPin}
                        title="Practice in Your Area"
                        description="Get lessons on familiar roads and locations to boost confidence and real-world driving skills."
                    />
                    <FeatureCard
                        number={5}
                        icon={ClipboardCheck}
                        title="Track Your Progress"
                        description="Monitor your improvement with detailed feedback and a personalized learning roadmap."
                    />
                    <FeatureCard
                        number={6}
                        icon={Award}
                        title="Earn Your Certification"
                        description="Complete your training and receive a certificate to showcase your driving competency."
                    />
                </div>


                <div className="text-center">
                    <Link href="/register">
                        <Button className="gradient-color">
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
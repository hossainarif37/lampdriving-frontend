import { FC } from 'react';
import InstructorBox from './InstructorBox';
import SectionHeading from '../shared/section-heading/SectionHeading';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const FeaturedInstructors: FC = () => {
    return (
        <section className="bg-gray-50 lg:py-20 md:py-16 p-6">
            <div className="wrapper">
            {/* Section Heading */}
            <SectionHeading
                title="Top-Rated Instructors for Your Driving Lessons"
                subtitle="Choose from a curated list of expert instructors to guide you on your journey"
            />

            {/* Instructors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-7 mx-auto">
                {Array(6).fill(null).map((_, index) => (
                    <InstructorBox key={index} />
                ))}
            </div>

            {/* Explore Instructors Button */}
                <Link href={"/instructors"} className="flex justify-center  mt-6 md:mt-12">
                    <Button className='gradient-color'>
                    Explore Instructors <ChevronRight strokeWidth={3} />
                </Button>
            </Link>
            </div>
        </section>
    );
};

export default FeaturedInstructors;

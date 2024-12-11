import { FC } from 'react';
import InstructorBox from './InstructorBox';
import SectionHeading from '../shared/section-heading/SectionHeading';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const FeaturedInstructors: FC = () => {
    return (
        <section className="wrapper mb-24">
            {/* Section Heading */}
            <SectionHeading
                title="Top-Rated Instructors for Your Driving Lessons"
                subtitle="Choose from a curated list of expert instructors to guide you on your journey"
            />

            {/* Instructors Grid */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7 mx-auto">
                {Array(6).fill(null).map((_, index) => (
                    <InstructorBox key={index} />
                ))}
            </div>

            {/* Explore Instructors Button */}
            <div className="text-center mt-6 md:mt-12">
                <Button>
                    Explore Instructors <ChevronRight strokeWidth={3} />
                </Button>
            </div>
        </section>
    );
};

export default FeaturedInstructors;

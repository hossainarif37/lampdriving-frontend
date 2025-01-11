import { FC } from 'react';
import SectionHeading from '../shared/section-heading/SectionHeading';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getInstructors } from '@/api/getInstructors';
// import InstructorCard from './InstructorCard';
import InstructorCard from '../../instructors/components/InstructorCard';


interface IInstructorProps {
    searchedParams?: {
        carType?: string;
        searchKey?: string;
        page?: string;
    };
}
const FeaturedInstructors: FC<IInstructorProps> = async ({ searchedParams }) => {
    const instructors = await getInstructors({ limit: "4" });
    return (
        <section className="md:py-16 py-12 md:p-6 bg-light-green">
            <div className="wrapper">
                {/* Section Heading */}
                <SectionHeading
                    title="Top-Rated Instructors for Your Driving Lessons"
                    subtitle="Choose from a curated list of expert instructors to guide you on your journey"
                />

                {/* Instructors Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-7 mt-16 mx-auto">
                    {
                        instructors.data.result.map((instructor, index) => (
                            <InstructorCard key={index} instructor={instructor} />
                        ))
                    }
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

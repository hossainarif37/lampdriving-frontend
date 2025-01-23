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
        <section className="md:py-16 py-12 md:p-6 bg-light">
            <div className="wrapper">
                {/* Section Heading */}
                <SectionHeading
                    title="Top-Rated Instructors for Your Driving Lessons"
                    subtitle="Choose from a curated list of expert instructors to guide you on your journey"
                />

                {/* Instructors Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-7 mt-16 mx-auto">
                    {
                        instructors?.data?.result.map((instructor, index) => (
                            <InstructorCard key={index} instructor={instructor} />
                        ))
                    }
                </div>

                {/* Explore Instructors Button */}
                {/* <Link href={"/instructors"} className="flex justify-center  mt-6 md:mt-12">
                    <Button className='gradient-color'>
                        Explore Instructors <ChevronRight strokeWidth={3} />
                    </Button>
                </Link> */}

                <div className="relative text-center wrapper group mt-6 md:mt-12">
                    {/* Horizontal border */}
                    <hr className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full z-0 border-primary/10" />

                    {/* Centered button */}
                    <Link href={"/instructors"} className="flex justify-center  mt-6 md:mt-12">
                        <Button
                            variant="outline"
                            className="bg-gray-50  border hover:border-primary/25 h-12 rounded-3xl relative z-10"
                        >
                            <span className="text-gray-600 mr-2">View All Instructors</span>
                            <ChevronRight className='group-hover:translate-x-2 duration-300' />
                            <span className="font-bold text-secondary">View All</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedInstructors;

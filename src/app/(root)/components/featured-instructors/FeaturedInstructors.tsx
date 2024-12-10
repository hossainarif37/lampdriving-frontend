import { FC } from 'react';
import InstructorBox from './InstructorBox';
import SectionHeading from '../shared/section-heading/SectionHeading';

const FeaturedInstructors: FC = () => {
    return (
        <div className='min-h-screen wrapper'>
            <SectionHeading
                title='Top-Rated Instructors for Your Driving Lessons'
                subtitle="Choose from a curated list of expert instructors to guide you on your journey" />

            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-7'>
                <InstructorBox />
                <InstructorBox />
                <InstructorBox />
            </div>
        </div>
    );
};

export default FeaturedInstructors;
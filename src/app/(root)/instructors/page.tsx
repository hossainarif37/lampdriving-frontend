import React from 'react';
import { FC } from 'react';
import SearchBar from './components/SearchBar';
import SectionHeading from '../components/shared/section-heading/SectionHeading';
import InstructorGrid from './components/InstructorGrid';

const page: FC = () => {
    return (
        <div className=''>
            <div className='wrapper py-14 space-y-7 '>
                <SectionHeading title='Our Instructors' subtitle='Find the perfect instructor for your learning journey' />
                <SearchBar />
                <InstructorGrid />
            </div>
        </div>
    );
};

export default page;
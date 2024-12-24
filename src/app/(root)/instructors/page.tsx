import React from 'react';
import { FC } from 'react';
import SearchBar from './components/SearchBar';
import SectionHeading from '../components/shared/section-heading/SectionHeading';
import Instructors from './components/Instructors';
import { getInstructors } from '@/api/getInstructors';

interface IInstructorProps {
    searchParams?: Promise<{
        carType?: string;
        searchKey?: string;
    }>;
}

const InstructorsPage: FC<IInstructorProps> = async ({ searchParams }) => {
    
    const instructors = await getInstructors();

    return (
        <div className=''>
            <div className='wrapper py-14 space-y-7 '>
                <SectionHeading title='Our Instructors' subtitle='Find the perfect instructor for your learning journey' />
                <SearchBar />
                <Instructors instructors={instructors.data.result || []} />
                {/* <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(newPage) => {
                        setCurrentPage(newPage);
                    }}
                /> */}
            </div>
        </div>
    );
};

export default InstructorsPage;
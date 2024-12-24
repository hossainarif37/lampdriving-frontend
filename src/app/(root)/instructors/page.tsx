import React from 'react';
import { FC } from 'react';
import InstructorsSearchFilter from './components/InstructorsSearchFilter';
import SectionHeading from '../components/shared/section-heading/SectionHeading';
import Instructors from './components/Instructors';
import { getInstructors } from '@/api/getInstructors';
import Pagination from './components/Pagination';

interface IInstructorProps {
    searchParams?: Promise<{
        carType?: string;
        searchKey?: string;
        page?: string;
    }>;
}

const InstructorsPage: FC<IInstructorProps> = async ({ searchParams }) => {
    const searchedParams = await searchParams;
    const instructors = await getInstructors(searchedParams);
    return (
        <div className=''>
            <div className='wrapper py-14 space-y-7 '>
                <SectionHeading title='Our Instructors' subtitle='Find the perfect instructor for your learning journey' />
                <InstructorsSearchFilter />
                <Instructors instructors={instructors.data.result || []} />
                <Pagination
                    currentPageProps={Number(searchedParams?.page) || 1}
                    totalPages={instructors.data.meta.totalPage}
                />
            </div>
        </div>
    );
};

export default InstructorsPage;
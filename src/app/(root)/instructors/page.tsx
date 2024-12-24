import React, { Suspense } from 'react';
import { FC } from 'react';
import InstructorsSearchFilter from './components/InstructorsSearchFilter';
import SectionHeading from '../components/shared/section-heading/SectionHeading';
import Instructors from './components/Instructors';
import { getInstructors } from '@/api/getInstructors';
import Pagination from './components/Pagination';
import InstructorsLoadingSkeleton from './components/InstructorsLoadingSkeleton';

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
                <InstructorsSearchFilter searchParams={searchedParams} />
                <Suspense fallback={<InstructorsLoadingSkeleton />}>
                    <Instructors instructors={instructors.data.result || []} />
                </Suspense>
                <Pagination
                    currentPageProps={Number(searchedParams?.page) || 1}
                    totalPages={instructors.data.meta.totalPage || 1}
                />
            </div>
        </div>
    );
};

export default InstructorsPage;
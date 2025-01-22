import React, { Suspense } from 'react';
import { FC } from 'react';
import InstructorsSearchFilter from './components/InstructorsSearchFilter';
// import SectionHeading from '../components/shared/section-heading/SectionHeading';
import Instructors from './components/Instructors';
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
    return (
        <div className='bg-light'>
            <div className='wrapper py-14 space-y-7'>
                {/* <SectionHeading title='Our Instructors' subtitle='Find the perfect instructor for your learning journey' /> */}
                <InstructorsSearchFilter searchParams={searchedParams} />
                <Suspense key={JSON.stringify(searchedParams)} fallback={<InstructorsLoadingSkeleton />}>
                    <Instructors searchedParams={searchedParams} />
                </Suspense>
            </div>
        </div>
    );
};

export default InstructorsPage;
import { FC } from 'react';
import SectionHeading from '../components/shared/section-heading/SectionHeading';
import InstructorsSearchFilter from './components/InstructorsSearchFilter';
import InstructorsLoadingSkeleton from './components/InstructorsLoadingSkeleton';
import Pagination from './components/Pagination';

const loading: FC = () => {
    return (
        <div className=''>
            <div className='wrapper py-14 space-y-7 '>
                <SectionHeading title='Our Instructors' subtitle='Find the perfect instructor for your learning journey' />
                <InstructorsSearchFilter searchParams={undefined} />
                <InstructorsLoadingSkeleton />
                <Pagination
                    currentPageProps={1}
                    totalPages={1}
                />
            </div>
        </div>
    );
};

export default loading;
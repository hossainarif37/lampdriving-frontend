import { FC } from 'react';
import InstructorCard from './InstructorCard';
import InstructorsNotFound from './InstructorsNotFound';
import { getInstructors } from '@/api/getInstructors';
import Pagination from '../../../../components/shared/Pagination';

interface IInstructorProps {
    searchedParams?: {
        carType?: string;
        searchKey?: string;
        page?: string;
    };
}

const Instructors: FC<IInstructorProps> = async ({ searchedParams }) => {

    const instructors = await getInstructors(searchedParams);

    return (
        <div className='min-h-[40vh] space-y-7 md:pb-28 pb-20'>
            {
                instructors.data?.result.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                        {
                            instructors?.data?.result?.map((instructor, index) => (
                                <InstructorCard key={index} instructor={instructor} />
                            ))
                        }
                    </div>
                    :
                    <InstructorsNotFound />
            }
            <Pagination
                currentPageProps={Number(searchedParams?.page) || 1}
                totalPages={instructors?.data?.meta?.totalPage || 1}
            />
        </div>
    );
};

export default Instructors;
import { FC } from 'react';
import InstructorCardSkeleton from './InstructorCardSkeleton';

const InstructorsLoadingSkeleton: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {
                Array(6).fill(null).map((_data, index) => (
                    <InstructorCardSkeleton key={index} />
                ))
            }
        </div>
    );
};

export default InstructorsLoadingSkeleton;
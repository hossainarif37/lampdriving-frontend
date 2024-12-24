import { FC } from 'react';
import InstructorCard from './InstructorCard';
import { IInstructor } from '@/types/instructor';

const Instructors: FC<{ instructors: IInstructor[] | [] }> = ({ instructors }) => {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                {
                    instructors.map((instructor, index) => (
                        <InstructorCard key={index} instructor={instructor} />
                    ))
                }
            </div>
        </>
    );
};

export default Instructors;
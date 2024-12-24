"use client";
import { FC } from 'react';
import InstructorCard from './InstructorCard';
import { IInstructor } from '@/types/instructor';
import InstructorsNotFound from './InstructorsNotFound';

const Instructors: FC<{ instructors: IInstructor[] | [] }> = ({ instructors }) => {

    return (
        <div className='min-h-[40vh]'>
            {
                instructors.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                        {
                            instructors.map((instructor, index) => (
                                <InstructorCard key={index} instructor={instructor} />
                            ))
                        }
                    </div>
                    :
                    <InstructorsNotFound />
            }
        </div>
    );
};

export default Instructors;
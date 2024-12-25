"use client"

import { useAppSelector } from '@/redux/hook';
import { FC } from 'react';

const InstructorProfile: FC = () => {
    const {user} = useAppSelector(state=> state.authSlice);
    
    return (
        <div>
            Instructor
        </div>
    );
};

export default InstructorProfile;
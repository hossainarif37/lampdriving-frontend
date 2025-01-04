"use client";

import { useAppSelector } from '@/redux/hook';
import { FC } from 'react';
import InstructorProfile from './components/instructor-profile/InstructorProfile';
import SharedProfile from './components/shared-profile/SharedProfile';

const ProfileSettingsPage: FC = () => {
    const { user } = useAppSelector((state) => state.authSlice);
    return (
        <div className=''>
            {
                user?.role === 'instructor' ? <InstructorProfile /> : <SharedProfile />
            }
        </div>
    );
};

export default ProfileSettingsPage;
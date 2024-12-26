"use client";

import { useAppSelector } from '@/redux/hook';
import { IAuthSliceState } from '@/types/auth';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import InstructorProfile from './components/instructor-profile/InstructorProfile';
import SharedProfile from './components/shared-profile/SharedProfile';

const ProfileSettingsPage: FC = () => {
    const { user } = useAppSelector((state) => state.authSlice);
    console.log('user', user);
    return (
        <div>
            {
                user?.role === 'instructor' ? <InstructorProfile/> : <SharedProfile/>
            }
        </div>
    );
};

export default ProfileSettingsPage;
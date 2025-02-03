"use client"
import { useAppSelector } from '@/redux/hook';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';

const WarningBar: FC = () => {
    const user = useAppSelector(state => state.authSlice.user);
    return (
        user?.isEmailVerified ? null : (
            <div className='bg-red-500 text-center flex items-center justify-center'>
                <button className='py-1 text-white underline flex items-center'>Your email is not verified! Please verify your email.<ArrowRight size={18} /></button>
            </div>
        )
    );
};

export default WarningBar;
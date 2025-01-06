"use client"
import { useAppSelector } from '@/redux/hook';
import { FC } from 'react';
import MenuSearch from './MenuSearch';
import UserMenu from './UserMenu';

const DashboardNav: FC = () => {
    const { user } = useAppSelector(state => state.authSlice);

    return (
        <div className='bg-white pl-5 p-3 pr-6 lg:flex justify-between items-center w-full z-10 sticky top-0 hidden'>
            <div>
                <MenuSearch />
            </div>

            <div className='flex items-center text-end gap-2'>
                <div>
                    <h6 className='font-semibold'>{user?.name.firstName} {user?.name.lastName}</h6>
                    <p className='text-secondary text-sm'>({user?.role})</p>
                </div>
                <UserMenu />
            </div>
        </div>
    );
};

export default DashboardNav;
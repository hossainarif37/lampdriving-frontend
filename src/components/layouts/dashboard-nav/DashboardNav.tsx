"use client"
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/redux/hook';
import { Search, User } from 'lucide-react';
import { FC } from 'react';

const DashboardNav: FC = () => {
    const { user } = useAppSelector(state => state.authSlice);
    return (
        <div className='bg-white pl-5 p-3 flex justify-between items-center w-full z-10 sticky top-0 '>
            <div>
                <div className='relative'>
                    <Input placeholder='Search' type='text' className='pl-11' />
                    <Search size={24} className='absolute top-1/2 transform -translate-y-1/2 left-3' />
                </div>
            </div>

            <div className='flex items-center text-end'>
                <div>
                    <h6 className='font-semibold text-lg'>{user?.name.firstName} {user?.name.lastName}</h6>
                    <p>{user?.email}</p>
                </div>
                <button className='bg-green-300 p-3 rounded-full ml-3'>
                    <User size={24} />
                </button>
            </div>
        </div>
    );
};

export default DashboardNav;
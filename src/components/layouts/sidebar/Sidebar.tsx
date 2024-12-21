"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import LampLogo from '@/components/shared/LampLogo';
import MenuLinks from './MenuLinks';
import NavLink from '@/components/shared/NavLink';
import { Settings } from 'lucide-react';

const Sidebar = () => {
    // const user = useSelector((state: RootState) => state.usersSlice);
    // const [logoutUser, { isLoading: isLogoutLoading }] = useLazyLogOutUserQuery();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();


    // mobile menu toggle handler
    const handleMenuToggler = () => {
        setIsMenuOpen(pre => !pre);
    }


    return (
        <div className='fixed lg:flex flex-col lg:h-full w-full lg:w-80 bg-seconderyCol'>
            <div className='flex items-center justify-between lg:justify-center my-2 px-3'>
                <Link href={'/'} className='w-32'>
                    <LampLogo />
                </Link>

                {/* menu dropdown button for smaller devices */}
                <Button
                    onClick={handleMenuToggler}
                    className={`rounded-full lg:hidden text-2xl gap-2`}>
                    <div className='transition-opacity duration-200'>

                    </div>
                </Button>
            </div>
            <div className='flex-1 hidden lg:block px-3'>
                <MenuLinks />
            </div>
            <div className='my-6 hidden lg:block px-3'>
                <NavLink active='activeSidebar' other='sidebar' href='/dashboard/profile-settings'>
                    <Settings />
                    Profile Settings
                </NavLink>
            </div>
            <div className='lg:hidden'>
                {/* <MobileMenu isMenuOpen={isMenuOpen} /> */}
            </div>
        </div>
    );
};

export default Sidebar;
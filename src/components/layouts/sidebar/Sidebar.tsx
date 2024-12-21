"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LampLogo from '@/components/shared/LampLogo';
import MenuLinks from './MenuLinks';
import NavLink from '@/components/shared/NavLink';
import { AlignJustify, Settings } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Sidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


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
                    size={"icon"}
                    className={`rounded-full lg:hidden text-3xl gap-2`}>
                    <AlignJustify className='text-3xl' />
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
                <MobileMenu isMenuOpen={isMenuOpen} />
            </div>
        </div>
    );
};

export default Sidebar;
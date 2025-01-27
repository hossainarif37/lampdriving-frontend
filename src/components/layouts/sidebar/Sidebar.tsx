"use client"
import LampLogo from '@/components/shared/LampLogo';
import MenuLinks from './MenuLinks';
import NavLink from '@/components/shared/NavLink';
import { Settings } from 'lucide-react';
import MobileMenu from './MobileMenu';
import UserMenu from '../dashboard-nav/UserMenu';

const Sidebar = () => {
    return (
        <div className='fixed lg:flex flex-col lg:h-full w-full lg:w-60 xl:w-72  bg-white z-10'>
            <div className='flex items-center justify-between  my-2 px-3'>
                <LampLogo />

                <div className='flex items-center gap-2 lg:hidden'>
                    {/* menu dropdown button for smaller devices */}
                    <MobileMenu />
                    <div>
                        <UserMenu />
                    </div>
                </div>
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
        </div>
    );
};

export default Sidebar;
"use client"
import NavLink from '@/components/shared/NavLink';
import { BookIcon, DollarSignIcon, History, LayoutDashboardIcon, LucideRecycle, Recycle, RecycleIcon, Settings2Icon, Wallet } from 'lucide-react';
import React from 'react';


const MenuLinks = () => {

    const adminRoutes = [
        {
            name: 'Dashboard',
            path: '/dashboard/admin',
            icon: <LayoutDashboardIcon />
        },
        {
            name: 'Manage Bookings',
            path: '/dashboard/admin/manage-bookings',
            icon: <BookIcon />
        },
        {
            name: 'Manage Instructors',
            path: '/dashboard/admin/manage-instructors',
            icon: <Settings2Icon />
        },
        {
            name: 'Manage Learners',
            path: '/dashboard/admin/manage-learners',
            icon: <Settings2Icon />
        },
        {
            name: 'Wallet',
            path: '/dashboard/admin/wallet',
            icon: <Wallet />
        },
        {
            name: 'Withdrawal Request',
            path: '/dashboard/admin/withdrawal-request',
            icon: <DollarSignIcon />
        },
        {
            name: 'Transaction History',
            path: '/dashboard/admin/transaction-history',
            icon: <History />
        },
        {
            name: 'Manage Blog',
            path: '/dashboard/admin/manage-blog',
            icon: <Settings2Icon />
        },
        {
            name: 'Manage Support Articles',
            path: '/dashboard/admin/manage-support-articles',
            icon: <Settings2Icon />
        },
        {
            name: 'Recycle Bin',
            path: '/dashboard/admin/recycle-bin',
            icon: <Recycle />
        }
    ]
    return (
        <div>
            <div className='my-6'>
                <div className='flex flex-col gap-2 justify-center h-full my-2'>
                    {
                        adminRoutes.map((route, index) => (
                            <NavLink key={index} href={route.path} active='activeSidebar' other='sidebar'>
                                {route.icon}
                                {route.name}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MenuLinks;
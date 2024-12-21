"use client"
import NavLink from '@/components/shared/NavLink';
import { useAppSelector } from '@/redux/hook';
import { BookIcon, DollarSignIcon, History, LayoutDashboardIcon, Recycle, Settings2Icon, TimerIcon, Wallet } from 'lucide-react';
import { ReactNode } from 'react';

interface IRoute {
    name: string;
    path: string;
    icon: ReactNode;
}

const MenuLinks = () => {
    const { user } = useAppSelector(state => state.authSlice);

    const learnerRoutes: IRoute[] = [
        {
            name: 'Dashboard',
            path: '/dashboard/learner',
            icon: <LayoutDashboardIcon />
        },
        {
            name: 'Manage Bookings',
            path: '/dashboard/learner/manage-bookings',
            icon: <BookIcon />
        },
        {
            name: 'Transaction History',
            path: '/dashboard/learner/transaction-history',
            icon: <History />
        }
    ];


    const instructorRoutes: IRoute[] = [
        {
            name: 'Dashboard',
            path: '/dashboard/instructor',
            icon: <LayoutDashboardIcon />
        },
        {
            name: 'Manage Bookings',
            path: '/dashboard/instructor/manage-bookings',
            icon: <BookIcon />
        },
        {
            name: 'Manage Availability',
            path: '/dashboard/instructor/manage-bookings',
            icon: <TimerIcon />
        },
        {
            name: 'Wallet',
            path: '/dashboard/instructor/wallet',
            icon: <Wallet />
        },
        {
            name: 'Transaction History',
            path: '/dashboard/instructor/transaction-history',
            icon: <History />
        }
    ];

    const adminRoutes: IRoute[] = [
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
    ];

    const routes = user?.role === "admin" ? adminRoutes : user?.role === "instructor" ? instructorRoutes : learnerRoutes;

    return (
        <div>
            <div className='my-6'>
                <div className='flex flex-col gap-2 justify-center h-full my-2'>
                    {
                        routes.map((route, index) => (
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
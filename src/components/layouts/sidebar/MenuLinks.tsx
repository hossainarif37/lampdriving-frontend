"use client"
import NavLink from '@/components/shared/NavLink';
import { useAppSelector } from '@/redux/hook';
import { ArrowDownToLine, BookOpen, Calendar, FileText, HelpCircle, History, LayoutDashboardIcon, Trash2, UserCheck, Users, Wallet } from 'lucide-react';
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
            name: 'Bookings',
            path: '/dashboard/learner/manage-bookings',
            icon: <BookOpen />
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
            name: 'Bookings',
            path: '/dashboard/instructor/manage-bookings',
            icon: <BookOpen />
        },
        {
            name: 'Availability',
            path: '/dashboard/instructor/manage-availability',
            icon: <Calendar />
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
            name: 'Bookings',
            path: '/dashboard/admin/manage-bookings',
            icon: <BookOpen />
        },
        {
            name: 'Instructors',
            path: '/dashboard/admin/manage-instructors',
            icon: <UserCheck />
        },
        {
            name: 'Learners',
            path: '/dashboard/admin/manage-learners',
            icon: <Users />
        },
        {
            name: 'Wallet',
            path: '/dashboard/admin/wallet',
            icon: <Wallet />
        },
        {
            name: 'Withdrawal Request',
            path: '/dashboard/admin/withdrawal-request',
            icon: <ArrowDownToLine />
        },
        {
            name: 'Transaction History',
            path: '/dashboard/admin/transaction-history',
            icon: <History />
        },
        {
            name: 'Blog',
            path: '/dashboard/admin/manage-blog',
            icon: <FileText />
        },
        {
            name: 'Support Articles',
            path: '/dashboard/admin/manage-support-articles',
            icon: <HelpCircle />
        },
        {
            name: 'Recycle Bin',
            path: '/dashboard/admin/recycle-bin',
            icon: <Trash2 />
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
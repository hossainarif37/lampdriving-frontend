"use client"
import NavLink from '@/components/shared/NavLink';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import { ArrowDownToLine, BookOpen, Calendar, FileText, HelpCircle, History, LayoutDashboardIcon, Trash2, UserCheck, Users, Wallet } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface IRoute {
    name: string;
    path: string;
    icon: ReactNode;
    children?: {
        name: string;
        path: string;
    }[]
}

const MenuLinks = () => {
    const [openedGroup, setOpenedGroup] = useState<string>('')
    const { user } = useAppSelector(state => state.authSlice);

    const learnerRoutes: IRoute[] = [
        {
            name: 'Dashboard',
            path: '/dashboard/learner',
            icon: <LayoutDashboardIcon />
        },
        {
            name: 'Bookings',
            path: '#bookings',
            icon: <BookOpen />,
            children: [
                {
                    name: 'Pending Bookings',
                    path: '/dashboard/learner/manage-bookings/pending'
                },
                {
                    name: 'Accepted Bookings',
                    path: '/dashboard/learner/manage-bookings/accepted'
                },
                {
                    name: 'Completed Bookings',
                    path: '/dashboard/learner/manage-bookings/completed'
                },
                {
                    name: 'Cancelled Bookings',
                    path: '/dashboard/learner/manage-bookings/cancelled'
                }

            ]
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
            path: '#bookings',
            icon: <BookOpen />,
            children: [
                {
                    name: 'Pending Bookings',
                    path: '/dashboard/instructor/manage-bookings/pending'
                },
                {
                    name: 'Accepted Bookings',
                    path: '/dashboard/instructor/manage-bookings/accepted'
                },
                {
                    name: 'Completed Bookings',
                    path: '/dashboard/instructor/manage-bookings/completed'
                },
                {
                    name: 'Cancelled Bookings',
                    path: '/dashboard/instructor/manage-bookings/cancelled'
                }

            ]
        },
        {
            name: 'Availability',
            path: '/dashboard/instructor/manage-availability',
            icon: <Calendar />
        },
        {
            name: 'Payments',
            path: '#payments',
            icon: <Wallet />,
            children: [
                {
                    name: 'Wallet',
                    path: 'dashboard/instructor/payments/wallet'
                },
                {
                    name: 'Withdrawal Requests',
                    path: '/dashboard/instructor/payments/withdrawal-requests'
                },
                {
                    name: 'Approved Withdrawals',
                    path: '/dashboard/instructor/payments/approved-withdrawals'
                },
                {
                    name: 'Transaction History',
                    path: '/dashboard/instructor/payments/transaction-history'
                }
            ]
        },
    ];

    const adminRoutes: IRoute[] = [
        {
            name: 'Dashboard',
            path: '/dashboard/admin',
            icon: <LayoutDashboardIcon />
        },
        {
            name: 'Bookings',
            path: '#bookings',
            icon: <BookOpen />,
            children: [
                {
                    name: 'Pending Bookings',
                    path: '/dashboard/admin/manage-bookings/pending'
                },
                {
                    name: 'Accepted Bookings',
                    path: '/dashboard/admin/manage-bookings/accepted'
                },
                {
                    name: 'Completed Bookings',
                    path: '/dashboard/admin/manage-bookings/completed'
                },
                {
                    name: 'Cancelled Bookings',
                    path: '/dashboard/admin/manage-bookings/cancelled'
                }

            ]
        },
        {
            name: 'Instructors',
            path: '#instructors',
            icon: <UserCheck />,
            children: [
                {
                    name: 'Pending Instructors',
                    path: '/dashboard/admin/manage-instructors/pending'
                },
                {
                    name: 'Approved Instructors',
                    path: '/dashboard/admin/manage-instructors/approved'
                },
                {
                    name: 'Blocked Instructors',
                    path: '/dashboard/admin/manage-instructors/blocked'
                }
            ]
        },
        {
            name: 'Learners',
            path: '/dashboard/admin/manage-learners',
            icon: <Users />
        },
        {
            name: 'Payments',
            path: '#payments',
            icon: <Wallet />,
            children: [
                {
                    name: 'Wallet',
                    path: 'dashboard/admin/payments/wallet'
                },
                {
                    name: 'Withdrawal Requests',
                    path: '/dashboard/instructor/payments/withdrawal-requests'
                },
                {
                    name: 'Approved Withdrawals',
                    path: '/dashboard/instructor/payments/approved-withdrawals'
                },
                {
                    name: 'Transaction History',
                    path: '/dashboard/admin/payments/transaction-history'
                }
            ]
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


    const handleGroupRouteOpen = (path: string) => {
        if (path === openedGroup) {
            setOpenedGroup("");
            return;
        }
        setOpenedGroup(path);
    };

    const routes = user?.role === "admin" ? adminRoutes : user?.role === "instructor" ? instructorRoutes : learnerRoutes;

    return (
        <div>
            <div className='my-6'>
                <div className='flex flex-col gap-2 justify-center h-full my-2'>
                    {
                        routes.map((route, index) => (
                            <div key={index}>
                                {
                                    route.children ?
                                        <Button className='h-[40px] w-full justify-start px-3' variant={"sidebar"} onClick={() => handleGroupRouteOpen(route.path)}>
                                            {route.icon}
                                            {route.name}
                                        </Button>
                                        :
                                        <NavLink href={route.path} active='activeSidebar' other='sidebar'>
                                            {route.icon}
                                            {route.name}
                                        </NavLink>
                                }
                                {
                                    (route.children && openedGroup === route.path) && (
                                        <div className={`ml-[18px] pl-1 border-l-2 transition-all duration-300 origin-top transform ${openedGroup === route.path ? "scale-y-100" : "scale-y-0"}`}>
                                            {
                                                route.children.map((route, index) => (
                                                    <NavLink key={index} href={route.path} active='activeSidebar' other='sidebar'>
                                                        {route.name}
                                                    </NavLink>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MenuLinks;
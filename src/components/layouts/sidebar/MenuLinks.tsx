"use client"
import NavLink from '@/components/shared/NavLink';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import { BookOpen, Calendar, ChevronDown, FileText, HelpCircle, History, LayoutDashboardIcon, Trash2, UserCheck, Users, Wallet } from 'lucide-react';
import { ReactNode, useState, useRef } from 'react';

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
    const childRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // learner routes
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

    // instructor routes
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
                    path: '/dashboard/instructor/payments/wallet'
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

    // admin routes
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
                    path: '/dashboard/admin/payments/wallet'
                },
                {
                    name: 'Withdrawal Requests',
                    path: '/dashboard/admin/payments/withdrawal-requests'
                },
                {
                    name: 'Approved Withdrawals',
                    path: '/dashboard/admin/payments/approved-withdrawals'
                },
                {
                    name: 'Transaction History',
                    path: '/dashboard/admin/payments/transaction-history'
                }
            ]
        },
        {
            name: 'Blogs',
            path: '/dashboard/admin/manage-blogs',
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

    // routes based on user role
    const routes = user?.role === "admin" ? adminRoutes : user?.role === "instructor" ? instructorRoutes : learnerRoutes;


    const handleGroupRouteOpen = (path: string) => {
        setOpenedGroup(path === openedGroup ? "" : path);
    };

    const getSubMenuHeight = (path: string): string => {
        if (!openedGroup || openedGroup !== path) return '0px';
        const element = childRefs.current[path];
        if (!element) return '0px';
        return `${element.scrollHeight}px`;
    };

    return (
        <div>
            <div className='flex flex-col justify-center h-full my-2'>
                {routes.map((route, index) => (
                    <div key={index}>
                        {route.children ? (
                            <>
                                <Button
                                    className={`h-[40px] w-full justify-start px-3 group capitalize mb-2`}
                                    variant={"sidebar"}
                                    onClick={() => handleGroupRouteOpen(route.path)}
                                >
                                    <span className="flex items-center gap-2">
                                        {route.icon}
                                        {route.name}
                                    </span>
                                    <ChevronDown
                                        className={`ml-auto transform transition-transform duration-200 ${openedGroup === route.path ? 'rotate-180' : ''
                                            }`}
                                    />
                                </Button>
                                <div
                                    ref={el => {
                                        childRefs.current[route.path] = el;
                                    }}
                                    className={`overflow-hidden transition-all duration-300 ease-in-out`}
                                    style={{
                                        height: getSubMenuHeight(route.path),
                                        opacity: openedGroup === route.path ? 1 : 0,
                                    }}
                                >
                                    <div className='ml-[18px] pl-1 my-2 border-l-2 flex flex-col gap-2'>
                                        {route.children.map((childRoute, index) => (
                                            <NavLink
                                                key={index}
                                                href={childRoute.path}
                                                active='activeSidebar'
                                                other='sidebar'
                                            >
                                                {childRoute.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <NavLink href={route.path} active='activeSidebar' other='sidebar' className='mb-2'>
                                {route.icon}
                                {route.name}
                            </NavLink>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default MenuLinks;
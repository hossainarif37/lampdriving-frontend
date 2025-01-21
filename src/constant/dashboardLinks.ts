import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { BookOpen, Calendar, FileText, HelpCircle, History, LayoutDashboardIcon, LucideProps, Trash2, UserCheck, Users, Wallet } from 'lucide-react';

interface IRoute {
    name: string;
    path: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    children?: {
        name: string;
        path: string;
    }[]
}

// learner routes
export const learnerRoutes: IRoute[] = [
    {
        name: 'Dashboard',
        path: '/dashboard/learner',
        icon: LayoutDashboardIcon
    },
    {
        name: 'Bookings',
        path: '#bookings',
        icon: BookOpen,
        children: [
            {
                name: 'Upcoming Bookings',
                path: '/dashboard/learner/manage-bookings/upcoming'
            },
            {
                name: 'Ongoing Bookings',
                path: '/dashboard/learner/manage-bookings/ongoing'
            },
            {
                name: 'Completed Bookings',
                path: '/dashboard/learner/manage-bookings/completed'
            },
            {
                name: 'Refunded Bookings',
                path: '/dashboard/learner/manage-bookings/refunded'
            }
        ]
    },
    {
        name: 'Transaction History',
        path: '/dashboard/learner/transaction-history',
        icon: History
    }
];

// instructor routes
export const instructorRoutes: IRoute[] = [
    {
        name: 'Dashboard',
        path: '/dashboard/instructor',
        icon: LayoutDashboardIcon
    },
    {
        name: 'Bookings',
        path: '#bookings',
        icon: BookOpen,
        children: [
            {
                name: 'Upcoming Bookings',
                path: '/dashboard/instructor/manage-bookings/upcoming'
            },
            {
                name: 'Ongoing Bookings',
                path: '/dashboard/instructor/manage-bookings/ongoing'
            },
            {
                name: 'Completed Bookings',
                path: '/dashboard/instructor/manage-bookings/completed'
            }
        ]
    },
    {
        name: 'Availability',
        path: '/dashboard/instructor/manage-availability',
        icon: Calendar
    },
    {
        name: 'Payments',
        path: '#payments',
        icon: Wallet,
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
export const adminRoutes: IRoute[] = [
    {
        name: 'Dashboard',
        path: '/dashboard/admin',
        icon: LayoutDashboardIcon
    },
    {
        name: 'Bookings',
        path: '#bookings',
        icon: BookOpen,
        children: [
            {
                name: 'Upcoming Bookings',
                path: '/dashboard/admin/manage-bookings/upcoming'
            },
            {
                name: 'Ongoing Bookings',
                path: '/dashboard/admin/manage-bookings/ongoing'
            },
            {
                name: 'Completed Bookings',
                path: '/dashboard/admin/manage-bookings/completed'
            },
            {
                name: 'Refunded Bookings',
                path: '/dashboard/admin/manage-bookings/refunded'
            }
        ]
    },
    {
        name: 'Instructors',
        path: '#instructors',
        icon: UserCheck,
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
        icon: Users

    },
    {
        name: 'Payments',
        path: '#payments',
        icon: Wallet,
        children: [
            {
                name: 'Wallet',
                path: '/dashboard/admin/payments/wallet'
            },
            {
                name: 'Instructor Payouts',
                path: '/dashboard/admin/payments/instructor-payouts'
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
        icon: FileText
    },
    {
        name: 'Support Articles',
        path: '/dashboard/admin/manage-support-articles',
        icon: HelpCircle
    },
    {
        name: 'Recycle Bin',
        path: '/dashboard/admin/recycle-bin',
        icon: Trash2
    }
];
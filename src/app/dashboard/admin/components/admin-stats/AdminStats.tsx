"use client"
import { FC } from 'react';
import React, { useState } from 'react';
import DashboardStats from './DashboardStats';
import BookingFilters from './BookingFilters';
import BookingList from './BookingList';
// import BookingCalendar from './BookingCalendar';
import { useAppSelector } from '@/redux/hook';
import BookingCalendar from './BookingCalendar';

// Define the Booking type
type Booking = {
    id: string;
    studentName: string;
    date: string;
    time: string;
    status: 'running' | 'completed';
    instructor: string;
};

// Sample data with more bookings
const runningBookings: Booking[] = [
    {
        id: '1',
        studentName: 'John Doe',
        date: '2024-03-15',
        time: '10:00 AM',
        status: 'running',
        instructor: 'Mike Johnson'
    },
    {
        id: '2',
        studentName: 'Jane Smith',
        date: '2024-03-15',
        time: '2:00 PM',
        status: 'running',
        instructor: 'Sarah Wilson'
    },
    {
        id: '5',
        studentName: 'Emma Davis',
        date: '2024-03-15',
        time: '3:30 PM',
        status: 'running',
        instructor: 'Mike Johnson'
    },
    {
        id: '6',
        studentName: 'Michael Brown',
        date: '2024-03-15',
        time: '4:45 PM',
        status: 'running',
        instructor: 'Sarah Wilson'
    }
] as const;

const pastBookings: Booking[] = [
    {
        id: '3',
        studentName: 'Alice Brown',
        date: '2024-03-14',
        time: '11:00 AM',
        status: 'completed' as const,
        instructor: 'Mike Johnson'
    },
    {
        id: '4',
        studentName: 'Bob Wilson',
        date: '2024-03-14',
        time: '3:00 PM',
        status: 'completed' as const,
        instructor: 'Sarah Wilson'
    },
    {
        id: '7',
        studentName: 'Sophie Turner',
        date: '2024-03-14',
        time: '1:15 PM',
        status: 'completed' as const,
        instructor: 'Mike Johnson'
    },
    {
        id: '8',
        studentName: 'James Miller',
        date: '2024-03-14',
        time: '5:00 PM',
        status: 'completed' as const,
        instructor: 'Sarah Wilson'
    }
];

const AdminStats: FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const { user } = useAppSelector(state => state.authSlice);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto px-6 py-8 bg-gray-50">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-secondary mb-2">
                        Welcome back, {user?.name?.firstName}!
                    </h1>
                    <p className="text-accent">
                        Here's what's happening with your driving school today.
                    </p>
                </div>

                <div className="mb-8">
                    <DashboardStats />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <BookingFilters
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                        />
                        {(activeFilter === 'all' || activeFilter === 'running') && (
                            <BookingList title="Running Bookings" bookings={runningBookings} />
                        )}
                        {(activeFilter === 'all' || activeFilter === 'past') && (
                            <BookingList title="Past Bookings" bookings={pastBookings} />
                        )}
                    </div>
                    <div>
                        <BookingCalendar />
                        {/* <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
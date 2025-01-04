/* eslint-disable react/no-unescaped-entities */
"use client";
import { FC, useState } from "react";
import DashboardStats from "./DashboardStats";
import BookingFilters from "./BookingFilters";
import BookingCalendar from "./BookingCalendar";
import { useAppSelector } from "@/redux/hook";
import { BookingList } from "./BookingList";

// Define the Booking type
type Booking = {
    id: string;
    studentName: string;
    date: string;
    time: string;
    status: "running" | "completed";
    instructor: string;
};

// Sample data for bookings
const inisialRunningBookings: Booking[] = [
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
];

const inisialPastBookings: Booking[] = [
    {
        id: '3',
        studentName: 'Alice Brown',
        date: '2024-03-14',
        time: '11:00 AM',
        status: 'completed',
        instructor: 'Mike Johnson'
    },
    {
        id: '4',
        studentName: 'Bob Wilson',
        date: '2024-03-14',
        time: '3:00 PM',
        status: 'completed',
        instructor: 'Sarah Wilson'
    },
    {
        id: '7',
        studentName: 'Sophie Turner',
        date: '2024-03-14',
        time: '1:15 PM',
        status: 'completed',
        instructor: 'Mike Johnson'
    },
    {
        id: '8',
        studentName: 'James Miller',
        date: '2024-03-14',
        time: '5:00 PM',
        status: 'completed',
        instructor: 'Sarah Wilson'
    }
];

const AdminStats: FC = () => {
    const { user } = useAppSelector(state => state.authSlice);
    const [activeFilter, setActiveFilter] = useState('running');
    const [runningBookings, setRunningBookings] = useState(inisialRunningBookings);
    const [pastBookings, setPastBookings] = useState(inisialPastBookings);




    const handleConfirm = (bookingId: string) => {
        const bookingToMove = runningBookings.find(booking => booking.id === bookingId);
        if (bookingToMove) {
            // Remove from running bookings
            setRunningBookings(prev => prev.filter(booking => booking.id !== bookingId));

            // Add to past bookings with completed status
            setPastBookings(prev => [{
                ...bookingToMove,
                status: 'completed'
            }, ...prev]);
        }
    };

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
                        {/* Booking Filters */}
                        <div className="flex justify-end">
                            <BookingFilters
                                activeFilter={activeFilter}
                                onFilterChange={setActiveFilter}
                            />
                        </div>
                        {activeFilter === 'running' && (
                            <BookingList bookings={runningBookings} onConfirm={handleConfirm} />
                        )}
                        {activeFilter === 'past' && (
                            <BookingList bookings={pastBookings} onConfirm={handleConfirm} />

                        )}
                    </div>
                    <div>
                        <BookingCalendar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;

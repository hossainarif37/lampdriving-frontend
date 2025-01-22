import React from 'react';
import { Clock, CheckCircle, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { IUser } from '@/types/user';

type Learner = {
    id: string;
    user: IUser;
}

type Booking = {
    id: string;
    learner: Learner;
    instructor: string | IUser;
    bookingHours: number;
    schedules: string[];
    price: number;
    status: "upcoming" | "ongoing" | "completed";
    paymentId: string;
    createdAt: string;
    updatedAt: string;
};

interface BookingListProps {
    // title: string;
    bookings: Booking[];
}

export const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
    console.log('Bookings', bookings);
    return (
        <div className="bg-white rounded-lg shadow-sm">
            <h1 className="text-xl font-semibold text-primary pt-6 px-6">Recent Bookings</h1>

            <div className="divide-y">
                {bookings.map((booking: Booking) => (
                    <div
                        key={booking.id}
                        className="p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-medium text-gray-900">{typeof booking?.learner === 'object' ? booking?.learner?.user?.name?.firstName : booking?.learner}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    {/* <span>{booking.schedules}</span> */}
                                    <span>{booking.bookingHours}h</span>
                                </div>
                            </div>
                            <div>
                                <button
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${booking.status === 'completed' && 'bg-green-100 text-green-700' || booking.status === 'ongoing' && 'bg-orange-100 text-orange-700' || 'bg-blue-100 text-blue-700'}`}
                                >
                                    {booking.status}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
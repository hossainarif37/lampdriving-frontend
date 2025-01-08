import React from 'react';
import { Clock, CheckCircle, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface Booking {
    id: string;
    studentName: string;
    date: string;
    time: string;
    status: 'running' | 'completed';
    instructor: string;
}

interface BookingListProps {
    // title: string;
    bookings: Booking[];
    onConfirm: (bookingId: string) => void;
}

export const BookingList: React.FC<BookingListProps> = ({ bookings, onConfirm }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm">
            {/* <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div> */}

            <div className="divide-y">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-medium text-gray-900">{booking.studentName}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>{booking.time}</span>
                                    <span>•</span>
                                    <span>2h</span>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => onConfirm(booking.id)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
                    ${booking.status === 'completed'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-200 text-primary hover:bg-red-200'}`}
                                >
                                    {booking.status === 'completed' ? 'completed' : 'running'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
import { FC } from 'react';
import React from 'react';
import { Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Booking {
    id: string;
    studentName: string;
    date: string;
    time: string;
    status: 'running' | 'completed';
    instructor: string;
}

interface IBookingListProps {
    title: string;
    bookings: Booking[];
}

const BookingList: FC<IBookingListProps> = ({ title, bookings }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm" >
            <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-secondary">{title}</h2>
            </div>

            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-secondary">{booking.studentName}</h3>
                                <p className="text-sm text-accent">
                                    {booking.date} at {booking.time}
                                </p>
                                <p className="text-sm text-accent">
                                    Instructor: {booking.instructor}
                                </p>
                            </div>
                            <div className={`flex items-center ${booking.status === 'running' ? 'text-orange-500' : 'text-green-500'
                                }`}>
                                {booking.status === 'running' ? (
                                    <Clock size={20} className="mr-1" />
                                ) : (
                                    <CheckCircle size={20} className="mr-1" />
                                )}
                                <span className="capitalize">{booking.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Showing {bookings.length} bookings
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div> */}
        </div>
    );
};

export default BookingList;
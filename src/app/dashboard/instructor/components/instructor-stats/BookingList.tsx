import React from 'react';
import { Clock, User } from 'lucide-react';

interface Booking {
  id: number;
  studentName: string;
  date: string;
  time: string;
  duration: string;
  status: string;
}

interface BookingsListProps {
  title: string;
  bookings: Booking[];
  type: 'running' | 'past';
  selectedDate: Date | null;
}

export function BookingsList({ title, bookings, type, selectedDate }: BookingsListProps) {
  const filteredBookings = selectedDate
    ? bookings.filter(booking => booking.date === selectedDate.toISOString().split('T')[0])
    : bookings;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {filteredBookings.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No bookings found</p>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${type === 'running' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                  <User className={`h-5 w-5 ${type === 'running' ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{booking.studentName}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{booking.time}</span>
                    <span>-</span>
                    <span>{booking.duration}h</span>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${type === 'running'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
                }`}>
                {booking.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
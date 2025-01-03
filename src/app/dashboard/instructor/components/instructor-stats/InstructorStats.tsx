"use client"

import { FC, useState } from 'react';
import { BookingsList } from './BookingList';
import { 
  Calendar as CalendarIcon, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  DollarSign,
  GraduationCap
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { Calendar } from './Calendar';
import { useAppSelector } from '@/redux/hook';

// Mock data - In a real app, this would come from an API
const stats = {
  totalBookings: 156,
  completedBookings: 134,
  totalLessons: 245,
  runningBookings: 22,
  totalEarnings: 12450
};

const runningBookings = [
  { id: 1, studentName: "John Doe", date: "2024-03-20", time: "10:00 AM", duration: "2h", status: "confirmed" },
  { id: 2, studentName: "Jane Smith", date: "2024-03-20", time: "2:00 PM", duration: "1h", status: "confirmed" },
  { id: 3, studentName: "Jane Smith", date: "2024-03-20", time: "2:00 PM", duration: "1h", status: "confirmed" },
  { id: 4, studentName: "Jane Smith", date: "2024-03-20", time: "2:00 PM", duration: "1h", status: "confirmed" },
];

const pastBookings = [
  { id: 3, studentName: "Mike Johnson", date: "2024-03-19", time: "11:00 AM", duration: "1h", status: "completed" },
  { id: 4, studentName: "Sarah Wilson", date: "2024-03-19", time: "3:00 PM", duration: "2h", status: "completed" },
  { id: 5, studentName: "Sarah Wilson", date: "2024-03-19", time: "3:00 PM", duration: "2h", status: "completed" },
  { id: 6, studentName: "Sarah Wilson", date: "2024-03-19", time: "3:00 PM", duration: "2h", status: "completed" },
];


const InstructorStats: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const {user} = useAppSelector(state=>state.authSlice);
    console.log('user', user);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.firstName}!</h1>
              <p className="text-gray-500">Here&apos;s what&apos;s happening with your lessons today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatsCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<BookOpen className="h-6 w-6 text-blue-600" />}
            trend="+12% from last month"
          />
          <StatsCard
            title="Completed"
            value={stats.completedBookings}
            icon={<CheckCircle className="h-6 w-6 text-green-600" />}
            trend="+8% from last month"
          />
          <StatsCard
            title="Total Lessons"
            value={stats.totalLessons}
            icon={<GraduationCap className="h-6 w-6 text-purple-600" />}
            trend="+15% from last month"
          />
          <StatsCard
            title="Running Bookings"
            value={stats.runningBookings}
            icon={<Clock className="h-6 w-6 text-orange-600" />}
            trend="Current active"
          />
          <StatsCard
            title="Total Earnings"
            value={`$${stats.totalEarnings}`}
            icon={<DollarSign className="h-6 w-6 text-emerald-600" />}
            trend="+18% from last month"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
              <CalendarIcon className="h-5 w-5 text-gray-500" />
            </div>
            <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
          </div>

          {/* Bookings Lists */}
          <div className="lg:col-span-2 space-y-6">
            <BookingsList 
              title="Running Bookings" 
              bookings={runningBookings} 
              type="running"
              selectedDate={selectedDate}
            />
            {/* <BookingsList 
              title="Past Bookings" 
              bookings={pastBookings} 
              type="past"
              selectedDate={selectedDate}
            /> */}
          </div>
        </div>
      </div>
    </div>
    );
};

export default InstructorStats;
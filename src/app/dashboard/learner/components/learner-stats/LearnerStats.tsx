"use client"
import { FC } from 'react';
import React from 'react';
import { Clock, DollarSign, BookOpen, Calendar, Award, History, Package } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import personImg from "@/assets/person_1.jpg"
import { useAppSelector } from '@/redux/hook';
import { Button } from '@/components/ui/button';
import PackageCard from './PackageCard';
import StatsCard from '@/app/dashboard/shared/StatsCard';

interface BookingStats {
  totalBookings: number;
  totalHours: number;
  totalSpent: number;
}

interface Instructor {
  id: string;
  name: string;
  rating: number;
  specialization: string;
  imageUrl: StaticImageData;
}

const stats: BookingStats = {
  totalBookings: 12,
  totalHours: 24,
  totalSpent: 1200,
};

const instructor: Instructor = {
  id: '1',
  name: 'John Doe',
  rating: 4.9,
  specialization: 'Defensive Driving Expert',
  imageUrl: personImg,
};

const statsData = [
  {
    id: 1,
    title: "Total Bookings",
    value: stats.totalBookings,
    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Total Hours",
    value: `${stats.totalHours}h`,
    icon: <Clock className="h-6 w-6 text-green-600" />,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Total Spent",
    value: `$${stats.totalSpent}`,
    icon: <DollarSign className="h-6 w-6 text-purple-600" />,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

const upcomingLessons = [
  {
    id: 1,
    time: "Tomorrow, 2:00 PM",
    details: `2-hour lesson with ${instructor.name}`,
    borderColor: "border-blue-600",
  },
  {
    id: 2,
    time: "Next Week, 10:00 AM",
    details: `1-hour lesson with ${instructor.name}`,
    borderColor: "border-blue-600",
  },
];

const pastLessons = [
  {
    id: 1,
    time: "Last Week",
    details: "Completed 2-hour lesson",
    borderColor: "border-gray-200",
  },
  {
    id: 2,
    time: "Two Weeks Ago",
    details: "Completed 1-hour lesson",
    borderColor: "border-gray-200",
  },
];

const packages = [
  { hours: 1, price: 50, savings: '0%' },
  { hours: 2, price: 95, savings: '5%' },
  { hours: 3, price: 135, savings: '10%' },
];


const LearnerStats: FC = () => {
  const { user } = useAppSelector(state => state.authSlice);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">Welcome back, {user?.name?.firstName}! 👋</h1>
        <p className="text-accent mt-2">Track your learning progress and manage your driving lessons</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.id}
            bgColor={stat.bgColor}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      {/* Instructor Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Instructor</h2>
        <div className="md:flex items-center space-y-4">
          <Image
            src={instructor.imageUrl}
            alt={instructor.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{instructor.name}</h3>
            <p className="text-gray-600 text-sm">{instructor.specialization}</p>
            <div className="flex items-center mt-1">
              <Award className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">{instructor.rating} rating</span>
            </div>
          </div>
          <div className="space-x-3">
            <Button size="lg" className="bg-indigo hover:bg-indigo/90">
              Book Lesson
            </Button>
            <Button size="lg">
              Change Instructor
            </Button>
          </div>
        </div>
      </div>

      {/* Bookings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Lessons */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Upcoming Lessons</h2>
          </div>
          <div className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div key={lesson.id} className={`border-l-4 ${lesson.borderColor} pl-4`}>
                <p className="font-semibold">{lesson.time}</p>
                <p className="text-sm text-gray-600">{lesson.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Past Lessons */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <History className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Past Lessons</h2>
          </div>
          <div className="space-y-4">
            {pastLessons.map((lesson) => (
              <div key={lesson.id} className={`border-l-4 ${lesson.borderColor} pl-4`}>
                <p className="font-semibold">{lesson.time}</p>
                <p className="text-sm text-gray-600">{lesson.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="bg-light rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Package className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-xl font-bold text-secondary">Recommended Packages</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.hours} packageCardInfo={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnerStats;
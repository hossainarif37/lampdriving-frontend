"use client"

import { FC } from 'react';
import React from 'react';
import { Clock, DollarSign, BookOpen, Calendar, Award, History } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import placeHolderImage from "@/assets/placeholder_user.svg"
import { useAppSelector } from '@/redux/hook';
import StatsCard from '@/app/dashboard/shared/StatsCard';
import { useGetLearnerStatsQuery } from '@/redux/api/statsApi/statsApi';
import LearnerStatsSkeleton from './LearnerStatsSkeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGetLearnerSchedulesQuery } from '@/redux/api/scheduleApi/scheduleApi';

interface Instructor {
  id: string;
  name: string;
  experience: number;
  imageUrl: StaticImageData;
  username: string;
}



const LearnerStats: FC = () => {
  const { user } = useAppSelector(state => state.authSlice);
  const learnerId = React.useMemo(() => {
    return typeof user?.learner === 'string' ?
      user?.learner :
      user?.learner?._id;
  }, [user?.learner]);

  const { data: learnerStats, isLoading } = useGetLearnerStatsQuery({
    learnerId: learnerId || ""
  }, {
    skip: !learnerId
  });

  const { data: learnerSchedules, isLoading: isLoadingSchedules } = useGetLearnerSchedulesQuery({ learnerId }, {
    skip: !learnerId
  });


  if (isLoading || isLoadingSchedules) {
    return <LearnerStatsSkeleton />
  }

  const instructor: Instructor = {
    id: learnerSchedules?.data?.result[0]?.instructor?._id || '',
    name: learnerSchedules?.data?.result[0]?.instructor?.user?.name?.fullName || '',
    experience: learnerSchedules?.data?.result[0]?.instructor?.experience || 0,
    imageUrl: learnerSchedules?.data?.result[0]?.instructor?.user?.profileImg || placeHolderImage,
    username: learnerSchedules?.data?.result[0]?.instructor?.user?.username || ''
  };

  console.log('learnerStats', learnerStats);
  console.log('learnerSchedules', learnerSchedules);

  const statsData = [
    {
      id: 1,
      title: "Total Bookings",
      value: learnerStats?.data?.totalBookings || 0,
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Total Lessons",
      value: learnerStats?.data?.totalLessons || 0,
      icon: <Clock className="h-6 w-6 text-green-600" />,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      title: "Total Expenses",
      value: `$${learnerStats?.data?.totalExpenses || 0}`,
      icon: <DollarSign className="h-6 w-6 text-purple-600" />,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const hasUpcomingOrOngoingBookings =
    (learnerStats?.data?.upcomingBookings || 0) > 0 ||
    (learnerStats?.data?.ongoingBookings || 0) > 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard-wrapper p-3 lg:p-6">

      {
        !hasUpcomingOrOngoingBookings && <div className='mb-6 flex'>
          <Link href="/instructors" className="text-primary hover:underline">
            <Button variant={"secondary"}>Book a Lesson</Button>
          </Link>
        </div>
      }

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
      {hasUpcomingOrOngoingBookings && (
        <div className="bg-white rounded-xl border p-6 mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Instructor</h2>
            <div className="flex items-center">
              <Image
                src={instructor.imageUrl}
                alt={instructor.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{instructor.name}</h3>
                <div className="flex items-center mt-1">
                  <Award className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">{instructor.experience} years of experience</span>
                </div>
              </div>
            </div>

          </div>
          <Link href={`/instructors/${instructor.username}`} className="text-primary hover:underline">
            <Button variant={"secondary"}>View Instructor Profile</Button>
          </Link>
        </div>
      )}

      {/* Bookings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Lessons */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Upcoming Lessons</h2>
          </div>
          <div className="space-y-4">
            {learnerSchedules?.data?.result?.map((schedule: any) => (
              <div key={schedule._id} className="border-l-4 border-blue-600 pl-4">
                <p className="font-semibold">{formatDate(schedule.date)}</p>
                <p className="text-sm text-gray-600">
                  {schedule.duration}-hour lesson at {schedule.pickupAddress.address}, {schedule.pickupAddress.suburb}
                </p>
              </div>
            ))}
            {(learnerSchedules?.data?.result.length === 0) && (
              <p className="text-gray-600">No upcoming lessons scheduled</p>
            )}
          </div>
        </div>

        {/* Completed Lessons */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center mb-4">
            <History className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Completed Lessons</h2>
          </div>
          <div className="space-y-4">
            {learnerStats?.data?.completedBookings === 0 ? (
              <p className="text-gray-600">No completed lessons yet</p>
            ) : (
              <div className="border-l-4 border-gray-200 pl-4">
                <p className="font-semibold">Total Completed</p>
                <p className="text-sm text-gray-600">
                  {learnerStats?.data?.completedBookings} lesson{learnerStats?.data?.completedBookings !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerStats;
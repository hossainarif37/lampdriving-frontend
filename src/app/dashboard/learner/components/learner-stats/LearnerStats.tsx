import { FC } from 'react';
import React from 'react';
import { Clock, DollarSign, BookOpen, Calendar, Award, History, Package } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import personImg from "@/assets/person_1.jpg"

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

const packages = [
  { hours: 1, price: 50, savings: '0%' },
  { hours: 2, price: 95, savings: '5%' },
  { hours: 3, price: 135, savings: '10%' },
];

const LearnerStats: FC = () => {
  // Implement the sum function
  

    return (
        <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex! 👋</h1>
        <p className="text-gray-600 mt-2">Track your learning progress and manage your driving lessons</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Hours</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">${stats.totalSpent}</p>
          </div>
        </div>
      </div>

      {/* Instructor Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Instructor</h2>
        <div className="flex items-center">
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Book Lesson
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Change Instructor
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Upcoming Lessons</h2>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">Tomorrow, 2:00 PM</p>
              <p className="text-sm text-gray-600">2-hour lesson with {instructor.name}</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-semibold">Next Week, 10:00 AM</p>
              <p className="text-sm text-gray-600">1-hour lesson with {instructor.name}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <History className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Past Lessons</h2>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-gray-200 pl-4">
              <p className="font-semibold">Last Week</p>
              <p className="text-sm text-gray-600">Completed 2-hour lesson</p>
            </div>
            <div className="border-l-4 border-gray-200 pl-4">
              <p className="font-semibold">Two Weeks Ago</p>
              <p className="text-sm text-gray-600">Completed 1-hour lesson</p>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Package className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Recommended Packages</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.hours} className="border rounded-lg p-4 text-center hover:border-blue-600 transition-colors">
              <h3 className="text-xl font-bold text-gray-900">{pkg.hours} Hour{pkg.hours > 1 ? 's' : ''}</h3>
              <p className="text-3xl font-bold text-blue-600 my-2">${pkg.price}</p>
              <p className="text-sm text-gray-600 mb-4">Save {pkg.savings}</p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Purchase Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default LearnerStats;
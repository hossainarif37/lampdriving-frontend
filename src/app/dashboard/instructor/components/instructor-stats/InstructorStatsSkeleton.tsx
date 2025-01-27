import React, { FC } from 'react';

const HeaderSkeleton: FC = () => (
    <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div>
                    <div className="h-8 w-64 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-5 w-80 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

const StatsCardSkeleton: FC = () => (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>
        </div>
    </div>
);

const CalendarSkeleton: FC = () => (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {[...Array(35)].map((_, i) => (
                    <div key={i} className="aspect-square flex items-center justify-center">
                        <div className="w-4 h-6 bg-gray-200 rounded-2xl animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const BookingListSkeleton: FC = () => (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="space-y-4">
            {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
            ))}
        </div>
    </div>
);

const InstructorStatsSkeleton: FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <HeaderSkeleton />

            <div className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    {[...Array(5)].map((_, i) => (
                        <StatsCardSkeleton key={i} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <CalendarSkeleton />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <BookingListSkeleton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorStatsSkeleton;
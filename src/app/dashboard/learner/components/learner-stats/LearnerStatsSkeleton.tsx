import { FC } from 'react';

const StatsCardSkeleton: FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse"></div>
            <div className="space-y-2 flex-1">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    </div>
);

const InstructorCardSkeleton: FC = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mr-4"></div>
            <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    </div>
);

const BookingSectionSkeleton: FC = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-4">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mr-2"></div>
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
            {[1, 2].map((item) => (
                <div key={item} className="border-l-4 border-gray-200 pl-4">
                    <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    </div>
);

const LearnerStatsSkeleton: FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Welcome Section */}
            <div className="mb-8 space-y-2">
                <div className="h-9 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-96 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((item) => (
                    <StatsCardSkeleton key={item} />
                ))}
            </div>

            {/* Instructor Section */}
            <InstructorCardSkeleton />

            {/* Bookings Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BookingSectionSkeleton />
                <BookingSectionSkeleton />
            </div>
        </div>
    );
};

export default LearnerStatsSkeleton;
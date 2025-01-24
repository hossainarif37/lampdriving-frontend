import { FC } from 'react';

const HeaderSkeleton: FC = () => (
    <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
    </div>
);

const StatsCardSkeleton: FC = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="space-y-2 flex-1">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    </div>
);

const ChartSkeleton: FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-2 mb-6">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
    </div>
);

const BookingListSkeleton: FC = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="space-y-4">
            {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
            ))}
        </div>
    </div>
);

const AdminStatsSkeleton: FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto px-6 py-8 bg-gray-50">
                <HeaderSkeleton />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {[...Array(7)].map((_, index) => (
                        <StatsCardSkeleton key={index} />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ChartSkeleton />
                    <BookingListSkeleton />
                </div>
            </div>
        </div>
    );
};

export default AdminStatsSkeleton;
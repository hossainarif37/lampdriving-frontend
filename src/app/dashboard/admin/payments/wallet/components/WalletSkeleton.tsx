import React, { FC } from 'react';

const HeaderSkeleton : FC = () => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
                <div className="w-64 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-48 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-48 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
    );
};

const CardSkeleton: FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="mt-4 space-y-2">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-28 h-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
    </div>
);

const ChartSkeleton: FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
                <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-64 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
        <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
    </div>
);

const WalletSkeleton: FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="space-y-6">
                <HeaderSkeleton />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <CardSkeleton key={item} />
                    ))}
                </div>
                <ChartSkeleton />
            </div>
        </div>
    );
};

export default WalletSkeleton;
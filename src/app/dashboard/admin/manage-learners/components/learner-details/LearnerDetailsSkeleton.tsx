import { FC } from 'react';

const ProfileSkeleton: FC = () => (
    <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-4 relative">
            <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
            </div>
            <div className="flex-1">
                <div className="absolute right-3 top-3 w-16 h-5 rounded-md bg-gray-200 animate-pulse"></div>
                <div className="space-y-2">
                    <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

const InfoCardSkeleton: FC = () => (
    <div className="border rounded-xl p-4 col-span-2">
        <div className="flex items-start gap-3">
            <div className="mt-1">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2 flex-1">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-44 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    </div>
);

const LearnerDetailsSkeleton: FC = () => {
    return (
        <div className="space-y-6 h-96 overflow-y-auto thin-scrollbar px-2 py-4">
            <ProfileSkeleton />

            <div className="grid md:grid-cols-2 gap-4">
                <InfoCardSkeleton />
                <InfoCardSkeleton />
            </div>
        </div>
    );
};

export default LearnerDetailsSkeleton;
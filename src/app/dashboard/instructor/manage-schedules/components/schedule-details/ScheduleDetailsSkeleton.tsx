import { FC } from 'react';

const ParticipantCardSkeleton: FC = () => (
    <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-4 relative">
            <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
            </div>
            <div className="flex-1">
                <div className="absolute right-3 top-3 w-20 h-5 rounded-md bg-gray-200 animate-pulse"></div>
                <div className="w-48 h-5 mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </div>
    </div>
);

const InfoCardSkeleton: FC<{ hasStatus?: boolean }> = ({ hasStatus = false }) => (
    <div className="border rounded-xl p-4 relative">
        <div className="flex items-start gap-3">
            <div className="mt-1 w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex-1">
                <div className="w-32 h-5 mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                    <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-36 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
            {hasStatus && (
                <div className="absolute right-3 top-3 w-20 h-5 rounded-md bg-gray-200 animate-pulse"></div>
            )}
        </div>
    </div>
);

const ScheduleDetailsSkeleton: FC = () => {
    return (
        <div className="space-y-6 h-96 overflow-y-auto thin-scrollbar px-2 py-4">
            {/* Participants Section */}
            <div className="grid md:grid-cols-2 gap-6">
                <ParticipantCardSkeleton />
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {/* Location Cards */}
                <div className="col-span-2">
                    <InfoCardSkeleton />
                </div>

                {/* Date, Time, Booking Info */}
                <InfoCardSkeleton />
                <InfoCardSkeleton hasStatus={true} />
                <InfoCardSkeleton />
                <InfoCardSkeleton />
            </div>
        </div>
    );
};

export default ScheduleDetailsSkeleton;
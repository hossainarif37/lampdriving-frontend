import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const BookingDetailsSkeleton: FC = () => {
    return (
        <div className="space-y-6 h-96 overflow-y-auto thin-scrollbar px-2 py-4">
            {/* Learner & Instructor Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {[1, 2].map((item) => (
                    <div key={item} className="flex items-start space-x-4 border rounded-md p-4">
                        <Skeleton className="size-16 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Booking Info */}
            <div className="grid gap-4 border-y py-4">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                ))}
            </div>

            {/* Schedules */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-40" />

                {[1, 2].map((item) => (
                    <div key={item} className='border rounded-md'>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-5 w-32" />
                                <div className="space-x-2">
                                    <Skeleton className="inline-block h-5 w-20" />
                                    <Skeleton className="inline-block h-5 w-20" />
                                </div>
                            </div>

                            <Skeleton className="h-5 w-40" />

                            <div className="space-y-4">
                                <div className="flex items-start space-x-2">
                                    <Skeleton className="h-4 w-4 text-muted-foreground mt-1" />
                                    <div className="flex-1 space-y-1">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-64" />
                                    </div>
                                </div>

                                <div className="flex items-start space-x-2">
                                    <div className="w-4 flex justify-center">
                                        <Skeleton className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-64" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingDetailsSkeleton;
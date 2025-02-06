import { Skeleton } from "@/components/ui/skeleton";

const InstructorDetailsSkeleton = () => {
    return (
        <main className="wrapper py-8">
            <div className="grid md:grid-cols-12 gap-8">
                {/* Main content skeleton */}
                <div className="md:col-span-7">
                    <div className="bg-light rounded-xl border p-4 md:p-6 space-y-6">
                        {/* Profile section */}
                        <div className="flex items-start gap-6">
                            <div className="relative">
                                <Skeleton className="size-[80px] sm:size-[120px] rounded-full" />
                                <Skeleton className="absolute size-8 sm:size-16 -bottom-2 -right-2 rounded-full" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-8 sm:w-48" />
                                <Skeleton className="h-4 sm:w-32" />
                            </div>
                        </div>

                        {/* Bio section */}
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-24 w-full" />
                            <div className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-4 w-48" />
                                ))}
                            </div>
                        </div>

                        {/* Languages section */}
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-36" />
                            <div className="flex gap-2">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-8 w-20 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar skeleton */}
                <div className="md:col-span-5 md:row-span-5">
                    <div className="space-y-6">
                        {/* Price section */}
                        <div className="bg-white rounded-xl border p-4 md:p-6">
                            <Skeleton className="h-6 w-32 mb-4" />
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 sm:w-32" />
                                    <Skeleton className="h-6 sm:w-24" />
                                </div>
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-4 w-full" />
                                ))}
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>

                        {/* Vehicle section */}
                        <div className="bg-light rounded-xl border p-4 md:p-6">
                            <Skeleton className="h-6 w-40 mb-4" />
                            <Skeleton className="aspect-video w-full rounded-lg mb-4" />
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-4 w-32 mt-2" />
                        </div>

                        {/* Map section */}
                        <Skeleton className="aspect-video w-full rounded-xl" />
                    </div>
                </div>

                {/* Reviews section skeleton */}
                <div className="md:col-span-7">
                    <div className="bg-light rounded-xl border p-4 md:p-6">
                        <Skeleton className="h-6 w-32 mb-6" />
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-2 pb-6">
                                    <div className="flex justify-between">
                                        <div>
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-4 w-24 mt-1" />
                                        </div>
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <Skeleton className="h-16 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Other instructors skeleton */}
                <div className="md:col-span-12">
                    <div className="bg-white rounded-xl border p-6">
                        <Skeleton className="h-6 w-52 sm:w-64 mb-6" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex flex-col items-center gap-y-2">
                                    <Skeleton className="w-24 h-24 rounded-full" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default InstructorDetailsSkeleton;
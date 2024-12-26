
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";


const InstructorCardSkeleton: FC = () => {

    return (
        <div className="p-4 rounded-lg space-y-5 bg-gradient-to-b from-primary/0 to-indigo/5 relative">
            <Skeleton className="w-[97px] h-[28px] rounded-full absolute top-5 right-5" />

            <div className="flex gap-8">
                <div className="rounded-full flex flex-col items-center gap-2">
                    <Skeleton className="size-[91px] rounded-full" />
                </div>

                <div className="space-y-2 text-sm text-accent w-full relative">

                    <Skeleton className="w-[74px] h-[32px] absolute bottom-0 right-2" />

                    <Skeleton className="w-3/6 h-[28px] " />

                    <Skeleton className="w-2/6 h-[20px] " />

                    <Skeleton className="w-3/6 h-[20px] " />

                    <Skeleton className="w-3/12 h-[20px] " />

                </div>
            </div>

            <div className="space-y-3">
                <div className="flex gap-3 max-w-lg mx-auto">
                    <Skeleton className="w-1/2 h-[48px]" />
                    <Skeleton className="w-1/2 h-[48px] " />
                </div>
                <Skeleton className="w-[170px] h-[24px] mx-auto" />
            </div>


        </div>
    );
};

export default InstructorCardSkeleton;

import { cn } from "@/lib/utils";

const Loading = ({ className, parentClassName }: { className?: string, parentClassName?: string }) => {
    return (
        <div className={cn("flex items-center justify-center min-h-screen", parentClassName)}>
            <div className={cn(`animate-spin w-10 rounded-full h-10 border-t-2 border-r-2 border-t-primary border-r-primary`, className)} />
        </div>
    );
};

export default Loading;

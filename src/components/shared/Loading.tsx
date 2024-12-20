import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";


const Loading = ({ className }: { className?: string }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className={cn(`animate-spin`, className)}>
                <LoaderCircle width={40} height={40} />
            </div>
        </div>
    );
};

export default Loading;

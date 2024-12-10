import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";


const Loading = ({ className }: { className?: string }) => {
    return (
        <div className={cn(`flex justify-center py-20 animate-spin`, className)}>
            <LoaderCircle width={40} height={40} />
        </div>
    );
};

export default Loading;
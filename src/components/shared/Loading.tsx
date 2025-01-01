import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";


const Loading = ({ className }: { className?: string }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className={cn(`animate-spin w-10 rounded-full h-10 border-t-2 border-r-2 border-t-primary border-r-indigo`, className)}/>
        </div>
    );
};

export default Loading;

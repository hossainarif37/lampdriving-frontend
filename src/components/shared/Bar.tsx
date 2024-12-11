import { cn } from "@/lib/utils";

const Bar = ({ className }: { className?: string }) => (
    <div className={cn("w-[1px] h-4 bg-white/20", className)} />
)

export default Bar;
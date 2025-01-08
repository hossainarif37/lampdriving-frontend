import { cn } from "@/lib/utils";

const Bar = ({ className }: { className?: string }) => (
    <div className={cn("w-[1px] h-4 bg-primary/30", className)} />
)

export default Bar;
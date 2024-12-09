import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

type SectionHeadingProps = {
    heading: string;
    children: ReactNode;
    classname?: string;
    variant?: "default" | "secondary";
};

const SectionHeading: FC<SectionHeadingProps> = ({children, heading, variant = "default", classname}) => {

    // set heading color based on the varient
    const headingColor = variant === "default" ? "bg-secondary before:bg-secondary" : "bg-primary before:bg-primary";
    return (
        <div className={cn("flex flex-col items-center text-textCol", classname)}>

            {/* heading styles */}
            <h3 className={cn("bg-secondary py-[3px] px-[15px] text-sm font-bold rounded-[4px] ml-2 relative before:absolute before:w-[5px] uppercase before:min-h-full before:bg-secondary text-white before:top-0 before:rounded-[4px] before:-ml-6", headingColor)}>
                {heading}
            </h3>

            {/* sub heading styles */}
            <h1 className={`text-[48px] font-bold text-center ${variant === "default" ? "text-secondary" : "text-white"}`}>       
                {children}
            </h1>
        </div>
    );
};

export default SectionHeading;
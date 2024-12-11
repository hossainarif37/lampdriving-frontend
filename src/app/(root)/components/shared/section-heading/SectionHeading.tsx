import { FC } from 'react';


interface SectionHeaderProps {
    title: string;
    subtitle: string;
}
const SectionHeading: FC<SectionHeaderProps> = ({ title, subtitle }) => {

    // set heading color based on the varient
    // const headingColor = variant === "default" ? "bg-secondary before:bg-secondary" : "bg-primary before:bg-primary";
    return (
        // <div className={cn("flex flex-col items-center text-textCol", classname)}>

        //     {/* heading styles */}
        //     <h3 className={cn("bg-secondary py-[3px] px-[15px] text-sm font-bold rounded-[4px] ml-2 relative before:absolute before:w-[5px] uppercase before:min-h-full before:bg-secondary text-white before:top-0 before:rounded-[4px] before:-ml-6", headingColor)}>
        //         {heading}
        //     </h3>

        //     {/* sub heading styles */}
        //     <h1 className={`text-[48px] font-bold text-center ${variant === "default" ? "text-secondary" : "text-white"}`}>
        //         {children}
        //     </h1>
        // </div>

        <div className="text-center flex flex-col lg:gap-2 lg:my-7 my-4">
            <h1 className="text-secondary font-semibold lg:text-3xl text-2xl mb-1">
                {title}
            </h1>
            <p className="lg:text-xl text-accent lg:tracking-widest tracking-wide w-2/3 mx-auto">
                {subtitle}
            </p>
        </div>
    );
};

export default SectionHeading;
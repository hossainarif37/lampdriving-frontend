import { FC } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
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

export default SectionHeader;

import { LucideProps } from 'lucide-react';
import { FC } from 'react';

interface FeatureBoxProps {
  Icon: React.ComponentType<LucideProps>;
  title: string;
  // backgroundColor: string;
}

const FeatureBox: FC<FeatureBoxProps> = ({ Icon, title }) => {
  return (
    <div
      className={`text-textCol text-sm md:h-[135px] h-[110px] flex flex-col items-center justify-center md:gap-4 gap-3 `}
    >
      <Icon className="text-primary md:w-12 w-10 md:h-12 h-10" />
      <h1 className="md:text-xl">{title}</h1>
    </div>
  );
};

export default FeatureBox;

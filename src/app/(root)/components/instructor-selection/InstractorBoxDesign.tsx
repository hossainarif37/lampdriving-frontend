import { LucideProps } from 'lucide-react';
import { FC } from 'react';

interface IInstractorBoxProps {
    Icon: React.ComponentType<LucideProps>;
    title: string;
    description: string;
}

const InstractorBoxDesign: FC<IInstractorBoxProps> = ({ Icon, title, description }) => {
    return (
        <div className='flex flex-col text-center items-center lg:gap-6 gap-2'>
            <Icon className="text-primary md:w-16 w-14 md:h-16 h-14 flex " />
            <h1 className="lg:text-2xl text-xl text-primary font-semibold">{title}</h1>
            <p className='text-sm text-accent leading-5 lg:w-2/3 w-3/4'>{description}</p>
        </div>
    );
};

export default InstractorBoxDesign;
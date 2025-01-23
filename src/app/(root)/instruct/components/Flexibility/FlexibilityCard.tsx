import { FC } from 'react';

interface Feature {
    title: string;
    description: string;
    icon: JSX.Element;
}

interface IFlexibilityCardProps {
    feature: Feature;
}
const FlexibilityCard: FC<IFlexibilityCardProps> = ({ feature }) => {
    const { title, description, icon } = feature;
    return (
        <div className='rounded-lg shadow-md space-y-4 p-5 bg-light flex flex-col items-center'>
            <h1 className=''>{icon}</h1>
            <h4 className='text-xl font-semibold text-primary'>{title}</h4>
            <p className='text-accent text-center'>{description}</p>
        </div>
    );
};

export default FlexibilityCard;
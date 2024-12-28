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
        <div className='rounded-lg shadow-md space-y-4 p-5 bg-gradient-to-b from-primary/0 to-primary/5'>
            <h1 className='text-primary '>{icon}</h1>
            <h4 className='text-xl font-semibold text-secondary'>{title}</h4>
            <p className='text-accent'>{description}</p>
        </div>
    );
};

export default FlexibilityCard;
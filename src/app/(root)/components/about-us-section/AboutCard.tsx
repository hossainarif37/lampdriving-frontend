import { FC } from 'react';

interface Card {
    card: {
        icon: JSX.Element;
        title: string;
        description: string;
    };
}

const AboutCard: FC<Card> = ({ card }: Card) => {
    const { icon, title, description } = card;
    return (
        <div className="hover:shadow-md rounded-lg p-6 flex flex-col items-center text-center">

            <div className="relative w-20 h-20 mb-6">
                {/* Diamond Background */}
                <div className="absolute w-20 h-20 bg-slate-100 transform rotate-45 top-0 left-0"></div>
                {/* Icon Centered in the Diamond Background */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {icon} {/* Directly render the icon */}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg text-secondary mb-2">{title}</h3>
                <p className="text-secondary">{description}</p>
            </div>
        </div>
    );
};

export default AboutCard;
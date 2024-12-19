import Link from 'next/link';
import { FC } from 'react';

interface INavigationItemProps {
    path: string;
    title: string;
    isActive: boolean;
}

const NavigationItem: FC<INavigationItemProps> = ({path, title, isActive }) => {
    return (
        <li className='flex-1 flex flex-col'>
            <span className={`w-full h-2 ${isActive ? "bg-primary" : "bg-gray-300"}`}></span>
            <Link href={path} className="font-semibold text-secondary w-full text-center">{title}</Link>
        </li>
    );
}

export default NavigationItem;
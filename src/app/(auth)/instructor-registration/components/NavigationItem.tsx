// NavigationItem.tsx
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface NavigationItemProps {
    path: string;
    title: string;
    isActive: boolean;
    isDisabled: boolean;
}

const NavigationItem: FC<NavigationItemProps> = ({
    path,
    title,
    isActive,
    isDisabled,
}) => {
    const router = useRouter();

    const handleNavigate = () => {
        if (isDisabled) {
            router.replace('/instructor-registration?step=personal-info');
            return;
        }

        router.push(path);
    };

    return (
        <li className={`flex-1 flex min-w-[120px] ${isDisabled && 'select-none'}`}>
            <Button
                type="button"
                onClick={handleNavigate}
                disabled={isDisabled}
                className={
                    `w-full px-0 font-semibold capitalize bg-transparent hover:bg-transparent
                    ${isDisabled ? 'text-gray-400' : 'text-primary hover:text-primary-dark'}`
                }
            >
                <div className="flex flex-col gap-y-3 w-full">
                    <span className="whitespace-nowrap">{title}</span>
                    <span
                        className={
                            `w-full h-2 rounded-lg transition-colors duration-200 ${isDisabled ? "bg-gray-200" : isActive ? "bg-primary" : "bg-gray-300"}`
                        }
                    />
                </div>
            </Button>
        </li>
    );
};

export default NavigationItem;
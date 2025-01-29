"use client"
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { adminRoutes, instructorRoutes, learnerRoutes } from '@/constant/dashboardLinks';
import { useAppSelector } from '@/redux/hook';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';

const MenuSearch: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAppSelector((state) => state.authSlice);
    const routes = user?.role === 'admin' ? adminRoutes : user?.role === 'instructor' ? instructorRoutes : user?.role === 'learner' ? learnerRoutes : [];

    const formattedRoutes = routes.reduce((acc, route) => {
        if (route.children) {
            const childrenFormattedRoutes = route.children.map((child) => ({
                name: child.name,
                path: child.path
            }));
            return [...acc, ...childrenFormattedRoutes];
        }
        return [...acc, {
            name: route.name,
            path: route.path
        }];
    }, [] as { name: string; path: string }[]);

    return (
        <div>

            <Popover
                open={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
            >
                <PopoverTrigger asChild>
                    <div className='relative'>
                        <Input placeholder='Search Menu' type='text' className='pl-9' />
                        <Search size={18} className='absolute top-1/2 transform -translate-y-1/2 left-3 text-neutral-500' />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="md:w-[350px] lg:w-[239px] p-2">
                    <Command>
                        <CommandInput placeholder="Search Menu" />
                        <CommandList>
                            {formattedRoutes.map((suburb, index) => (
                                <CommandItem
                                    className='py-3 cursor-pointer'
                                    key={index}
                                    asChild
                                    onSelect={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    <Link href={suburb.path}>
                                        {suburb.name}
                                    </Link>
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default MenuSearch;
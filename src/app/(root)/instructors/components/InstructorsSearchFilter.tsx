"use client";
import { Input } from '@/components/ui/input';
import { Brush, Paintbrush, Search } from 'lucide-react';
import { FC, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { sydneySuburbs } from '@/constant/sydneySuburbs';
import { Button } from '@/components/ui/button';
interface IInstructorSearchFilterProps {
    searchParams?: {
        'vehicle.type'?: string;
        searchKey?: string;
        page?: string;
    }
}

const InstructorsSearchFilter: FC<IInstructorSearchFilterProps> = ({ searchParams }) => {
    const [searchPopOverOpen, setSearchPopOverOpen] = useState(false);

    const [carType, setCarType] = useState<'auto' | 'manual' | 'all'>(
        searchParams?.['vehicle.type'] === "auto" || searchParams?.['vehicle.type'] === "manual" ? searchParams?.['vehicle.type'] : 'all');
    const [selectedSuburb, setSelectedSuburb] = useState<string>(searchParams?.searchKey || '');


    const urlSearchParams = useSearchParams();
    const { replace } = useRouter();

    // Function to handle search
    const handleSearch = (searchKey: string) => {
        const searchParams = new URLSearchParams(urlSearchParams);

        if (searchKey) {
            searchParams.set('searchKey', searchKey.toString());
            searchParams.delete('page');
            setSelectedSuburb(searchKey);
        } else {
            searchParams.delete('searchKey');
        }
        replace(`?${searchParams.toString()}`);
    }

    // Function to handle filter
    const handleFilter = (field: string, value: string) => {
        const searchParams = new URLSearchParams(urlSearchParams);
        if (value) {
            searchParams.set(field, value);
            replace(`?${searchParams.toString()}`);
        } else {
            searchParams.delete(field);
        }
        searchParams.delete('page');
        replace(`?${searchParams.toString()}`);
    }

    // Function to handle car type
    const handleChangeCarType = (type: 'auto' | 'manual' | 'all') => {
        setCarType(type);
        if (type == "auto" || type == "manual") {
            handleFilter('vehicle.type', type);
        } else {
            handleFilter('vehicle.type', '');
        }
    }

    // Function to handle reset filters
    const handleResetFilters = () => {
        const searchParams = new URLSearchParams(urlSearchParams);
        searchParams.delete('searchKey');
        searchParams.delete('vehicle.type');
        searchParams.delete('page');
        setCarType('all');
        setSelectedSuburb('');
        replace(`?${searchParams.toString()}`);
    }

    return (
        <div className='md:flex gap-1 items-center md:justify-between justify-center'>
            <div className='hidden md:block'>
                {
                    (searchParams?.searchKey || searchParams?.['vehicle.type']) &&
                    <Button
                        onClick={handleResetFilters}
                        className='border-red-500 bg-light hover:bg-light text-red-500 border flex items-center gap-2 md:px-4'
                    >
                        <Paintbrush className="w-6 h-6 hidden lg:block" /> <span>Reset Filters</span>
                    </Button>
                }
            </div>
            <div className='flex flex-col md:flex-row lg:gap-5 gap-3 md:justify-end justify-center'>
                <Popover
                    open={searchPopOverOpen}
                    onOpenChange={(open) => setSearchPopOverOpen(open)} // Update popover state
                >
                    <PopoverTrigger asChild >
                        <div className='relative md:w-[250px] lg:w-[434px] sm:w-[500px] w-full mx-auto md:mx-0 ' >
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                                readOnly
                                value={selectedSuburb}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Enter your suburb" className='h-12 pl-12 bg-light border border-primary/15' />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="md:w-[250px] lg:w-[434px] p-2">
                        <Command>
                            <CommandInput placeholder="Enter your suburb" />
                            <CommandList>
                                {sydneySuburbs.map((suburb, index) => (
                                    <CommandItem
                                        className='py-3'
                                        key={index}
                                        onSelect={() => {
                                            handleSearch(suburb.value);
                                            setSearchPopOverOpen(false);
                                        }}
                                    >
                                        {suburb.label}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <div className="font-semibold text-light text-center flex gap-3 justify-between md:mx-auto flex-wrap">
                    <div className='flex flex-wrap md:flex-nowrap justify-center items-center mx-auto gap-3'>
                        <Button
                            onClick={() => handleChangeCarType('auto')}
                            className={`sm:w-[100px] hover:bg-secondary hover:text-white hover:border-secondary w-20 sm:text-base text-xs flex justify-center items-center px-0 rounded-md 
                                ${carType === 'auto' ? 'bg-secondary border border-secondary text-light hover:text-light'
                                    : 'bg-light border border-primary/20 text-primary/70'
                                }`}
                        >
                            <span>Auto</span>
                        </Button>
                        <Button
                            onClick={() => handleChangeCarType('manual')}
                            className={`sm:w-[100px] w-20 sm:text-base text-xs hover:bg-secondary hover:text-light hover:border-secondary flex justify-center items-center rounded-md ${carType === 'manual'
                                ? 'bg-secondary border border-secondary text-light hover:bg-secondary hover:text-light'
                                : 'bg-light border border-primary/20 text-primary/70'}`}
                        >
                            <span>Manual</span>
                        </Button>
                        <Button
                            onClick={() => handleChangeCarType('all')}
                            className={`sm:w-[100px] hover:bg-secondary hover:text-light hover:border-secondary w-20 sm:text-base text-xs flex justify-center items-center rounded-md ${carType === 'all'
                                ? 'border border-secondary text-light'
                                : 'bg-light border border-primary/20 text-primary/70'}`}
                        >
                            <span>All</span>
                        </Button>
                        {
                            (searchParams?.searchKey || searchParams?.['vehicle.type']) &&
                            <Button
                                onClick={handleResetFilters}
                                className='border-red-500 bg-light hover:bg-light text-red-500 border flex items-center gap-2 w-full mx-auto max-w-[264px] sm:max-w-[324px] md:hidden'
                            >
                                <Paintbrush className="w-6 h-6" /> <span>Reset Filters</span>
                            </Button>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InstructorsSearchFilter;
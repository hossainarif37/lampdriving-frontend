"use client";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
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
        <div className='flex items-center justify-between'>
            <div>
                {
                    (searchParams?.searchKey || searchParams?.['vehicle.type']) &&
                    <Button
                        onClick={handleResetFilters}
                        className='border-[#ff5200]/60 hover:border-primary/30 bg-light-green hover:bg-light-green text-primary border'
                    >
                        Reset Filters
                    </Button>
                }
            </div>
            <div className='flex flex-col md:flex-row gap-5 md:justify-end justify-center'>
                <Popover
                    open={searchPopOverOpen}
                    onOpenChange={(open) => setSearchPopOverOpen(open)} // Update popover state
                >
                    <PopoverTrigger asChild >
                        <div className='relative md:w-[350px] lg:w-[434px] sm:w-[500px] w-full mx-auto md:mx-0 ' >
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                                value={selectedSuburb}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Enter your suburb" className='h-12 pl-12 bg-light-green border border-primary/15' />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="md:w-[350px] lg:w-[434px] p-2">
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

                <div className="font-semibold text-light text-center flex gap-3 mx-auto md:mx-0">
                    <Button
                        onClick={() => handleChangeCarType('auto')}
                        className={`sm:w-32 w-24 sm:text-base text-sm hover:bg-gray-200 flex justify-center items-center px-0 rounded-md ${carType === 'auto'
                            ? 'bg-secondary text-light hover:bg-secondary hover:text-light'
                            : 'bg-gray-100 border border-primary/20 text-primary/70'}`}
                    >
                        <span>Auto</span>
                    </Button>
                    <Button
                        onClick={() => handleChangeCarType('manual')}
                        className={`sm:w-32 w-24 sm:text-base text-sm hover:bg-gray-200 hover:text-primary/80 flex justify-center items-center rounded-md ${carType === 'manual'
                            ? 'bg-secondary text-light hover:bg-secondary hover:text-light'
                            : 'bg-gray-100 border border-primary/20 text-primary/70'}`}
                    >
                        <span>Manual</span>
                    </Button>
                    <Button
                        onClick={() => handleChangeCarType('all')}
                        className={`sm:w-32 w-24 sm:text-base text-sm hover:bg-secondary hover:text-light flex justify-center items-center rounded-md ${carType === 'all'
                            ? ' text-light'
                            : 'bg-gray-100 border border-primary/20 text-primary/70'}`}
                    >
                        <span>All</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InstructorsSearchFilter;
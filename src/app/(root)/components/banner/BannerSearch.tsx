"use client";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { sydneySuburbs } from '@/constant/sydneySuburbs';
import { Button } from '@/components/ui/button';

const BannerSearch: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [carType, setCarType] = useState<'auto' | 'manual'>('auto');
    const [selectedSuburb, setSelectedSuburb] = useState<string>('');

    const router = useRouter();

    // search handler
    const handleSearch = () => {
        if (!selectedSuburb) {
            return;
        }
        router.push(`/instructors?vehicle.type=${carType}&searchKey=${selectedSuburb}`)
    }

    return (
        <div className="bg-light lg:w-[500px] md:w-[400px] w-full rounded-lg lg:px-8 md:px-6 px-3 lg:py-14 md:py-10 py-7">
            {/* Container for all content */}
            <div className="space-y-6">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-primary text-center bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                    Find a driving instructor
                </h2>

                {/* Toggle buttons for Auto/Manual */}
                <div className="w-full font-semibold text-light text-center border flex gap-3 p-3 rounded-md">
                    <Button
                        onClick={() => setCarType('auto')}
                        className={`w-1/2 hover:bg-gray-200 flex justify-center items-center px-0 rounded-md ${carType === 'auto'
                            ? 'gradient-color text-light'
                            : 'bg-gray-200 text-primary'}`}
                    >
                        <span>Auto</span>
                    </Button>
                    <Button
                        onClick={() => setCarType('manual')}
                        className={`w-1/2 hover:bg-gray-200 flex justify-center items-center rounded-md ${carType === 'manual'
                            ? 'gradient-color text-light'
                            : 'bg-gray-200 text-primary'}`}
                    >
                        <span>Manual</span>
                    </Button>
                </div>

                {/* Search input field */}
                <div className="flex gap-2 items-center rounded-md w-full border">
                    <Popover
                        open={isOpen}
                        onOpenChange={(open) => setIsOpen(open)} // Update popover state
                    >
                        <PopoverTrigger asChild>
                            <input
                                value={selectedSuburb}
                                onChange={(e) => setSelectedSuburb(e.target.value)}
                                readOnly={selectedSuburb ? true : false}
                                className="flex-1 px-4 py-3 rounded-md text-primary focus:outline-none placeholder:text-accent"
                                type="text"
                                placeholder="Enter your suburb"
                            />
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
                                                setSelectedSuburb(suburb.value);
                                                setIsOpen(false);
                                            }}
                                        >
                                            {suburb.label}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    {/* Search button */}
                    <Button onClick={handleSearch} className="w-full py-3 gradient-color text-light rounded-md text-base">
                        Search
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default BannerSearch;

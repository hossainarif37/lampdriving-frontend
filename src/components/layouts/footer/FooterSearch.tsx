"use client"
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { sydneySuburbs } from '@/constant/sydneySuburbs';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

const FooterSearchBoxDesign: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [carType, setCarType] = useState<'auto' | 'manual'>('auto');
    const [selectedSuburb, setSelectedSuburb] = useState<string>('');

    const router = useRouter();

    // search handler
    const handleSearch = () => {
        if (!selectedSuburb) {
            return;
        }
        router.push(`/instructors?vehicle.type=${carType}&searchKey=${selectedSuburb}`);
        setSelectedSuburb('');
        setCarType('auto');
    }
    return (
        <div className="lg:max-w-5xl md:max-w-3xl h-48  md:h-40 flex flex-col md:flex-row items-center justify-center md:gap-4 gap-6 bg-[#212139] w-full md:rounded-md rounded-lg absolute -top-20 left-1/2 right-1/2 -translate-x-1/2 md:px-20 px-6">

            <div className='md:w-10/12 flex flex-col lg:flex-row items-center justify-between gap-2'>

                {/* Toggle Buttons */}
                <div className="w-full font-semibold text-light text-center flex gap-1 border p-1 rounded-md bg-light">
                    <Button
                        onClick={() => setCarType('auto')}
                        className={`w-1/2 h-[40px] hover:bg-gray-200 flex justify-center items-center rounded-md ${carType === 'auto'
                            ? 'gradient-color text-light'
                            : 'bg-gray-200 text-secondary'}`}
                    >
                        <span>Auto</span>
                    </Button>
                    <Button
                        onClick={() => setCarType('manual')}
                        className={`w-1/2 h-[40px] hover:bg-gray-200 flex justify-center items-center rounded-md ${carType === 'manual'
                            ? 'gradient-color text-light'
                            : 'bg-gray-200 text-secondary'}`}
                    >
                        <span>Manual</span>
                    </Button>
                </div>

                {/* Search Box */}
                <div className="flex flex-col md:flex-row gap-2 items-center rounded-md md:flex-1 w-full">
                    <Popover
                        open={isOpen}
                        onOpenChange={(open) => setIsOpen(open)} // Update popover state
                    >
                        <PopoverTrigger asChild>
                            <input
                                value={selectedSuburb}
                                onChange={(e) => setSelectedSuburb(e.target.value)}
                                readOnly={selectedSuburb ? true : false}
                                className="md:flex-1 px-4 py-3 rounded-md text-secondary focus:outline-none placeholder:text-accent w-[300px] md:w-[380px] lg:w-[340px]"
                                type="text"
                                placeholder="Enter your suburb"
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] md:w-[380px] lg:w-[340px] p-2">
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
                    <Button onClick={handleSearch} className="py-3 gradient-color text-light rounded-md text-base w-full md:w-auto">
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FooterSearchBoxDesign;


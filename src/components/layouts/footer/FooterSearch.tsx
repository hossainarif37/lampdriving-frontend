"use client"
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { sydneySuburbs } from '@/constant/sydneySuburbs';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const FooterSearch: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [carType, setCarType] = useState<'auto' | 'manual'>('auto');
    const [selectedSuburb, setSelectedSuburb] = useState<string>('');
    const [filteredSuburbs, setFilteredSuburbs] = useState<{ label: string; value: string }[]>([]);

    const router = useRouter();
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // search handler
    const handleSearch = () => {
        if (!selectedSuburb) {
            return;
        }
        router.push(`/instructors?vehicle.type=${carType}&searchKey=${selectedSuburb}`);
        setSelectedSuburb('');
        setCarType('auto');
    }

    // Fetch JSON data
    useEffect(() => {
        fetch(`/api/sydneySuburbApi?limit=12`)
            .then((res) => res.json())
            .then((data) => {
                setFilteredSuburbs(data);
            })
            .catch((err) => console?.error("Error fetching suburbs:", err));
    }, []);

    // Handle search input change
    const handleSearchChange = async (query: string) => {
        console.log('query', query);
        setSelectedSuburb(query); // Ensure input updates

        const searchURL = query
            ? `/api/sydneySuburbApi?search=${query}`
            : `/api/sydneySuburbApi?limit=12`;

        fetch(searchURL)
            .then((res) => res.json())
            .then((data) => {
                setFilteredSuburbs(data);
            })
            .catch((err) => console.error("Error fetching suburbs:", err));
    };
    return (
        <div className="lg:max-w-5xl mx-auto md:max-w-3xl h-48 md:h-40 flex flex-col md:flex-row items-center justify-center md:gap-4 gap-6 w-full md:rounded-md rounded-lg md:px-20 px-6 bg-[#264649] -translate-y-1/2">

            <div className='md:w-10/12 flex flex-col lg:flex-row items-center justify-between gap-2'>
                {/* Toggle Buttons */}
                <div className="w-full font-semibold text-light text-center flex gap-1 border p-1 rounded-md bg-light">
                    <Button
                        onClick={() => setCarType('auto')}
                        className={`w-1/2 h-[40px] px-6 lg:px-7 flex justify-center items-center rounded-md ${carType === 'auto'
                            ? ' text-light hover:bg-secondary '
                            : 'bg-gray-200 text-primary hover:bg-gray-200'}`}
                    >
                        Auto
                    </Button>
                    <Button
                        onClick={() => setCarType('manual')}
                        className={`w-1/2 h-[40px] px-6 lg:px-7 flex justify-center items-center rounded-md ${carType === 'manual'
                            ? ' text-light hover:bg-secondary '
                            : 'bg-gray-200 text-primary hover:bg-gray-200 '}`}
                    >
                        Manual
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
                                onChange={(e) => handleSearchChange(e.target.value)}
                                readOnly
                                className="md:flex-1 px-4 py-3 rounded-md text-primary focus:outline-none placeholder:text-accent w-[300px] md:w-[380px] lg:w-[280px]"
                                type="text"
                                placeholder="Enter your suburb"
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] md:w-[380px] lg:w-[280px] p-2">
                            <Command>
                                <CommandInput onValueChange={handleSearchChange} placeholder="Enter your suburb" />
                                <CommandList>
                                    {filteredSuburbs.map((suburb, index) => (
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
                    <Button onClick={handleSearch} className="py-3  text-light rounded-md text-base w-full md:w-auto px-6 lg:px-7 hover:bg-secondary">
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FooterSearch;


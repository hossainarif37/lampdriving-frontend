import { MapIcon, MapPin } from 'lucide-react';
import { Dispatch, FC, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { sydneySuburbs } from '@/constant/sydneySuburbs';
import { Input } from '@/components/ui/input';

interface ILocationInputProps {
    value: {
        address: string;
        suburb: string;
    };
    onChange: Dispatch<React.SetStateAction<{
        address: string;
        suburb: string;
    }>>
}

const LocationInput: FC<ILocationInputProps> = ({ onChange, value }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold ">Pickup Location</h2>
            <p className="text-sm text-gray-500 mb-4">
                Please enter a specific address where you'd like to be picked up
            </p>
            <div className="space-y-4">
                {/* address field */}
                <div className="relative">
                    <Input
                        type="text"
                        value={value?.address}
                        onChange={(e) => onChange((pre) => ({ ...pre, address: e.target.value }))}
                        placeholder="Enter your address"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <MapPin className="absolute size-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* suburb select field */}
                <div className="flex gap-2 items-center rounded-md w-full border">
                    <Popover
                        open={isOpen}
                        onOpenChange={(open) => setIsOpen(open)} // Update popover state
                    >
                        <PopoverTrigger asChild>
                            <div className='relative w-full'>
                                <Input
                                    value={value.suburb}
                                    onChange={(e) => onChange((pre) => ({ ...pre, suburb: e.target.value }))}
                                    readOnly={value.suburb ? true : false}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    type="text"
                                    placeholder="Enter your suburb"
                                />
                                <MapIcon className="absolute size-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-2">
                            <Command>
                                <CommandInput placeholder="Enter your suburb" />
                                <CommandList>
                                    {sydneySuburbs.map((suburb, index) => (
                                        <CommandItem
                                            className='py-3'
                                            key={index}
                                            onSelect={() => {
                                                onChange((pre) => ({ ...pre, suburb: suburb.label }));
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
            </div>
        </div>
    );
};

export default LocationInput;
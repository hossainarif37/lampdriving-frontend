import { MapIcon, MapPin } from 'lucide-react';
import { Dispatch, FC, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { sydneySuburbs } from '@/constant/sydneySuburbs';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { IAddress } from '@/types/user';

interface IDropOffLocationProps {
    value: IAddress;
    onChange: (location: IAddress) => void;
    error: {
        address: boolean;
        suburb: boolean;
    }
    className?: string;
}

const DropOffLocation: FC<IDropOffLocationProps> = ({ onChange, value, error, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn("bg-white rounded-lg shadow-sm  p-4 lg:p-6 border border-gray-200", className)}>
            <h2 className="text-lg font-semibold ">Drop Off Location</h2>
            <p className="text-sm text-gray-500 mb-4">
                Please enter a specific address where you&apos;d like to be drop off
            </p>
            <div className="space-y-4">
                {/* address field */}
                <div>
                    <div className="relative">
                        <Input
                            type="text"
                            value={value?.address}
                            onChange={(e) => onChange({ address: e.target.value, suburb: value.suburb })}
                            placeholder="Enter your drop off address"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <MapPin className="absolute size-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    {
                        error?.address && (
                            <p className="text-red-500 text-sm">Please enter your drop off address</p>
                        )
                    }
                </div>

                {/* suburb select field */}
                <div>
                    <div className="flex gap-2 items-center rounded-md w-full border">
                        <Popover
                            open={isOpen}
                            onOpenChange={(open) => setIsOpen(open)} // Update popover state
                        >
                            <PopoverTrigger asChild>
                                <div className='relative w-full'>
                                    <Input
                                        value={value.suburb}
                                        onChange={(e) => onChange({ address: value.address, suburb: e.target.value })}
                                        readOnly={value.suburb ? true : false}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        type="text"
                                        placeholder="Enter your drop off suburb"
                                    />
                                    <MapIcon className="absolute size-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-2">
                                <Command>
                                    <CommandInput placeholder="Enter your drop off suburb" />
                                    <CommandList>
                                        {sydneySuburbs.map((suburb, index) => (
                                            <CommandItem
                                                className='py-3'
                                                key={index}
                                                onSelect={() => {
                                                    onChange({ address: value.address, suburb: suburb.label });
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
                    {
                        error?.suburb && (
                            <p className="text-red-500 text-sm">Please choose your drop off suburb</p>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default DropOffLocation;
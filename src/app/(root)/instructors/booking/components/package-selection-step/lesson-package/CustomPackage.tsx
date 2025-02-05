import React, { FC, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PackageCard from './PackageCard';

interface ICustomPackageProps {
    onSelect: (hours: number, isCustomSelected: boolean) => void;
    hourlyRate: number;
    bookingHours: number;
    selected: boolean;
}

const CustomPackage: FC<ICustomPackageProps> = ({ onSelect, hourlyRate, bookingHours, selected }) => {
    const [hours, setHours] = useState<number>(bookingHours);

    // handler for changing hours
    const handleHoursChange = (value: number) => {
        setHours(value);
        onSelect(value, true);
    };

    return (
        <PackageCard
            hours={hours}
            price={hourlyRate}
            description="Choose your own hours based on your needs"
            selected={selected}
            onSelect={() => handleHoursChange(hours)}
            customContent={
                <div className="sm:absolute top-6 right-6">
                    <Select
                        onValueChange={(value: string) => handleHoursChange(Number(value))}
                        value={hours.toString()}
                    >
                        <SelectTrigger className="xl:h-12 mt-1 w-40">
                            <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Hours" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className='py-3' value={(0).toString()}>
                                Select Hours
                            </SelectItem>
                            {[...Array(20)].map((_, i) => (

                                <SelectItem className='py-3' key={i + 1} value={(i + 1).toString()}>{i + 1} hours
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            }
        />
    );
}


export default CustomPackage;
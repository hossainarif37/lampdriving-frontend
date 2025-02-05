import { FC, useState } from 'react';
import { Clock, Car, MapPin, NotepadText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/providers/BookingProvider';
import CustomTestPackage from './CustomTestPackage';
import TestPackageCard from './TestPackageCard';
import { IInstructor } from '@/types/instructor';

interface ITestPackageProps {
    handleTestPackageSelection: (hours: number, isCustomMockTestSelected: boolean) => void;
    isCustomMockTestSelected: boolean;
    bookingHours: number;
    instructor: Partial<IInstructor> | null;
}


const TestPackage: FC<ITestPackageProps> = () => {
    const { testPackage, setTestPackage, isCustomMockTestSelected, setIsCustomMockTestSelected } = useBooking();

    const handleAddTestPackage = (mockTestCount: number) => {
        setIsCustomMockTestSelected(false);
        setTestPackage(pre => ({ ...pre, mockTestCount, included: !pre.included }));
    }

    const handleAddCustomMockTestPackage = () => {
        setTestPackage(pre => ({ ...pre, included: false }));
        setIsCustomMockTestSelected(true);
    }

    const testDay = {
        heading: "Test Day",
        description: "all inclusive",
        price: 220,
        mockTestCount: 0,
        features: [
            {
                icon: Clock,
                title: '2-hour test day'
            },
            {
                icon: MapPin,
                title: 'Pick-up & Drop-off Service'
            },
            {
                icon: Car,
                title: '1 hour revision practice'
            }
        ]
    }

    const mockTest = {
        heading: "2 Mock Tests + Test Day",
        description: "all inclusive",
        price: 390,
        mockTestCount: 2,
        features: [
            {
                icon: Clock,
                title: '2 hours 1st session'
            },
            {
                icon: MapPin,
                title: '1 hour 2nd session'
            },
            {
                icon: NotepadText,
                title: 'Including test day package'
            }
        ]
    }

    return (
        <div className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200'>
            <h2 className="text-xl font-semibold mb-6">Choose Your Test Package</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <TestPackageCard selected={testPackage.included && testPackage.mockTestCount === 0} {...testDay} handleAddTestPackage={handleAddTestPackage} />
                <TestPackageCard selected={testPackage.included && testPackage.mockTestCount === 2} {...mockTest} handleAddTestPackage={handleAddTestPackage} />
                {/* <div className='col-span-2'>
                    <CustomTestPackage
                        selected={isCustomTestSelected}
                        handleAddCustomMockTestPackage={handleAddCustomMockTestPackage}
                        mockTestPackage={mockTestPackage}
                        testDayPrice={220}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default TestPackage;

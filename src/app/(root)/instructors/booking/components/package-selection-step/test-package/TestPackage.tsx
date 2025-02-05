import { FC, useState } from 'react';
import { Clock, Car, MapPin, NotepadText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/providers/BookingProvider';
import CustomTestPackage from './CustomTestPackage';
import TestPackageCard from './TestPackageCard';



const TestPackage: FC = () => {
    const [isCustomTestSelected, setIsCustomTestSelected] = useState(false);
    const { testPackage, setTestPackage, mockTestPackage, setMockTestPackage } = useBooking();

    const handleAddTestPackage = () => {
        setTestPackage(pre => ({ ...pre, included: !pre.included }));
        setMockTestPackage(pre => ({ ...pre, included: false }));
        setIsCustomTestSelected(false);
    }

    const handleAddMockTestPackage = () => {
        setMockTestPackage(pre => ({ ...pre, included: !pre.included }));
        setTestPackage(pre => ({ ...pre, included: false }));
        setIsCustomTestSelected(false);
    }

    const handleAddCustomMockTestPackage = () => {
        setMockTestPackage(pre => ({ ...pre, included: false }));
        setTestPackage(pre => ({ ...pre, included: false }));
        setIsCustomTestSelected(true);
    }

    const testDay = {
        heading: "Test Day",
        description: "all inclusive",
        price: 220,
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
                <TestPackageCard selected={testPackage.included} {...testDay} handleAddTestPackage={handleAddTestPackage} />
                <TestPackageCard selected={mockTestPackage.included} {...mockTest} handleAddTestPackage={handleAddMockTestPackage} />
                <div className='col-span-2'>
                    <CustomTestPackage
                        selected={isCustomTestSelected}
                        handleAddCustomMockTestPackage={handleAddCustomMockTestPackage}
                        mockTestPackage={mockTestPackage}
                        testDayPrice={220}
                    />
                </div>
            </div>
        </div>
    );
};

export default TestPackage;

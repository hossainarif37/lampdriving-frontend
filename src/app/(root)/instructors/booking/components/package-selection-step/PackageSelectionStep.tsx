import { FC } from 'react';
import PackageCard from './PackageCard';
import CustomPackage from './CustomPackage';
import TestPackage from './TestPackage';
import { useBooking } from '@/providers/BookingProvider';


const PackageSelectionStep: FC = () => {

    const { bookingHours, setBookingHours, instructor, isCustomSelected, setIsCustomSelected, setSchedules } = useBooking();

    // handler for package selection
    const handlePackageSelection = (hours: number, isCustomSelected: boolean) => {
        setBookingHours(hours);
        setIsCustomSelected(isCustomSelected);
        setSchedules([]);
    }

    return (
        <div className='space-y-6'>
            <div className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200'>
                <h2 className="text-xl font-semibold mb-6">Choose Your Package</h2>
                <div className="md:grid md:grid-cols-2 gap-6 space-y-4 md:space-y-0">
                    <div className='col-span-1'>
                        <PackageCard
                            hours={10}
                            price={instructor?.pricePerHour || 0}
                            description="Perfect for new learners starting their driving journey"
                            discount="10% OFF"
                            recommended
                            selected={!isCustomSelected && (bookingHours === 10)}
                            onSelect={() => handlePackageSelection(10, false)}
                        />
                    </div>
                    <div className='col-span-1'>
                        <PackageCard
                            hours={6}
                            price={instructor?.pricePerHour || 0}
                            description="Ideal for overseas license holders or skill refresh"
                            discount="6% OFF"
                            selected={!isCustomSelected && (bookingHours === 6)}
                            onSelect={() => handlePackageSelection(6, false)}
                        />
                    </div>
                    <div className='col-span-2'>
                        <CustomPackage
                            bookingHours={bookingHours}
                            selected={isCustomSelected}
                            onSelect={handlePackageSelection}
                            hourlyRate={instructor?.pricePerHour || 0}
                        />
                    </div>
                </div>
            </div>

            <TestPackage />
        </div>
    );
};

export default PackageSelectionStep;
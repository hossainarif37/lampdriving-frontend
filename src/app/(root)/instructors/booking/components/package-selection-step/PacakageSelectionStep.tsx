import { FC } from 'react';
import PackageCard from './PackageCard';
import CustomPackage from './CustomPackage';
import TestPackage from './TestPackage';
import { useBooking } from '@/providers/BookingProvider';


const PacakageSelectionStep: FC = () => {

    const { bookingHours, setBookingHours, instructor, isCustomSelected, setIsCustomSelected } = useBooking();

    // handler for package selection
    const handlePakageSelection = (hours: number, isCustomSelected: boolean) => {
        setBookingHours(hours);
        setIsCustomSelected(isCustomSelected);
    }

    return (
        <div className='space-y-6'>
            <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                <h2 className="text-xl font-semibold mb-6">Choose Your Package</h2>
                <div className="grid grid-cols-2 gap-6">
                    <PackageCard
                        hours={10}
                        price={instructor?.pricePerHour || 0}
                        description="Perfect for new learners starting their driving journey"
                        discount="10% OFF"
                        recommended
                        selected={!isCustomSelected && (bookingHours === 10)}
                        onSelect={() => handlePakageSelection(10, false)}
                    />
                    <PackageCard
                        hours={6}
                        price={instructor?.pricePerHour || 0}
                        description="Ideal for overseas license holders or skill refresh"
                        discount="6% OFF"
                        selected={!isCustomSelected && (bookingHours === 6)}
                        onSelect={() => handlePakageSelection(6, false)}
                    />
                    <div className='col-span-2'>
                        <CustomPackage
                            bookingHours={bookingHours}
                            selected={isCustomSelected}
                            onSelect={handlePakageSelection}
                            hourlyRate={instructor?.pricePerHour || 0} />
                    </div>
                </div>
            </div>

            <TestPackage />
        </div>
    );
};

export default PacakageSelectionStep;
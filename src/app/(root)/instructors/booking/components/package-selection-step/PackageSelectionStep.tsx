import { FC, useState } from 'react';
import TestPackage from './test-package/TestPackage';
import { useBooking } from '@/providers/BookingProvider';
import { Button } from '@/components/ui/button';
import LessonPackage from './lesson-package/LessonPackage';


const PackageSelectionStep: FC = () => {
    const [selectedTab, setSelectedTab] = useState<"lesson" | "test">("lesson");
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
                <div className="md:grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
                    <Button
                        onClick={() => setSelectedTab("lesson")}
                        variant={selectedTab == "lesson" ? "default" : "outline"}
                        className={`capitalize ${selectedTab == "lesson" && "hover:bg-secondary/90"}`}>
                        Lesson Package
                    </Button>
                    <Button
                        onClick={() => setSelectedTab("test")}
                        variant={selectedTab == "test" ? "default" : "outline"}
                        className={`capitalize ${selectedTab == "test" && "hover:bg-secondary/90"}`}>
                        Test Package
                    </Button>
                </div>
            </div>
            {
                selectedTab == "lesson" ?
                    <LessonPackage
                        instructor={instructor}
                        handlePackageSelection={handlePackageSelection}
                        isCustomSelected={isCustomSelected}
                        bookingHours={bookingHours}
                     />
                    : 
                    selectedTab == "test" &&
                    <TestPackage />
            }

        </div>
    );
};

export default PackageSelectionStep;
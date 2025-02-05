import { FC, useState } from 'react';
import TestPackage from './test-package/TestPackage';
import { useBooking } from '@/providers/BookingProvider';
import { Button } from '@/components/ui/button';
import LessonPackage from './lesson-package/LessonPackage';


const PackageSelectionStep: FC = () => {
    const [selectedTab, setSelectedTab] = useState<"lesson" | "test">("lesson");
    const { bookingHours,
        setBookingHours,
        instructor,
        isCustomLessonSelected,
        setIsCustomLessonSelected,
        isCustomMockTestSelected,
        setIsCustomMockTestSelected,
        setSchedules, testPackage, setTestPackage } = useBooking();

    // handler for package selection
    const handleLessonPackageSelection = (hours: number, isCustomLessonSelected: boolean) => {
        setBookingHours(hours);
        setIsCustomLessonSelected(isCustomLessonSelected);
        setSchedules([]);
    }

    const handleTestPackageSelection = (mockTestCount: number, isCustom: boolean) => {
        if ((mockTestCount === testPackage.mockTestCount) && testPackage.included) {
            setTestPackage(pre => ({ ...pre, included: false }));
            return;
        }
        setIsCustomMockTestSelected(isCustom);
        setTestPackage(pre => ({ ...pre, mockTestCount, included: true }));
    };



    return (
        <div className='space-y-6'>
            <div className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200'>
                <div className="md:grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
                    <Button
                        onClick={() => setSelectedTab("lesson")}
                        variant={selectedTab == "lesson" ? "default" : "outline"}
                        className={`capitalize hover:border-secondary ${selectedTab == "lesson" && "hover:bg-secondary/90"}`}>
                        Lesson Package
                    </Button>
                    <Button
                        onClick={() => setSelectedTab("test")}
                        variant={selectedTab == "test" ? "default" : "outline"}
                        className={`capitalize hover:border-secondary ${selectedTab == "test" && "hover:bg-secondary/90"}`}>
                        Test Package
                    </Button>
                </div>
            </div>
            {
                selectedTab == "lesson" ?
                    <LessonPackage
                        instructor={instructor}
                        handleLessonPackageSelection={handleLessonPackageSelection}
                        isCustomLessonSelected={isCustomLessonSelected}
                        bookingHours={bookingHours}
                    />
                    :
                    selectedTab == "test" &&
                    <TestPackage
                        instructor={instructor}
                        handleTestPackageSelection={handleTestPackageSelection}
                        isCustomMockTestSelected={isCustomMockTestSelected}
                        testPackage={testPackage}
                    />
            }

        </div>
    );
};

export default PackageSelectionStep;
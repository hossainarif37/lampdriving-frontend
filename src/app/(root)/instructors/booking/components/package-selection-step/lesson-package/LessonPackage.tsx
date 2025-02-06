import { FC } from 'react';
import PackageCard from './PackageCard';
import { IInstructor } from '@/types/instructor';
import CustomPackage from './CustomPackage';

interface ILessonPackageProps {
    handleLessonPackageSelection: (hours: number, isCustomLessonSelected: boolean) => void;
    isCustomLessonSelected: boolean;
    bookingHours: number;
    instructor: Partial<IInstructor> | null;
}

const LessonPackage: FC<ILessonPackageProps> = ({ instructor, handleLessonPackageSelection, isCustomLessonSelected, bookingHours }) => {
    return (
        <div className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200'>
            <h2 className="text-xl font-semibold mb-6">Choose Your Lesson Package</h2>
            <div className="md:grid md:grid-cols-2 gap-6 space-y-4 md:space-y-0">
                <div className='col-span-1'>
                    <PackageCard
                        hours={10}
                        price={instructor?.pricePerHour || 0}
                        description="Perfect for new learners starting their driving journey"
                        discount="10% OFF"
                        recommended
                        selected={!isCustomLessonSelected && (bookingHours === 10)}
                        onSelect={() => handleLessonPackageSelection(10, false)}
                    />
                </div>
                <div className='col-span-1'>
                    <PackageCard
                        hours={6}
                        price={instructor?.pricePerHour || 0}
                        description="Ideal for overseas license holders or skill refresh"
                        discount="6% OFF"
                        selected={!isCustomLessonSelected && (bookingHours === 6)}
                        onSelect={() => handleLessonPackageSelection(6, false)}
                    />
                </div>
                <div className='col-span-2'>
                    <CustomPackage
                        bookingHours={bookingHours}
                        selected={isCustomLessonSelected}
                        onSelect={handleLessonPackageSelection}
                        hourlyRate={instructor?.pricePerHour || 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default LessonPackage;
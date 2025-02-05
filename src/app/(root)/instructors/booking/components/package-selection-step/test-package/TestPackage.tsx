import { FC } from 'react';
import TestPackageCard from './TestPackageCard';
import { IInstructor } from '@/types/instructor';
import { drivingTest, drivingTestPrice, mockTest } from '@/constant/booking/testPackage';
import { ITestPackage } from '@/types/booking';
import CustomTestPackage from './CustomTestPackage';

interface ITestPackageProps {
    handleTestPackageSelection: (mockTestCount: number, isCustomMockTestSelected: boolean) => void;
    isCustomMockTestSelected: boolean;
    instructor: Partial<IInstructor> | null;
    testPackage: ITestPackage
}


const TestPackage: FC<ITestPackageProps> = ({ handleTestPackageSelection, testPackage, isCustomMockTestSelected, instructor }) => {

    return (
        <div className='bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200'>
            <h2 className="text-xl font-semibold mb-6">Choose Your Test Package</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <TestPackageCard
                    selected={testPackage.included && (!isCustomMockTestSelected && testPackage.mockTestCount === 0)}
                    {...drivingTest}
                    onSelect={() => handleTestPackageSelection(0, false)} />
                <TestPackageCard
                    selected={testPackage.included && (!isCustomMockTestSelected && testPackage.mockTestCount === 2)}
                    description={mockTest.description}
                    features={mockTest.features}
                    heading={mockTest.heading}
                    mockTestCount={mockTest.mockTestCount}
                    price={drivingTestPrice + ((instructor?.pricePerHour || 0) * 3)}
                    onSelect={() => handleTestPackageSelection(2, false)} />
                <div className='col-span-2'>
                    <CustomTestPackage
                        selected={isCustomMockTestSelected}
                        handleAddCustomMockTestPackage={handleTestPackageSelection}
                        testPackage={testPackage}
                        testDayPrice={220}
                    />
                </div>
            </div>
        </div>
    );
};

export default TestPackage;

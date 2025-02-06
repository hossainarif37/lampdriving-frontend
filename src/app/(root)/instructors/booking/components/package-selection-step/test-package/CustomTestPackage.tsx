import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Clock } from 'lucide-react';
import { FC, useState } from 'react';
import TestPackageCard from './TestPackageCard';
import { ITestPackage } from '@/types/booking';

interface ICustomTestPackageProps {
    testPackage: ITestPackage;
    testDayPrice: number;
    handleAddCustomMockTestPackage: (mockTestCount: number, isCustomMockTestSelected: boolean) => void;
    selected: boolean;
}



const CustomTestPackage: FC<ICustomTestPackageProps> = ({ testPackage, handleAddCustomMockTestPackage, testDayPrice, selected }) => {
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const [mockTestCount, setMockTestCount] = useState<number>(0);

    const customTestPackageFeatures = {
        heading: `${mockTestCount} Mock Tests + Driving Test`,
        description: 'all inclusive',
        price: mockTestCount * testDayPrice,
        mockTestCount,
        features: [
            {
                title: '2 hours 1st session',
                icon: Clock
            },
            {
                title: '1 hour for each additional test',
                icon: Clock
            },
            {
                title: 'Including test day package',
                icon: Clock
            }
        ]
    }

    const handleHoursChange = (value: number) => {
        setMockTestCount(value);
        handleAddCustomMockTestPackage(value, true);
    };
    return (
        <TestPackageCard
            onSelect={() => !isSelectOpen && handleAddCustomMockTestPackage(mockTestCount, true)}
            selected={selected}
            {...customTestPackageFeatures}
            customContent={<div className="sm:absolute top-6 right-6">
                <Select
                    open={isSelectOpen}
                    onOpenChange={(open) => setIsSelectOpen(open)}
                    onValueChange={(value: string) => handleHoursChange(Number(value))}
                    value={mockTestCount.toString()}
                >
                    <SelectTrigger className="xl:h-12 mt-1 w-44">
                        <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Mock Tests" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className='py-3' value={(0).toString()}>
                            Select Mock Tests
                        </SelectItem>
                        {[...Array(10)].map((_, i) => (

                            <SelectItem className='py-3' key={i + 1} value={(i + 1).toString()}>{i + 1} Mock {i + 1 === 1 ? 'Test' : 'Tests'}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>}
        />
    );
};

export default CustomTestPackage;
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Clock, NotepadText, Car, Circle, CircleCheck } from 'lucide-react';
import { FC, useState } from 'react';

interface ICustomTestPackageProps {
    mockTestPackage: { price: number; included: boolean; };
    testDayPrice: number;
    handleAddCustomMockTestPackage: () => void;
    selected: boolean;
}

const CustomTestPackage: FC<ICustomTestPackageProps> = ({ mockTestPackage, handleAddCustomMockTestPackage, testDayPrice, selected }) => {
    const [mockTestCount, setMockTestCount] = useState<number>(0);
    return (
        <div
            onClick={handleAddCustomMockTestPackage}
            className={`bg-gradient-to-br from-primary/5 to-white rounded-xl p-4 lg:p-6 cursor-pointer border-2 border-gray-200
            ${selected ? 'bg-primary/5  border-primary' : 'bg-white border-gray-200 hover:border-primary/70'} relative`}>
            <div className="inline-block bg-primary text-white px-4 py-1 rounded-[4px] text-sm font-medium mb-4">
                {mockTestCount} Mock {mockTestCount === 1 ? 'Test' : 'Tests'} + Test Day
            </div>
            <div className="text-4xl font-bold text-primary mb-4">${mockTestPackage.price}</div>
            <div className="text-sm text-gray-500 mb-6">all inclusive</div>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>2 hours 1st session</span>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>1 hour for each additional test</span>
                </div>
                <div className="flex items-center gap-3">
                    <NotepadText className="w-5 h-5 text-gray-400" />
                    <span>Including test day package</span>
                </div>
            </div>
            <div className="sm:absolute top-6 right-6">
                <Select
                    onValueChange={(value: string) => setMockTestCount(Number(value))}
                    value={mockTestCount.toString()}
                >
                    <SelectTrigger className="xl:h-12 mt-1 w-44">
                        <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Mock Tests" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className='py-3' value={(0).toString()}>
                            Select Mock Tests
                        </SelectItem>
                        {[...Array(20)].map((_, i) => (

                            <SelectItem className='py-3' key={i + 1} value={(i + 1).toString()}>{i + 1} Mock {i + 1 === 1 ? 'Test' : 'Tests'}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default CustomTestPackage;
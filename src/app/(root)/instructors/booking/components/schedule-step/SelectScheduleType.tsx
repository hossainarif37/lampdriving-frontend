import { IAddress } from '@/types/user';
import { CircleAlert } from 'lucide-react';
import { FC } from 'react';

interface ISelectScheduleTypeProps {
    availableScheduleHours: number;
    isTestPackageSelected: boolean;
    isFirstMockTestScheduled: boolean;
    isAllMockTestScheduled: boolean;
    handleDuration: (duration: 1 | 2, type: "lesson" | "test" | "mock-test") => void;
    selectedSchedule: {
        date: Date | null;
        time: string[] | null;
        duration: number;
        pickupAddress: IAddress;
        dropOffAddress: IAddress;
        type: "lesson" | "test" | "mock-test" | "blank";
    };
    testPackage: {
        included: boolean;
        mockTestCount: number;
    };
}

const SelectScheduleType: FC<ISelectScheduleTypeProps> = ({
    availableScheduleHours,
    testPackage,
    isTestPackageSelected,
    isFirstMockTestScheduled,
    isAllMockTestScheduled,
    handleDuration,
    selectedSchedule,
}) => {
    return (

        <div className="bg-white rounded-lg shadow-sm  p-4 lg:p-6 border border-gray-200 relative">
            <h2 className="text-lg font-semibold mb-4">Select Schedule Type</h2>
            <div className="flex flex-col md:grid grid-cols-3 gap-4">
                <div className='flex flex-col sm:flex-row items-center gap-4 col-span-3'>
                    {[1, 2].map((duration) => (
                        <button
                            key={duration}
                            disabled={duration > availableScheduleHours}
                            onClick={() => handleDuration(duration as 1 | 2, "lesson")}
                            className={`flex-1 py-2 px-4 rounded-[4px] border w-full disabled:text-gray-500 ${(selectedSchedule.duration === duration && selectedSchedule.type === "lesson")
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-gray-200 hover:border-primary/70'
                                }`}
                        >
                            {duration}-Hour Lesson
                        </button>
                    ))}
                </div>
                <button
                    disabled={!testPackage.included || isTestPackageSelected}
                    onClick={() => handleDuration(2, "test")}
                    className={`py-2 px-4 text-nowrap rounded-[4px] disabled:text-gray-500 border ${selectedSchedule.type === "test"
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-primary/70'
                        }`}
                >
                    Driving Test
                </button>
                <button
                    disabled={!(testPackage.mockTestCount) || isFirstMockTestScheduled}
                    onClick={() => handleDuration(2, "mock-test")}
                    className={`py-2 px-4 text-nowrap rounded-[4px] disabled:text-gray-500 border ${selectedSchedule.type === "mock-test" && selectedSchedule.duration === 2
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-primary/70'
                        }`}
                >
                    First Mock Test
                </button>
                <button
                    disabled={!(testPackage.mockTestCount) || isAllMockTestScheduled}
                    onClick={() => handleDuration(1, "mock-test")}
                    className={`py-2 px-4 text-nowrap rounded-[4px] disabled:text-gray-500 border ${selectedSchedule.type === "mock-test" && selectedSchedule.duration === 1
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-primary/70'
                        }`}
                >
                    Mock Test
                </button>
            </div>
            <div className='absolute top-4 right-4 sm:top-6 sm:right-6'>
                {
                    selectedSchedule.type === "lesson" ?
                        <button
                            title={availableScheduleHours === 0 ? 'No hours left to schedule' : `Add more ${availableScheduleHours} ${availableScheduleHours === 1 ? 'hour' : 'hours'} schedules`}
                            className='flex items-center gap-2'
                        >
                            <span className='text-sm'>
                                {availableScheduleHours === 0 ? 'No hours left to schedule' : `${availableScheduleHours}-Hours left`}
                            </span>
                            <CircleAlert size={16} />
                        </button>
                        :
                        (selectedSchedule.type === "test" && !isTestPackageSelected) ?
                            <button
                                title='Schedule driving test'
                                className='flex items-center gap-2'

                            >
                                <span className='text-sm'>Schedule driving test</span>
                                <CircleAlert size={16} />
                            </button>
                            :
                            (selectedSchedule.type === "mock-test" && selectedSchedule.duration === 2 && !isFirstMockTestScheduled) ?
                                <button
                                    title='Schedule first mock test'
                                    className='flex items-center gap-2'
                                >
                                    <span className='text-sm'>Schedule first mock test</span>
                                    <CircleAlert size={16} />
                                </button>
                                :
                                (selectedSchedule.type === "mock-test" && selectedSchedule.duration === 1 && !isAllMockTestScheduled) ?
                                    <button
                                        title='Schedule all mock tests'
                                        className='flex items-center gap-2'

                                    >
                                        <span className='text-sm'>Schedule all mock tests</span>
                                        <CircleAlert size={16} />
                                    </button>
                                    :
                                    <button
                                        title='Nothing is left to schedule'
                                        className='flex items-center gap-2'

                                    >
                                        <span className='text-sm'>Nothing is left to schedule</span>
                                        <CircleAlert size={16} />
                                    </button>
                }
            </div>
        </div>
    );
};


export default SelectScheduleType;
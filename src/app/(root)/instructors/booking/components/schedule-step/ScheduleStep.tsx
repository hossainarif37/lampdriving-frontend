import { FC, useState } from 'react';
import Calender from './Calender';
import TimeSlots from './TimeSlots';
import { Button } from '@/components/ui/button';


const ScheduleStep: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<'1-hour' | '2-hour' | 'test-package'>('1-hour');

    return (
        <div className="space-y-6 sticky top-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="space-y-6 col-span-2">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-lg font-semibold mb-4">Select Duration</h2>
                        <div className="flex gap-4">
                            {['1-hour', '2-hour'].map((duration) => (
                                <button
                                    key={duration}
                                    onClick={() => setSelectedDuration(duration as '1-hour' | '2-hour')}
                                    className={`flex-1 py-2 px-4 rounded-[4px] border ${selectedDuration === duration
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-gray-200 hover:border-primary/70'
                                        }`}
                                >
                                    {duration} Lesson
                                </button>
                            ))}
                            <button
                                onClick={() => setSelectedDuration('test-package')}
                                className={`flex-1 py-2 px-4 rounded-[4px] border ${selectedDuration === 'test-package'
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-200 hover:border-primary/70'
                                    }`}
                            >
                                Test Package
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <Calender
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />
                </div>

                <div className='col-span-2'>
                    <Button className='w-full'>
                        Add Schedule
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ScheduleStep;
import { FC, useState } from 'react';
import ScheduleCalender from './ScheduleCalender';
import ScheduleTimeSlots from './ScheduleTimeSlots';
import LocationInput from './PickupLocation';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface IShedule {
    date: string;
    duration: '1-hour' | '2-hour' | 'test-package';
    time: string;
    pickupAddress: {
        address: string;
        suburb: string;
    };
}

const ScheduleStep: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<'1-hour' | '2-hour' | 'test-package'>('1-hour');
    const [location, setLocation] = useState<{ address: string; suburb: string }>({ address: '', suburb: '' });


    const handleAddSchedule = () => {
        const schedule: IShedule = {
            date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
            duration: selectedDuration,
            time: selectedTime ? selectedTime : '',
            pickupAddress: {
                address: location?.address || '',
                suburb: location?.suburb || '',
            }
        }

        console.log(schedule)
    };
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
                    <ScheduleCalender
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />
                </div>
                <div>
                    <ScheduleTimeSlots
                        selectedTime={selectedTime}
                        onSelectTime={setSelectedTime}
                        selectedDate={selectedDate}
                    />
                </div>

                <div className='col-span-2'>
                    <LocationInput
                        value={location}
                        onChange={setLocation}
                    />
                </div>
                <div className='col-span-2'>
                    <Button onClick={handleAddSchedule} className='w-full'>
                        Add Schedule
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ScheduleStep;
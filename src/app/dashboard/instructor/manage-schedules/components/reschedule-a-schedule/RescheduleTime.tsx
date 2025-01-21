import ScheduleCalender from '@/app/(root)/instructors/booking/components/schedule-step/ScheduleCalender';
import ScheduleTimeSlots from '@/app/(root)/instructors/booking/components/schedule-step/ScheduleTimeSlots';
import { IWorkingHour } from '@/types/instructor';
import { Dispatch, FC, SetStateAction } from 'react';

interface IRescheduleTimeProps {
    selectedDate: Date | null;
    setSelectedDate: Dispatch<SetStateAction<Date | null>>;
    scheduleTimeSlots: string[];
    setScheduleTimeSlots: Dispatch<SetStateAction<string[]>>;
    workingHour: { isActive: boolean, startTime: string, endTime: string };
    duration: number;
    selectedTime: string[];
    setSelectedTime: Dispatch<SetStateAction<string[]>>;
    bookedTimeSlots: string[];
    data: any;
    instructorData: any;
}

const RescheduleTime: FC<IRescheduleTimeProps> = ({ selectedDate, setSelectedDate, scheduleTimeSlots, setScheduleTimeSlots, workingHour, duration, selectedTime, setSelectedTime, bookedTimeSlots, data, instructorData }) => {
    return (
        <>
            <div>
                <ScheduleCalender
                    availableScheduleHours={1}
                    schedules={[]}
                    bookedSchedules={data?.data.schedules || []}
                    workingHours={instructorData?.data.workingHour as IWorkingHour}
                    classname='border-y-0 border-l-0 shadow-none border-r rounded-none'
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                />
            </div>
            <div>
                <ScheduleTimeSlots
                    scheduleTimeSlots={scheduleTimeSlots}
                    setScheduleTimeSlots={setScheduleTimeSlots}
                    workingHour={workingHour}
                    classname='border-none shadow-none'
                    bookedTimeSlots={bookedTimeSlots}
                    selectedDuration={duration}
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                    selectedDate={selectedDate}
                    availableScheduleHours={1}
                />
            </div>
        </>
    );
};

export default RescheduleTime;
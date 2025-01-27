"use client";
import WorkingHoursSelector from '@/app/(auth)/instructor-registration/components/services/WorkingHoursSelector';
import { Button } from '@/components/ui/button';
import { DAYS } from '@/constant/days';
import { ISchedule } from '@/types/instructor';
import { FC, useState } from 'react';

const ManageWorkingHours: FC = () => {
    const defaultSchedule: ISchedule = DAYS.reduce((acc, day) => {
        acc[day] = {
            isActive: true,
            startTime: "09:00",
            endTime: "17:00",
        };
        return acc;
    }, {} as ISchedule)
    const [schedule, setSchedule] = useState<ISchedule>(defaultSchedule);
    const [workingHoursError, setWorkingHoursError] = useState<string>('');
    return (
        <div>
            <WorkingHoursSelector
                schedule={schedule}
                setSchedule={setSchedule}
                setWorkingHoursError={setWorkingHoursError}
            />
            <div className='flex justify-end mt-6'>
                <Button>
                    Update Working Hour
                </Button>
            </div>
        </div>
    );
};

export default ManageWorkingHours;
"use client"

import ServicesFields from '@/components/shared/forms/ServicesFields';
import { Button } from '@/components/ui/button';
import { DAYS } from '@/constant/days';
import { useAppSelector } from '@/redux/hook';
import { IInstructor, ISchedule, IServices, IWorkingHour } from '@/types/instructor';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
interface Inputs {
    pricePerHour: number;
}

const ServicesForm: FC = () => {
    const { user } = useAppSelector((state) => state.authSlice);
    const instructor = user?.instructor as IInstructor;
    const defaultValues: IServices = {
        pricePerHour: instructor.pricePerHour,
        serviceAreas: instructor.serviceAreas,
        workingHour: instructor.workingHour,
    }
    const [isClicked, setIsClicked] = useState(false);
    const [selectedLocations, setSelectedLocations] = useState<string[]>(defaultValues?.serviceAreas || []);
    const [workingHoursError, setWorkingHoursError] = useState<string>('');
    const [selectedLocationsError, setSelectedLocationsError] = useState<string>('');
    const defaultSchedule: ISchedule = DAYS.reduce((acc, day) => {
        acc[day] = {
            isActive: true,
            startTime: "09:00",
            endTime: "17:00",
        };
        return acc;
    }, {} as ISchedule)

    const [schedule, setSchedule] = useState<ISchedule>(defaultValues?.workingHour as unknown as ISchedule || defaultSchedule);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const router = useRouter();

    const onSubmit = (data: Inputs) => {
        setIsClicked(true);
        if (selectedLocations.length === 0) {
            setSelectedLocationsError('Service areas are required');
            return;
        }
        const workingHour: IWorkingHour = {
            saturday: schedule.saturday,
            sunday: schedule.sunday,
            monday: schedule.monday,
            tuesday: schedule.tuesday,
            wednesday: schedule.wednesday,
            thursday: schedule.thursday,
            friday: schedule.friday,
        };

        let hasActiveDay = false;
        for (const day in workingHour) {
            const dayKey = day as keyof IWorkingHour;
            if (!workingHour[dayKey]?.isActive) {
                delete workingHour[dayKey];
            } else {
                hasActiveDay = true;
            }
        }

        if (!hasActiveDay) {
            setWorkingHoursError('At least one working day must be active');
            return;
        }

        const servicesData = {
            pricePerHour: Number(data.pricePerHour),
            serviceAreas: selectedLocations,
            workingHour: workingHour
        }
    }

    useEffect(() => {
        if (isClicked) {
            if (selectedLocations.length > 0) {
                setSelectedLocationsError('');
            } else {
                setSelectedLocationsError('Service areas are required');
            }
        }
    }, [selectedLocations, isClicked]);

    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl font-bold text-primary'>Services</h1>
                <ServicesFields
                    errors={errors}
                    register={register}
                    workingHoursError={workingHoursError}
                    selectedLocationsError={selectedLocationsError}
                    selectedLocations={selectedLocations}
                    setSelectedLocations={setSelectedLocations}
                    schedule={schedule}
                    setSchedule={setSchedule}
                    setWorkingHoursError={setWorkingHoursError}
                    defaultValues={defaultValues}
                />

                <Button type='submit' className='w-full mt-7 gradient-color h-12'>Save</Button>
            </form>
        </div>
    );
};

export default ServicesForm;
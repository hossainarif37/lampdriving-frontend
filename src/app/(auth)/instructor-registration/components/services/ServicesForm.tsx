"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ISchedule, IWorkingHour } from '@/types/instructor';
import { DAYS } from '@/constant/days';
import useScreenSize from '@/hooks/useScreenSize';
import ServicesFields from '@/components/shared/forms/ServicesFields';
import { useInstructorRegister } from '@/providers/InstructorRegisterProvider';

interface Inputs {
    pricePerHour: number;
}

const ServicesForm: FC = () => {
    const device = useScreenSize();
    const { servicesInfo, setServicesInfo } = useInstructorRegister();
    const [isClicked, setIsClicked] = useState(false);
    const [selectedLocations, setSelectedLocations] = useState<string[]>(servicesInfo?.serviceAreas || []);
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

    const [schedule, setSchedule] = useState<ISchedule>(servicesInfo?.workingHour as unknown as ISchedule || defaultSchedule);

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

        setServicesInfo({
            pricePerHour: Number(data.pricePerHour),
            serviceAreas: selectedLocations,
            workingHour: workingHour
        })
        router.push("/instructor-registration?step=car-info");
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
        <div className='border p-5 md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Service Details</h1>

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
                    defaultValues={servicesInfo}
                />
                <div>
                    <StepNavigationButtons prev="experience" next="car-info" />
                </div>
            </form>
        </div>
    );
};

export default ServicesForm;
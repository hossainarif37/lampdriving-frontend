/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { sydneySuburbs } from '@/constant/sydneySuburbs';
import WorkingHoursSelector from './WorkingHoursSelector';
import { ISchedule } from '@/types/instructor';
import { DAYS } from '@/constant/days';

interface Inputs {
    pricePerHour: number;
}

const ServicesForm: FC = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedLocationsError, setSelectedLocationsError] = useState<string>('');

    const [schedule, setSchedule] = useState<ISchedule>(() => {
        return DAYS.reduce((acc, day) => {
            acc[day] = {
                isActive: true,
                startTime: "09:00",
                endTime: "17:00",
            };
            return acc;
        }, {} as ISchedule);
    });


    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const router = useRouter();

    const onSubmit = (data: Inputs) => {
        setIsClicked(true);
        if (selectedLocations.length === 0) {
            setSelectedLocationsError('Service areas are required');
            return;
        }
        console.log(data);

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

    console.log('schedule', schedule);

    return (
        <div className='border p-5 md:p-16 md:shadow-lg md:rounded-lg mt-5'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col'>
                <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Service Details</h1>

                <div className='w-full mt-7'>
                    <div className='flex flex-col gap-5'>
                        {/* Price Per Hour */}
                        <div>
                            <label htmlFor="phone" className='font-semibold text-secondary'>
                                Price Per Hour
                            </label>
                            <Input
                                {...register('pricePerHour', {
                                    required: "Price is required"
                                })
                                }
                                type="number"
                                placeholder="Enter price per hour"
                                className='h-11 xl:h-14 mt-1'
                            />
                            {errors?.pricePerHour && <p className='text-red-500 text-sm mt-1'>{errors?.pricePerHour?.message}</p>}
                        </div>

                        {/* Service Areas */}
                        <div className='w-full'>
                            <label htmlFor="experience" className='font-semibold text-secondary'>Service Areas</label>
                            <MultiSelect
                                options={sydneySuburbs}
                                onValueChange={setSelectedLocations}
                                defaultValue={selectedLocations}
                                placeholder="Select Areas"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                                className='mt-1'
                            />
                            {selectedLocationsError && <p className='text-red-500 text-sm mt-1'>{selectedLocationsError}</p>}
                        </div>

                        {/* Working Hours */}
                        <div className='w-full'>
                            <label htmlFor="experience" className='font-semibold text-secondary'>Set Working Hours</label>
                            <WorkingHoursSelector
                                schedule={schedule}
                                setSchedule={setSchedule}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <StepNavigationButtons prev="personal-info" next="car-info" />
                </div>
            </form>
        </div>
    );
};

export default ServicesForm;
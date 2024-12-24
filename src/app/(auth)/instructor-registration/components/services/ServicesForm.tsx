/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import StepNavigationButtons from '../StepNavigationButtons';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { sydneySuburbs } from '@/constant/sydneySuburbs';
import WorkingHoursSelector from './WorkingHoursSelector';
import { ISchedule, IWorkingHour } from '@/types/instructor';
import { DAYS } from '@/constant/days';
import { IServices } from '../InstructorRegistration';

interface Inputs {
    pricePerHour: number;
}

interface IServicesFormProps {
    servicesInfo: IServices | undefined;
    setServicesInfo: React.Dispatch<React.SetStateAction<IServices| undefined>>;
}

const ServicesForm: FC<IServicesFormProps> = ({servicesInfo, setServicesInfo}) => {
    const [isClicked, setIsClicked] = useState(false);
    const [selectedLocations, setSelectedLocations] = useState<string[]>(servicesInfo?.serviceAreas || []);
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
                                defaultValue={servicesInfo?.pricePerHour}
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
                                value={selectedLocations}
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
                    <StepNavigationButtons prev="experience" next="car-info" />
                </div>
            </form>
        </div>
    );
};

export default ServicesForm;
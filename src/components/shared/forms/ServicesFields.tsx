import { IServices } from '@/app/(auth)/instructor-registration/components/InstructorRegistration';
import WorkingHoursSelector from '@/app/(auth)/instructor-registration/components/services/WorkingHoursSelector';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { sydneySuburbs } from '@/constant/sydneySuburbs';
import useScreenSize from '@/hooks/useScreenSize';
import { ISchedule } from '@/types/instructor';
import { Dispatch, FC, SetStateAction } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Inputs {
    pricePerHour: number;
}

interface IServicesFormProps {
    register: UseFormRegister<Inputs>;
    errors: FieldErrors<Inputs>;
    defaultValues?: IServices | undefined;
    setSelectedLocations: Dispatch<SetStateAction<string[]>>;
    selectedLocations: string[];
    selectedLocationsError: string;
    workingHoursError: string;
    schedule: ISchedule;
    setSchedule: Dispatch<SetStateAction<ISchedule>>;
    setWorkingHoursError: Dispatch<SetStateAction<string>>
}


const ServicesFields: FC<IServicesFormProps> = ({register, errors, defaultValues, setSelectedLocations, selectedLocations, selectedLocationsError, workingHoursError, schedule, setSchedule, setWorkingHoursError}) => {
    const device = useScreenSize();
    return (
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
                    defaultValue={defaultValues?.pricePerHour}
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
                    defaultValue={defaultValues?.serviceAreas}
                    value={selectedLocations}
                    placeholder="Select Areas"
                    variant="inverted"
                    animation={2}
                    maxCount={device === 'mobile' ? 1 : 3}
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
                    setWorkingHoursError={setWorkingHoursError}
                />
                {workingHoursError && <p className='text-red-500 text-sm mt-1'>{workingHoursError}</p>}
            </div>
        </div>
    </div>
    );
};

export default ServicesFields;
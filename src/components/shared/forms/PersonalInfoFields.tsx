import { FC } from 'react';
import { UseFormRegister, FieldErrors, Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { genderOptions } from '@/constant/gender';

export interface IPersonalInfoInputs  {
    name: {
        firstName: string;
        lastName: string;
    },
    email: string;
    phone: string;
    gender: "male" | "female" | "other";
    dateOfBirth: string;
}

interface PersonalInfoFieldsProps {
  register: UseFormRegister<IPersonalInfoInputs>;
  errors: FieldErrors<IPersonalInfoInputs>;
  personalInfo?: IPersonalInfoInputs;
  control: Control<IPersonalInfoInputs>;
}

const PersonalInfoFields: FC<PersonalInfoFieldsProps> = ({ register, errors, personalInfo, control }) => {
  return (
    <>
      <div className='w-full mt-5'>
        <div className='flex flex-col gap-5'>
          {/* Name */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* First Name */}
            <div className='w-full'>
              <label htmlFor="first-name" className='font-semibold text-secondary'>First Name</label>
              <Input
                {...register('name.firstName', {
                  required: "First name is required",
                })}
                defaultValue={personalInfo?.name.firstName}
                type="text"
                id='first-name'
                placeholder="Enter your firstname"
                className='h-11 xl:h-14 mt-1'
              />
              {errors?.name?.firstName && <p className='text-red-500 text-sm mt-1'>{errors.name.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div className='w-full'>
              <label htmlFor="last-name" className='font-semibold text-secondary'>Last Name</label>
              <Input
                {...register('name.lastName', {
                  required: "Last name is required",
                })}
                defaultValue={personalInfo?.name.lastName}
                type="text"
                id="last-name"
                placeholder="Enter your lastname"
                className='h-11 xl:h-14 mt-1'
              />
              {errors?.name?.lastName && <p className='text-red-500 text-sm mt-1'>{errors.name.lastName.message}</p>}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Gender */}
            <div>
              <label className="font-semibold text-secondary">Gender</label>
              <Controller
                name="gender"
                control={control}
                defaultValue={personalInfo?.gender}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ''}>
                    <SelectTrigger className="h-11 xl:h-14 mt-1">
                      <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((gender, i) => (
                        <SelectItem key={i} value={gender.toLowerCase()}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.gender && <p className='text-red-500 text-sm mt-1'>{errors.gender.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className='font-semibold text-secondary'>Phone</label>
              <Input
                {...register('phone', {
                  required: "Phone number is required",
                  maxLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                })}
                defaultValue={personalInfo?.phone}
                type="number"
                placeholder="Enter your phone number"
                className='h-11 xl:h-14 mt-1'
              />
              {errors?.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Date of Birth */}
            <div className='w-full'>
              <label htmlFor="date-of-birth" className='font-semibold text-secondary'>Date of Birth</label>
              <Input
                {...register('dateOfBirth', {
                  required: "Date of birth is required",
                })}
                defaultValue={personalInfo?.dateOfBirth}
                type="date"
                className='h-11 xl:h-14 mt-1'
              />
              {errors?.dateOfBirth && <p className='text-red-500 text-sm mt-1'>{errors.dateOfBirth.message}</p>}
            </div>

            {/* Email */}
            <div className='w-full'>
              <label htmlFor="email" className='font-semibold text-secondary'>Email</label>
              <Input
                {...register('email', {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                defaultValue={personalInfo?.email}
                type="email"
                placeholder="Enter your email"
                className='h-11 xl:h-14 mt-1'
              />
              {errors?.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoFields;

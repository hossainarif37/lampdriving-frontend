"use client";

import { FC } from 'react';
import { UseFormRegister, FieldErrors, Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { genderOptions } from '@/constant/gender';
import { usePathname } from 'next/navigation';

export interface IPersonalInfoInputs {
  name: {
    firstName: string;
    lastName: string;
  },
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  profileImg?: string;
}

interface PersonalInfoFieldsProps {
  register: UseFormRegister<IPersonalInfoInputs>;
  errors: FieldErrors<IPersonalInfoInputs>;
  defaultValues?: IPersonalInfoInputs;
  control: Control<IPersonalInfoInputs>;
  isRequired: boolean;
}

const PersonalInfoFields: FC<PersonalInfoFieldsProps> = ({ register, errors, defaultValues, control, isRequired }) => {
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  return (
    <>
      <div className='w-full mt-5'>
        <div className='flex flex-col gap-5'>
          {/* Name */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* First Name */}
            <div className='w-full'>
              <label htmlFor="first-name" className='font-semibold text-primary'>First Name</label>
              <Input
                {...register('name.firstName', {
                  required: {
                    value: isRequired,
                    message: "First name is required",
                  },
                })}
                defaultValue={defaultValues?.name.firstName}
                type="text"
                id='first-name'
                placeholder="Enter your firstname"
                className='h-11 xl:h-14 mt-1'
              />
              {errors?.name?.firstName && <p className='text-red-500 text-sm mt-1'>{errors.name.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div className='w-full'>
              <label htmlFor="last-name" className='font-semibold text-primary'>Last Name</label>
              <Input
                {...register('name.lastName', {
                  required: {
                    value: isRequired,
                    message: "Last name is required",
                  },
                })}
                defaultValue={defaultValues?.name.lastName}
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
              <label className="font-semibold text-primary">Gender</label>
              <Controller
                name="gender"
                control={control}
                defaultValue={defaultValues?.gender}
                rules={{
                  required: {
                    value: isRequired,
                    message: "Gender is required",
                  },
                }}
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
              <label htmlFor="phone" className='font-semibold text-primary'>Phone</label>
              <Input
                {...register('phone', {
                  required: {
                    value: isRequired,
                    message: "Phone number is required",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                })}
                defaultValue={defaultValues?.phone}
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
              <label htmlFor="date-of-birth" className='font-semibold text-primary'>Date of Birth</label>
              <Input
                {...register('dateOfBirth', {
                  required: {
                    value: isRequired,
                    message: "Date of birth is required",
                  },
                })}
                defaultValue={defaultValues?.dateOfBirth}
                type="date"
                className='h-11 xl:h-14 mt-1'
              />
              {errors?.dateOfBirth && <p className='text-red-500 text-sm mt-1'>{errors.dateOfBirth.message}</p>}
            </div>

            {/* Email */}
            <div className='w-full'>
              <label htmlFor="email" className='font-semibold text-primary'>Email</label>
              <Input
                {...register('email', {
                  required: {
                    value: isRequired,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                defaultValue={defaultValues?.email}
                type="email"
                placeholder="Enter your email"
                className='h-11 xl:h-14 mt-1 disabled:opacity-90'
                disabled={isDashboard}
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

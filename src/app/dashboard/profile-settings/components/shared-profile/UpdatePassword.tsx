import UpdatePasswordField, { IUpdatePasswordInputs } from '@/components/shared/forms/UpdatePasswordFields';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';



const UpdatePassword: FC = () => {
    const [passwordVisibility, setPasswordVisibility] = useState({
        oldPasswordVisible: false,
        newPasswordVisible: false
    });

    const { register, handleSubmit, formState: { errors }, watch } = useForm<IUpdatePasswordInputs>();
    const router = useRouter();

    const handlePasswordToggle = (field: string) => {
        if (field === 'new-password') {
            setPasswordVisibility((prev) => ({ ...prev, newPasswordVisible: !prev.newPasswordVisible }));
        } else if (field === 'old-password') {
            setPasswordVisibility((prev) => ({...prev, oldPasswordVisible: !prev.oldPasswordVisible}));
        }
    }

    const onSubmit = (data: IUpdatePasswordInputs) => console.log(data);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full md:w-[500px] lg:w-[750px] mx-auto p-5 md:p-10 mt-10 flex flex-col items-start md:shadow-lg bg-light md:rounded-lg md:border'
        >
            <h1 className='text-2xl md:text-3xl font-bold text-secondary'>Update Password</h1>

            <UpdatePasswordField
                register={register}
                errors={errors}
                passwordVisibility={passwordVisibility}
                handlePasswordToggle={handlePasswordToggle}
            />

            <Button className='w-full mt-7 gradient-color h-12'>Update Password</Button>
        </form >
    );
};

export default UpdatePassword;
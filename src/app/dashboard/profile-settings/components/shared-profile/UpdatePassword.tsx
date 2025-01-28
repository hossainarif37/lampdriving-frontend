import UpdatePasswordField, { IUpdatePasswordInputs } from '@/components/shared/forms/UpdatePasswordFields';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useUpdatePasswordMutation } from '@/redux/api/authApi/authApi';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';



const UpdatePassword: FC<{ className?: string }> = ({ className }) => {
    const [passwordVisibility, setPasswordVisibility] = useState({
        oldPasswordVisible: false,
        newPasswordVisible: false
    });

    const { register, handleSubmit, formState: { errors }, watch } = useForm<IUpdatePasswordInputs>();
    const router = useRouter();
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

    const handlePasswordToggle = (field: string) => {
        if (field === 'new-password') {
            setPasswordVisibility((prev) => ({ ...prev, newPasswordVisible: !prev.newPasswordVisible }));
        } else if (field === 'old-password') {
            setPasswordVisibility((prev) => ({ ...prev, oldPasswordVisible: !prev.oldPasswordVisible }));
        }
    }

    const onSubmit = (data: IUpdatePasswordInputs) => {
        console.log(data);
        updatePassword(data).unwrap().then((res) => {
            toast({
                message: "Password Updated Successfully",
            })
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("w-full md:w-[500px] lg:w-[750px] mx-auto p-5 md:p-10 mt-10 flex flex-col items-start md:shadow-lg bg-light md:rounded-lg md:border", className)}
        >
            <h1 className='text-xl md:text-2xl font-bold text-primary'>Update Password</h1>

            <UpdatePasswordField
                register={register}
                errors={errors}
                passwordVisibility={passwordVisibility}
                handlePasswordToggle={handlePasswordToggle}
            />

            <Button className='w-full mt-7 gradient-color h-12' disabled={isLoading}>Update Password</Button>
        </form >
    );
};

export default UpdatePassword;
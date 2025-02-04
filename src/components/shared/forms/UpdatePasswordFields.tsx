import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface IUpdatePasswordInputs {
    oldPassword: string;
    newPassword: string;
};

interface UpdatePasswordFieldProps {
    register: UseFormRegister<IUpdatePasswordInputs>,
    errors: FieldErrors<IUpdatePasswordInputs>;
    handlePasswordToggle: (field: string) => void;
    passwordVisibility: {
        oldPasswordVisible: boolean;
        newPasswordVisible: boolean;
    },
}

const UpdatePasswordField: FC<UpdatePasswordFieldProps> = ({ register, errors, handlePasswordToggle, passwordVisibility: { oldPasswordVisible, newPasswordVisible } }) => {
    return (
        <div className="w-full mt-7">
            <div className="flex flex-col gap-6">
                {/* Password */}
                <div className="w-full">
                    <label htmlFor="old-password" className="font-semibold text-primary">
                        Old Password
                    </label>
                    <div className="relative flex w-full">
                        <Input
                            {...register("oldPassword", {
                                minLength: {
                                    message: "Password must be at least 6 characters",
                                    value: 6,
                                },
                                required: "OldPassword is required",
                            })}
                            // defaultValue={oldPassword}
                            type={oldPasswordVisible ? "text" : "password"}
                            id="old-password"
                            placeholder="Enter your old password"
                            className="w-full xl:h-12 mt-1 pr-10"
                        />

                        <span
                            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2"
                            onClick={() => handlePasswordToggle("old-password")}
                        >
                            {oldPasswordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                        </span>
                    </div>
                    {errors?.oldPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors?.oldPassword?.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="w-full">
                    <label htmlFor="new-password" className="font-semibold text-primary">
                        New Password
                    </label>
                    <div className="relative flex w-full">
                        <Input
                            {...register("newPassword", {
                                minLength: {
                                    message: "Password must be at least 6 characters",
                                    value: 6,
                                },
                                required: "Password is required",
                            })}
                            // defaultValue={password}
                            type={newPasswordVisible ? "text" : "password"}
                            id="new-password"
                            placeholder="Enter new password"
                            className="w-full xl:h-12 mt-1 pr-10"
                        />

                        <span
                            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2"
                            onClick={() => handlePasswordToggle("new-password")}
                        >
                            {newPasswordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                        </span>
                    </div>
                    {errors?.newPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdatePasswordField;
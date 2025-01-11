import { IInstructor } from "./instructor";
import { IUser } from "./user";

export interface IRegisterInputs {
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    phone: number;
    gender: string;

    // License Information
    localLicense: {
        licenseNumber: string;
        issueDate: string;
        expiryDate: string;
    }

    profileImg?: string;

    // Authentication
    password: string;
    confirmPassword?: string;
}
export interface ILoginInputs {
    emailOrPhone: string;
    password: string;
}

export interface IAuthSliceState {
    isAuthenticate: boolean;
    isAuthLoading: boolean;
    user: IUser | null;
    instructor: IInstructor | null;
}
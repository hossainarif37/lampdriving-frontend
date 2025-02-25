import { IInstructor } from "./instructor";
import { IUser } from "./user";

export interface ILearnerLicense {
    licenseType: 'NSW' | 'Other State' | 'Overseas';
    countryName?: string;
    stateName?: string;
    licenseNumber: string;
    expiryDate: string;
}

export interface IRegisterInputs {
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    phone: number;
    gender: string;
    license: ILearnerLicense;
    profileImg: string;
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
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
    dateOfBirth?: string;  // Keeping this as requested
    facebookId?: string;

    // License Information
    localLicense: {
        licenseNumber: string;
        issueDate: string;
        expiryDate: string;
    }

    overseasExperience?: {
        countryName: string;
        licenseNumber: string;
        issueDate: string;
        expiryDate: string;
    }

    // Driving School Information
    previousDrivingSchool?: string;
    totalLessonHours?: number;

    // Referral Information
    referralSource: 'online' | 'word-of-mouth' | 'referral';
    referralName?: string;

    // Address (keeping from original)
    address: {
        street: string;
        suburb: string;
        state: string;
        zipCode: number;
    };

    // Authentication
    password: string;
    confirmPassword: string;
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
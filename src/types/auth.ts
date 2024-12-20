import { IUser } from "./user";

export interface IRegisterInputs {
    name: {
        firstName: string;
        lastName: string;
    },
    email: string;
    phone: number;
    gender: string;
    dateOfBirth: string;
    address: {
        street: string;
        suburb: string;
        state: string;
        zipCode: number;
    },
    password: string;
}

export interface ILoginInputs {
    emailOrPhone: string;
    password: string;
}

export interface IAuthSliceState {
    isAuthenticate: boolean;
    isAuthLoading: boolean;
    user: IUser | null;
}
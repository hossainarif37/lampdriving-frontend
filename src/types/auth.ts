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
    email: string;
    password: string;
}

export interface IUser {
    email: string;
    name: string;
    _id: string;
}

export interface IauthSliceState {
    isAuthenticate: boolean;
    isAuthLoading: boolean;
    user: IUser | null;
}
import { IInstructor } from "./instructor";
import { ILearner } from "./learner";

export interface IName {
    firstName: string;
    lastName: string;
    fullName?: string;
}

export interface IAddress {
    address: string;
    suburb: string;
}

export interface IDateOfBirth {
    month: string;
    year: string;
}

export interface IUser {
    _id?: string;
    name: IName;
    email: string;
    phone: string;
    username: string;
    password: string;
    dateOfBirth: IDateOfBirth;
    address?: IAddress;
    profileImg: string;
    learner?: string | ILearner;
    instructor?: IInstructor | string;
    gender: 'male' | 'female' | 'other';
    role: 'learner' | 'instructor' | 'admin';
    status: 'active' | 'blocked';
    isEmailVerified: boolean;
    isDeleted: boolean;
}
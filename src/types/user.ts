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

export interface IUser {
    name: IName;
    email: string;
    phone: string;
    password: string;
    dateOfBirth: string;
    address?: IAddress;
    profileImg: string;
    learner?: string | ILearner;
    instructor?: string | IInstructor;
    gender: 'male' | 'female' | 'other';
    role: 'learner' | 'instructor' | 'admin';
    status: 'active' | 'blocked';
    isEmailVerified: boolean;
    isDeleted: boolean;
}
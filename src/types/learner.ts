import { IBooking } from "./booking";
import { IReview } from "./review";
import { IUser } from "./user";

export interface IOverseasExperience {
    countryName: string;
    licenseNumber: string;
    issueDate: string;
    expiryDate: string;
}

export interface ILocalLicense {
    licenseNumber: string;
    issueDate: string;
    expiryDate: string;
}

export interface IPreviousLearningExperience {
    schoolName: string;
    totalLessons: number;
}


export interface ILearner {
    _id: string;
    user: string | IUser;
    bookings: string[] | IBooking[];
    payments: string[];
    reviews: string[] | IReview[];
    previousLearningExperience?: IPreviousLearningExperience;
    overseasExperience?: IOverseasExperience;
    localLicense: ILocalLicense;
}
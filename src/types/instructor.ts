import { IUser } from "./user";

// interface for document
export interface IDocument {
    drivingLicense: string;
    experienceCertificate: string;
}

// interface for schedule
export interface IDaySchedule {
    isActive: boolean
    startTime: string
    endTime: string
}

export interface ISchedule {
    [key: string]: IDaySchedule
}

// interface for vehicle
export interface IVehicle {
    name: string;
    model: string;
    type: "auto" | "manual";
    rating: string;
    image: string;
}

// interface for feedback
export interface IFeedback {
    rating: number;
    reviews: string[];
}

// interface for working hour
export interface IWorkingHour {
    saturday: { isActive: boolean, startTime: string, endTime: string };
    sunday: { isActive: boolean, startTime: string, endTime: string };
    monday: { isActive: boolean, startTime: string, endTime: string };
    tuesday: { isActive: boolean, startTime: string, endTime: string };
    wednesday: { isActive: boolean, startTime: string, endTime: string };
    thursday: { isActive: boolean, startTime: string, endTime: string };
    friday: { isActive: boolean, startTime: string, endTime: string };
}

// interface for instructor
export interface IInstructor {
    _id?: string;
    user: string | IUser;
    description: string;
    documents: IDocument;
    experience: string;
    languages: string[];
    feedback: IFeedback;
    vehicle: IVehicle;
    serviceAreas: string[];
    pricePerHour: number;
    workingHour: IWorkingHour;
    completedLessons: number;
    withdraws: string[];
    transactions: string[];
    bookings: string[];
    status: "pending" | "verified" | "rejected";
}

export interface IRegisterInstructor {
    userInfo: Partial<IUser>;
    instructorInfo: Partial<IInstructor>;
}
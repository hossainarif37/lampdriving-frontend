import { IUser } from "./user";

// interface for document
export interface IDocument {
    drivingLicense: string;
    experienceCertificate: string;
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
    saturday: { startTime: string, endTime: string };
    sunday: { startTime: string, endTime: string };
    monday: { startTime: string, endTime: string };
    tuesday: { startTime: string, endTime: string };
    wednesday: { startTime: string, endTime: string };
    thursday: { startTime: string, endTime: string };
    friday: { startTime: string, endTime: string };
}

// interface for instructor
export interface IInstructor {
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
    withdraws: string[];
    transactions: string[];
    bookings: string[];
    status: "pending" | "verified";
}
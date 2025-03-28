import { IDateOfBirth, IName, IUser } from "./user";



// interface for schedule
export interface IDaySchedule {
    isActive: boolean
    startTime: string
    endTime: string
}

export interface ISchedule {
    [key: string]: IDaySchedule
}

export interface IVehicleImages {
    id?: string;
    url: string;
}

// interface for vehicle
export interface IVehicle {
    name: string;
    model: string;
    type: "auto" | "manual";
    rating: number;
    images: IVehicleImages[];
    year: number;
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

export interface IExperienceCertificate {
    experienceType?: string;
    url: string;
}

// interface for document
export interface IDocument {
    instructorLicense?: string;
    drivingLicense?: string;
    experienceCertificates?: IExperienceCertificate[];
}

// interface for instructor
export interface IInstructor {
    _id?: string;
    user: string | IUser;
    description: string;
    documents: IDocument;
    experience: {
        month: string;
        year: string;
    };
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

export interface IPersonalInfo {
    name: IName;
    email: string;
    phone: string;
    dateOfBirth: IDateOfBirth;
    gender: 'male' | 'female' | 'other';
    profileImg?: string;
}

export interface IExperience {
    experience: {
        month: string;
        year: string;
    };
    description: string;
    languages: string[];
    documents: IDocument;
}

export interface IServices {
    serviceAreas: string[];
    pricePerHour: number;
    workingHour: IWorkingHour;
}

export interface ISecurity {
    password: string;
}

export interface IInstructorRegisterContext {
    personalInfo: IPersonalInfo | undefined;
    experienceInfo: IExperience | undefined;
    carInfo: IVehicle | undefined;
    servicesInfo: IServices | undefined;
    setPersonalInfo: React.Dispatch<React.SetStateAction<IPersonalInfo | undefined>>;
    setExperienceInfo: React.Dispatch<React.SetStateAction<IExperience | undefined>>;
    setCarInfo: React.Dispatch<React.SetStateAction<IVehicle | undefined>>;
    setServicesInfo: React.Dispatch<React.SetStateAction<IServices | undefined>>;
}
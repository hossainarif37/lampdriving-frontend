import { UseFormReturn } from "react-hook-form";
import { IInstructor } from "./instructor";
import { ILoginInputs, IRegisterInputs } from "./auth";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import { ILearner } from "./learner";
import { ISchedule, IScheduleInputs } from "./schedule";
import { IReview } from "./review";

export interface IBookingContext {
    steps: IStep[];
    currentStep: IStep;
    setCurrentStep: React.Dispatch<React.SetStateAction<IStep>>;
    instructor: Partial<IInstructor> | null;
    setInstructor: React.Dispatch<React.SetStateAction<Partial<IInstructor> | null>>;
    bookingHours: number;
    setBookingHours: React.Dispatch<React.SetStateAction<number>>;
    testPackage: ITestPackage;
    setTestPackage: React.Dispatch<React.SetStateAction<ITestPackage>>;
    mockTestPackage: ITestPackage;
    setMockTestPackage: React.Dispatch<React.SetStateAction<ITestPackage>>;
    price: IPrice;
    setPrice: React.Dispatch<React.SetStateAction<IPrice>>;
    isCustomSelected: boolean;
    setIsCustomSelected: React.Dispatch<React.SetStateAction<boolean>>;
    paymentInfo: IPaymentInfo;
    setPaymentInfo: React.Dispatch<React.SetStateAction<IPaymentInfo>>;
    schedules: IScheduleInputs[];
    setSchedules: React.Dispatch<React.SetStateAction<IScheduleInputs[]>>;
    useRegisterForm: UseFormReturn<IRegisterInputs, unknown, undefined>;
    useLoginForm: UseFormReturn<ILoginInputs, unknown, undefined>;
    handleStepChange: (step: string) => void;
    isConfirmTriggered: boolean;
    setIsConfirmTriggered: React.Dispatch<React.SetStateAction<boolean>>;
    isCreatingABooking: boolean;
    setIsCreatingABooking: React.Dispatch<React.SetStateAction<boolean>>;
    availableScheduleHours: number;
    isTestPackageSelected: boolean;
    isAllScheduled: boolean;
    registerButtonRef: React.RefObject<HTMLButtonElement>;
    isRegistering: boolean;
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
    loginButtonRef: React.RefObject<HTMLButtonElement>;
    isLogging: boolean;
    setIsLogging: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPrice {
    paidAmount: number;
    originalAmount: number;
    discountedAmount: number;
    discountedPercentage: number;
}

export interface ITestPackage {
    included: boolean;
    price: number;
}

export interface IPaymentInfo {
    transactionId: string;
    method: string;
}



export interface IStep {
    name: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    key: string;
    index: number
}


export interface IBookingInputs {
    bookingInfo: {
        learner: string;
        instructor: string;
        price: IPrice;
        bookingHours: number;
        schedules: IScheduleInputs[];
    };
    paymentInfo: {
        user: string;
        amount: number;
        transactionId: string;
        method: string;
    };
}






export interface IBooking {
    _id: string;
    learner: string | ILearner;
    instructor: string | IInstructor;
    bookingHours: number;
    schedules: string | ISchedule[];
    review: IReview | undefined;
    payment: string;
    price: IPrice;
    status: "pending" | "accepted" | "completed" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

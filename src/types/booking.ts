import { UseFormReturn } from "react-hook-form";
import { IInstructor } from "./instructor";
import { ILoginInputs, IRegisterInputs } from "./auth";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

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
    price: IPrice;
    setPrice: React.Dispatch<React.SetStateAction<IPrice>>;
    isCustomSelected: boolean;
    setIsCustomSelected: React.Dispatch<React.SetStateAction<boolean>>;
    paymentInfo: IPaymentInfo;
    setPaymentInfo: React.Dispatch<React.SetStateAction<IPaymentInfo>>;
    paymentImageFile: File | null;
    setPaymentImageFile: React.Dispatch<React.SetStateAction<File | null>>;
    schedules: IShedule[];
    setSchedules: React.Dispatch<React.SetStateAction<IShedule[]>>;
    useRegisterForm: UseFormReturn<IRegisterInputs, any, undefined>;
    useLoginForm: UseFormReturn<ILoginInputs, any, undefined>;
    handleStepChange: (step: string) => void;
}

export interface IPrice {
    payableAmount: number;
    originalAmount: number;
    discountedAmount: number;
}

export interface ITestPackage {
    included: boolean;
    price: number;
}

export interface IPaymentInfo {
    transactionId: string;
    proofImage: string;
    method: string;
}

export interface IShedule {
    date: string;
    duration: 1 | 2 | 1.5;
    time: string;
    pickupAddress: {
        address: string;
        suburb: string;
    };
}


export interface IStep {
    name: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    key: string;
    index: number
}

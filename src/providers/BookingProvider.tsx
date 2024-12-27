import React, { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { IInstructor } from '@/types/instructor';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetAInstructorQuery } from '@/redux/api/instructorApi/instructorApi';
import Loading from '@/components/shared/Loading';

interface IBookingContext {
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
}

interface IPrice {
    payableAmount: number;
    originalAmount: number;
    discountedAmount: number;
}

interface ITestPackage {
    included: boolean;
    price: number;
}

interface IPaymentInfo {
    user: string;
    transactionId: string;
    amount: string;
    proofImage: string;
    method: string;
    reference: string;
}

interface IShedule {
    date: string;
    duration: '1-hour' | '2-hour' | 'test-package';
    time: string;
    pickupAddress: {
        address: string;
        suburb: string;
    };
}

const BookingContext = createContext<IBookingContext | undefined>(undefined);


// Create the provider component
export const BookingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [instructor, setInstructor] = useState<Partial<IInstructor> | null>({
        pricePerHour: 76
    });
    const [isCustomSelected, setIsCustomSelected] = useState(false);
    const [bookingHours, setBookingHours] = useState<number>(0);
    const [testPackage, setTestPackage] = useState<ITestPackage>({ included: false, price: 225 });
    const [price, setPrice] = useState<IPrice>({ payableAmount: 0, originalAmount: 0, discountedAmount: 0 });
    const [paymentImageFile, setPaymentImageFile] = useState<File | null>(null);
    const [paymentInfo, setPaymentInfo] = useState<IPaymentInfo>({
        user: '',
        transactionId: '',
        amount: '',
        proofImage: '',
        method: '',
        reference: ''
    });
    const [schedules, setSchedules] = useState<IShedule[]>([]);


    const value = useMemo(() => ({
        instructor, setInstructor,
        bookingHours, setBookingHours,
        testPackage, setTestPackage,
        price, setPrice,
        isCustomSelected, setIsCustomSelected,
        paymentInfo, setPaymentInfo,
        paymentImageFile, setPaymentImageFile,
        schedules, setSchedules
    }), [instructor, bookingHours, testPackage, price, isCustomSelected, paymentImageFile, paymentInfo, schedules]);

    const router = useRouter();
    const urlSearchParams = useSearchParams();
    const instructorQuery = urlSearchParams.get('instructor');

    if (!instructorQuery) {
        router.push('/');
    }

    const { data: instructorResponse, isLoading } = useGetAInstructorQuery({ username: instructorQuery! });



    useEffect(() => {
        if (!instructorResponse?.success && !isLoading) {
            router.push('/');
        } else if (instructorResponse?.success && !isLoading) {
            setInstructor(instructorResponse.data);
        }
    }, [instructorResponse])


    useEffect(() => {
        const totalAmount = bookingHours * instructor?.pricePerHour!;
        if (bookingHours >= 10) {
            setPrice({ originalAmount: totalAmount, payableAmount: totalAmount * 0.9, discountedAmount: totalAmount * 0.1 }); // 10% discount
        } else if (bookingHours >= 6) {
            setPrice({ originalAmount: totalAmount, payableAmount: totalAmount * 0.94, discountedAmount: totalAmount * 0.06 }); // 6% discount (equivalent to paying 94%)
        } else {
            setPrice({ originalAmount: totalAmount, payableAmount: totalAmount, discountedAmount: 0 }); // No discount
        }
        if (testPackage.included) {
            setPrice((prevPrice) => ({ ...prevPrice, payableAmount: prevPrice.payableAmount + testPackage.price })); // Add test package price
        }
    }, [bookingHours, testPackage.included]);


    if (isLoading) {
        return <Loading />
    }
    console.log(instructor);
    return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

// Custom hook to use the context
export const useBooking = (): IBookingContext => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
